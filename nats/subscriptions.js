const { getNATS } = require("./connect");
const { StringCodec } = require("nats");
const { recommend, segment } = require("../wa/script2");

const subscribe = async () => {
  const nc = getNATS();
  const sc = StringCodec();
  const sub1 = nc.subscribe("user.id.apparel.recommendation_wp", {
    queue: "workers",
  });
  const sub2 = nc.subscribe("user.id.image.segment", { queue: "workers" });

  (async () => {
    for await (const m of sub1) {
      const data = JSON.parse(sc.decode(m.data));
      console.log("received data");

      recommend(data);
    }
  })();

  (async () => {
    for await (const m of sub2) {
      const data = JSON.parse(sc.decode(m.data));
      console.log("received segment data");

      segment(data);
    }
  })();
};

module.exports = subscribe;
