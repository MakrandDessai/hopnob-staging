const { StatusCodes } = require("http-status-codes");
const { getNATS } = require("../nats/connect");
const { StringCodec } = require("nats");
const { imageReceivedRecommend } = require("../wa/script2");

const publishMsg = async (req, res) => {
  const { body } = req;
  const nc = getNATS();
  const sc = StringCodec();

  const obj = {
    mobileNumber: body.mobileNumber,
    recommend: 1,
    clickMatch: 0,
    wardrobe: 0,
    item: body.item,
    occasion: "work",
    mode: 1,
  };

  imageReceivedRecommend({ source: body.mobileNumber });

  console.log(body.mobileNumber, body.item);

  const sendString = JSON.stringify(obj);
  nc.publish("test_whatsapp", sc.encode(sendString));

  console.log("published from API");

  res.status(StatusCodes.OK).send();
};

module.exports = {
  publishMsg,
};
