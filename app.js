const express = require("express");
require("express-async-errors");
require("dotenv").config();
const morgan = require("morgan");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const app = express();

// module
const connectDB = require("./db/connect");
const { initNATS, getNATS } = require("./nats/connect");
const subscribe = require("./nats/subscriptions");

// routers
const userRouter = require("./routes/user");
const waRouter = require("./routes/wa");
const apparelRouter = require("./routes/apparel");
const natsRouter = require("./routes/nats");
const authenticateUser = require("./middleware/auth");
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use("/api/v1/wa", waRouter);
app.use("/api/v1/apparel", apparelRouter);
app.use("/api/v1/nats", natsRouter);

app.use(authenticateUser);
app.use("/api/v1/users", userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 8000;

const start = async () => {
  //db
  try {
    await connectDB( process.env.MONGO_URI
      );
    await initNATS();
    subscribe();
    const nc = getNATS();
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
    await nc.closed();
  } catch (error) {
    console.log(error);
  }
};

start();
