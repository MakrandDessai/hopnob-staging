const { connect } = require("nats");

let client;

const initNATS = async () => {
  if (client) {
    console.log("NATS client already initialized");
    return;
  }
  const nc = await connect({ servers: "nats://216.48.179.152:4222" });
  console.log(`connected to ${nc.getServer()}`);
  client = nc;
};

const getNATS = () => {
  if (!client) {
    throw new Error("NATS client not initialized");
  }
  return client;
};

module.exports = {
  initNATS,
  getNATS,
};
