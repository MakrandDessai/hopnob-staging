const sdk = require("api")("@gupshup/v1.0#3gxw8k3vl6xmaps4");
var axios = require('axios');
var qs = require('qs');

const sendMsg = async (msg, destination) => {
  // await new Promise((resolve) => setTimeout(resolve, 300));
  // console.log("sending msg");
  // return sdk.postMsg(
  //   {
  //     message: JSON.stringify(msg),
  //     channel: "whatsapp",
  //     source: 918383074784,
  //     destination: parseInt(destination),
  //     "src.name": "Hopnob",
  //   },
  //   {
  //     accept: "application/json",
  //     apikey: "mzmxc2lvpzeidxjt1qe11z9n6gdzswkq",
  //   }
  // );
  

  //////////////////////////////
  /// Description: Api's as per Gupshub Enterprise Plan  
  /// Code Changes: 3 March 2023
  /// Modified By: Makrand Dessai
  //////////////////////////////

  var config = {
    method: 'post',
    url: 'http://media.smsgupshup.com/GatewayAPI/rest',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : msg
  };
  
  return await axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
  
  //////////////////////////////





  // .then(({ data }) => console.log(data))
  // .catch((err) => console.error(err));
};

module.exports = { sendMsg };
