const { StatusCodes } = require("http-status-codes");
const { getNATS } = require("../nats/connect");
const { StringCodec } = require("nats");

const {
  handleHi,
  handleGarmentSelection,
  handleMainMenu,
  handleFeedback,
  handleClickAndMatch,
  handleThankYou,
  handleEmpty,
  handleAddClothes,
  handleGetOutfitSuggestions,
  handleOccasionBasedOutfits,
  handleGetStarted,
  handleExplore,
  handleCreateWardrobe,
  handleAddClothesNewUser,
  handleRecommend,
  handleSegment,
  handleMenuText,
  handleExploreMore,
  imageReceivedRecommend,
  imageReceivedSegment,
} = require("../wa/script2");

const User = require("../models/User");

const handleText = async (payload) => {
  const pl = payload.payload;
  console.log("pl :: ",pl);
  if (["hi", "hey", "hello", "hii"].includes(pl.text.toLowerCase())) {
    handleHi(payload);
  } else {
    let user = await User.findOneAndUpdate(
      { mobileNumber: payload.source },
      { mobileNumber: payload.source, givingFeedback: false },
      { upsert: true, runValidators: true }
    );
    if (user.givingFeedback) {
      handleFeedback(payload);
    } else if (pl.text === `Just type "Hi" to begin!`) {
      handleHi({ source: payload.sender.phone });
    } else {
      handleMenuText(payload);
    }
  }
};

const handleImage = async (payload, curTimestamp) => {
  const pl = payload.payload;

  let recommend = 0;

  let user = await User.findOneAndUpdate(
    { mobileNumber: payload.source },
    { mobileNumber: payload.source, latestImageReceived: curTimestamp },
    { upsert: true, runValidators: true }
  );

  if (curTimestamp - user.latestImageReceived < 3000) {
    recommend = 0;
  } else {
    recommend = 1;
  }

  if (recommend === 1 && user.isClickMatch) imageReceivedRecommend(payload);
  if (recommend === 1 && !user.isClickMatch) imageReceivedSegment(payload);

  const nc = getNATS();
  const sc = StringCodec();

  const obj = {
    mobileNumber: payload.source,
    recommend: recommend,
    wardrobe: user.isClickMatch === true ? 0 : 1,
    clickMatch: user.isClickMatch === true ? 1 : 0,
    url: pl.url,
    occasion: "work",
    mode: 1,
  };

  const sendString = JSON.stringify(obj);
  nc.publish("test_whatsapp", sc.encode(sendString));

  console.log("published");
};

const handleList = async (payload) => {
  const pl = payload.payload;
  switch (pl.id) {
    case "getStarted":
      handleGetStarted(payload);
      break;
    case "mainMenu":
      handleMainMenu(payload);
      break;
    case "occasionBasedOutfits":
      handleOccasionBasedOutfits(payload);
      break;
    default:
      break;
  }
};

const handleButton = async (payload) => {
  const pl = payload.payload;
  switch (pl.id) {
    case "explore":
      handleExplore(payload);
      break;
    case "selectTop":
      handleGarmentSelection(payload);
      break;
    case "exploreMore":
      handleExploreMore(payload);
      break;
    case "createWardrobe":
      handleCreateWardrobe(payload);
      break;
    case "addClothesNewUser":
      handleAddClothesNewUser(payload);
      break;
    case "clickAndMatch":
      handleClickAndMatch(payload);
      break;
    case "thankyou":
      handleThankYou(payload);
      break;
    case "empty":
      handleEmpty(payload);
      break;
    case "addClothes":
      handleAddClothes(payload);
      break;
    case "getOutfitSuggestions":
      handleGetOutfitSuggestions(payload);
      break;
    case "recommend":
      handleRecommend(payload);
    case "segment":
      handleSegment(payload);
  }
};

const receiveMessage = async (req, res) => {
  console.log(req.body);
  if (typeof req.body === "string") req.body = JSON.parse(req.body);
  //let { payload } = req.body;
///////////////////////
//Change : Makrand Dessai 
//Date: 2 March 23
////////////////////////////////////////
    let payload  ;
  console.log("payload:::",req.body.type)
  switch (req.body.type) {
    case "image":
      payload = {   
        "app": "Hopnob", 
        timestamp: req.body.timestamp,
        version: 2,
        type: req.body.type,  
        "payload": {  
          "id": "ABEGkYaYVSEEAhAE0dyndiP9cVlr4hC5xU64",   
          source: req.body.mobile,
          type: req.body.type,    
          "payload": {    
            "caption": "Sample image",    
            "url": req.body.image.url +req.body.image.signature ,  
            "contentType": req.body.image.mime_type,  
            "urlExpiry": 1624956794816    
          },  
          sender: {
            phone: req.body.mobile,
            name: req.body.name,
            country_code: '91',
            dial_code: '8x98xx21x4'
          }  
        } 
      }
      break;
    case "interactive":
      if( req.body.interactive.type == "list_reply"){
      payload = {
        "app": "Hopnob",
        timestamp: req.body.timestamp,
        version: 2,
        type: req.body.interactive.type,  
        "payload": {
          "id": "ABEGkYaYVSEEAhCzqobr15BdMPcRup1fIXAJ",
          source: req.body.mobile,
          type: req.body.interactive.type, 
          "payload": {
                  "title": req.body.interactive.list_reply.title,
                  "id": req.body.interactive.list_reply.id.msgid,
                  "reply":req.body.interactive.list_reply.id.reply,
                  "postbackText":req.body.interactive.list_reply.id.postbackText,
                  "description": req.body.interactive.list_reply.description
              },
              sender: {
                phone: req.body.mobile,
                name: req.body.name,
                country_code: '91',
                dial_code: '8x98xx21x4'
              }  ,
          "context": {
              "id": "gBEGkYaYVSEEAgnPGGVYGg1uNU4",
              "gsId": "cbdafe39-1023-42a7-89d6-6c01a3388bb5"
          }
        }
      }

    }
    else if(req.body.interactive.type == "button_reply"){
    payload=  {
        "app": "Hopnob",
        timestamp: req.body.timestamp,
        version: 2,
        type: req.body.interactive.type, 
        "payload": {
          "id": "ABEGkYaYVSEEAhCzqobr15BdMPcRup1fIXAJ",
          source: req.body.mobile,
          type: req.body.interactive.type, 
          "payload": {    
                  "title":req.body.interactive.button_reply.title,   
                  "id": req.body.interactive.button_reply.id.msgid,    
                  "reply":req.body.interactive.button_reply.id.reply   
              },  
              sender: {
                phone: req.body.mobile,
                name: req.body.name,
                country_code: '91',
                dial_code: '8x98xx21x4'
              }  , 
          "context": {    
              "id": "gBEGkYaYVSEEAgkvE0f1ZkfXX78",    
              "gsId": "123b0fb2-0620-493b-8f7e-5a1ceb6d8c58"  
          }   
        } 
      }
    }

      //handleList(payload.payload);
      break;
    case "button_reply":
      payload = {
        "app": "Hopnob",
        timestamp: req.body.timestamp,
        version: 2,
        type: req.body.type, 
        "payload": {
          "id": "ABEGkYaYVSEEAhCzqobr15BdMPcRup1fIXAJ",
          source: req.body.mobile,
          type: req.body.type,
          "payload": {    
                  "title": "First",   
                  "id": "qr1",    
                  "reply":"First 1"   
              },  
              sender: {
                phone: req.body.mobile,
                name: req.body.name,
                country_code: '91',
                dial_code: '8x98xx21x4'
              }  , 
          "context": {    
              "id": "gBEGkYaYVSEEAgkvE0f1ZkfXX78",    
              "gsId": "123b0fb2-0620-493b-8f7e-5a1ceb6d8c58"  
          }   
        } 
      }
      break;
    case "text":
      payload = {
        app: 'Hopnob',
        timestamp: req.body.timestamp,
        version: 2,
        type: req.body.type,
        payload: {
          id: 'ABEGkYaYVSEEAhAE0dyndiP9cVlr4hC5xU64',
          source: req.body.mobile,
          type: req.body.type,
          payload: { text: req.body.text},
          sender: {
            phone: req.body.mobile,
            name: req.body.name,
            country_code: '91',
            dial_code: '8x98xx21x4'
          }
        }
      };
      break;
    case "quick_reply":
      payload = {
        app: 'Hopnob',
        timestamp: req.body.timestamp,
        version: 2,
        type: req.body.type,
        payload: {
          id: 'ABEGkYaYVSEEAhAE0dyndiP9cVlr4hC5xU64',
          source: req.body.mobile,
          type: req.body.type,
          payload: { text: req.body.text},
          sender: {
            phone: req.body.mobile,
            name: req.body.name,
            country_code: '91',
            dial_code: '8x98xx21x4'
          }
        }
      };
    default:
      break;
  }

  /////////////////////////////////////////////

  //console.log("button_reply::",payload.type)
  switch (payload.type) {
    case "image":
      handleImage(payload, req.body.timestamp);
      break;
    case "list_reply":
      handleList(payload);
      break;
    case "button_reply":
      handleButton(payload);
      break;
    case "text":
      handleText(payload);
      break;
    case "quick_reply":
      handleText(payload);
    default:
      break;
  }

  res.status(StatusCodes.OK).send();
};

module.exports = {
  receiveMessage,
};
