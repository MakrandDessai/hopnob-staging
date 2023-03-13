const { sendMsg } = require("./sendMsg");
const { getNATS } = require("../nats/connect");
const { StringCodec } = require("nats");
const User = require("../models/User");
const Apparel = require("../models/Apparel");
const ApparelClickAndMatch = require("../models/ApparelClickAndMatch");
const Occasion = require("../models/Occasion");
const Feedback = require("../models/Feedback");
var qs = require('qs');

const handleHi = async (payload) => {
  var user = await User.findOne({ mobileNumber: payload.source });
  if (!user) {
    // if user is not found
    user = await User.create({ mobileNumber: payload.source });
    console.log("User created");
    const msg = 
//     {
//       type: "quick_reply",
//       msgid: "explore",
//       content: {
//         type: "video",
//         url: "https://storage.googleapis.com/wa-script/Hema(Under5mb).mp4",
//         text: `Hello ${user.firstName ?? ""}😄 
// I am *Hopnob*, your personalized styling partner.

//   • *Digitize* your wardrobe.
//   • Get instant *outfits*
//   • Dress for *occasions*
        
// *Hopnob* is loved by its community of *10k+*.

// Let's get started? Click EXPLORE :)`,
//         caption: "",
//       },
//       options: [
//         {
//           type: "text",
//           title: "Explore",
//         },
//       ],
//     };
    qs.stringify({
      'method': 'SendMediaMessage',
      'send_to': payload.source,
      'msg_type': 'video',
      'userid': '20000XXXXXX',
      'auth_scheme': 'plain',
      'password': 'XXXXXX',
      'v': '1.1',
      'format': 'text',
      'data_encoding': 'TEXT',
      'media_url': 'https://storage.googleapis.com/wa-script/Hema(Under5mb).mp4',
      'caption': `Hello ${user.firstName ?? ""}😄 
      I am *Hopnob*, your personalized styling partner.
      
        • *Digitize* your wardrobe.
        • Get instant *outfits*
        • Dress for *occasions*
              
      *Hopnob* is loved by its community of *10k+*.
      
      Let's get started? Click EXPLORE :)`,
      'action': `{
        "buttons": [
          {
            "type": "reply",
            "reply": {
              "id": "1a",
              "title": "Explore"
            }
          },
          
        ]
      }`,
      'interactive_type': 'explore',
      'footer': ' ',
      'linkTrackingEnabled': 'true',
      'msg_id': 'explore' 
    });

    
    await sendMsg(msg, payload.source);
  } else {
    // if  user is found
    console.log("User found");
    const msg =
//      {
//       type: "quick_reply",
//       msgid: "exploreMore",
//       content: {
//         type: "video",
//         url: "https://storage.googleapis.com/wa-script/video%201.mp4",
//         text: `Hello ${user.firstName ?? ""} 😄
// Welcome back to Hopnob!
    
// *We missed you!*
// Let's pick some awesome outfits for you, shall we?`,
//         caption: "",
//       },
//       options: [
//         {
//           type: "text",
//           title: "Explore More",
//           postbackText: "Explore More",
//         },
//       ],
//     };

    qs.stringify({
      'method': 'SendMediaMessage',
      'send_to': payload.source,
      'msg_type': 'video',
      'userid': '20000XXXXXX',
      'auth_scheme': 'plain',
      'password': 'XXXXXX',
      'v': '1.1',
      'format': 'text',
      'data_encoding': 'TEXT',
      'media_url': 'https://storage.googleapis.com/wa-script/video%201.mp4',
      'caption': `Hello ${user.firstName ?? ""}😄 
      I am *Hopnob*, your personalized styling partner.
      
        • *Digitize* your wardrobe.
        • Get instant *outfits*
        • Dress for *occasions*
              
      *Hopnob* is loved by its community of *10k+*.
      
      Let's get started? Click EXPLORE :)`,
      'action': `{
        "buttons": [
          {
            "type": "reply",
            "reply": {
              "id": "1a",
              "title": "Explore More"
            }
          },
          
        ]
      }`,
      'interactive_type': 'explore',
      'footer': ' ',
      'linkTrackingEnabled': 'true',
      'msg_id': 'exploreMore' 
    });
    await sendMsg(msg, payload.source);
  }
};

const handleGetStarted = async (payload) => {
  mainMenu(payload);
};

const handleExplore = async (payload) => {
  garmentSelection(payload);
};

const handleFeedback = async (payload) => {
  const pl = payload.payload;
  await Feedback.create({ mobileNumber: payload.source, feedback: pl.text });
  console.log("Feedback created");
  const msg = 
  // {
  //   type: "text",
  //   text: "Thank you for your message, we will get back to you in 48 hours.",
  // };


  qs.stringify({
    'send_to': payload.source,
    'msg_type': 'Text',
    'userid': '2000XXXXXX',
    'auth_scheme': 'plain',
    'password': 'XXXXXXX',
    'method': 'SendMessage',
    'v': '1.1',
    'format': 'json',
    'msg': 'Thank you for your message, we will get back to you in 48 hours.e' 
  })
  sendMsg(msg, payload.source);
};

const garmentSelection = async (payload) => {
  const msg = 
  // {
  //   type: "quick_reply",
  //   msgid: "selectTop",
  //   content: {
  //     type: "image",
  //     url: "https://storage.googleapis.com/wa-script/Explore%20Image.jpg",
  //     text: `To start, tell us which topwear do you like - 1, 2 or 3? For eg., if you like the *Yellow top, just select "1"* from the options.`,
  //     caption: "",
  //   },
  //   options: [
  //     {
  //       type: "text",
  //       title: "1",
  //       postbackText: "1",
  //     },
  //     {
  //       type: "text",
  //       title: "2",
  //       postbackText: "2",
  //     },
  //     {
  //       type: "text",
  //       title: "3",
  //       postbackText: "3",
  //     },
  //   ],
  // };


  qs.stringify({
    'method': 'SendMediaMessage',
    'send_to': payload.source,
    'msg_type': 'IMAGE',
    'userid': '20000XXXXXX',
    'auth_scheme': 'plain',
    'password': 'XXXXXX',
    'v': '1.1',
    'format': 'text',
    'data_encoding': 'TEXT',
    'media_url': 'https://storage.googleapis.com/wa-script/Explore%20Image.jpg',
    'caption': `To start, tell us which topwear do you like - 1, 2 or 3? For eg., if you like the *Yellow top, just select "1"* from the options.`,
    'action': `{
      "buttons": [
        {
          "type": "reply",
          "reply": {
            "id": "1a",
            "title": "1"
          }
        },{
          "type": "reply",
          "reply": {
            "id": "2a",
            "title": "2"
          }
        },{
          "type": "reply",
          "reply": {
            "id": "3a",
            "title": "3"
          }
        }
        
      ]
    }`,
    'interactive_type': 'explore',
    'footer': ' ',
    'linkTrackingEnabled': 'true',
    'msg_id': 'selectTop' 
  });

  
  await sendMsg(msg, payload.source);
};

const handleGarmentSelection = async (payload) => {
  const pl = payload.payload;
  let url;
  if (pl.title === "1") {
    url = "https://storage.googleapis.com/wa-script/Image%201%20-%20B.jpg";
  } else if (pl.title === "2") {
    url = "https://storage.googleapis.com/wa-script/Image%201%20-%20A.jpg";
  } else if (pl.title === "3") {
    url = "https://storage.googleapis.com/wa-script/Image%201%20-%20D.jpg";
  }

  const content = {
    type: "image",
    url,
    text: `Here are some outfits based on your selection. Like how we work? Yayyy!
Just send us the images of your clothes. 
We will do the outfit matchmaking for you :)`,
    caption: "",
  };

  const msg = 
  
  // {
  //   type: "quick_reply",
  //   msgid: "createWardrobe",
  //   content,
  //   options: [
  //     {
  //       type: "text",
  //       title: "Add Clothes",
  //     },
  //   ],
  // };

  qs.stringify({
    'method': 'SendMediaMessage',
    'send_to': payload.source,
    'msg_type': 'IMAGE',
    'userid': '20000XXXXXX',
    'auth_scheme': 'plain',
    'password': 'XXXXXX',
    'v': '1.1',
    'format': 'text',
    'data_encoding': 'TEXT',
    'media_url': url,
    'caption':  `Here are some outfits based on your selection. Like how we work? Yayyy!
    Just send us the images of your clothes. 
    We will do the outfit matchmaking for you :)`,
    'action': `{
      "buttons": [
        {
          "type": "reply",
          "reply": {
            "id": "1a",
            "title": "Add Clothes"
          }
        }
        
      ]
    }`,
    'interactive_type': 'createWardrobe',
    'footer': ' ',
    'linkTrackingEnabled': 'true',
    'msg_id': 'createWardrobe' 
  });

  
  await sendMsg(msg, payload.source);
};

const handleCreateWardrobe = async (payload) => {
  addClothesNewUser(payload);
};

const addClothesNewUser = async (payload) => {
  await User.findOneAndUpdate(
    { mobileNumber: payload.source },
    {
      isClickMatch: false,
    },
    {
      upsert: true,
      runValidators: true,
    }
  );
  const msg = 
  {
    type: "quick_reply",
    msgid: "addClothesNewUser",
    content: {
      type: "image",
      url: "https://storage.googleapis.com/wa-script/Image%202.png",
      text: `PS: I ONLY extract the garment from the image. Privacy game - Super Strong! 💪
    
Send us the images of *minimum 4 of your topwear and 4 of your bottomwear* to begin!`,
      caption: "",
    },
    options: [
      {
        type: "text",
        title: "Topwear",
        postbackText: "Add Clothes",
      },
      {
        type: "text",
        title: "Bottomwear",
        postbackText: "Add Clothes",
      },
    ],
  };

  qs.stringify({
    'method': 'SendMediaMessage',
    'send_to': payload.source,
    'msg_type': 'IMAGE',
    'userid': '20000XXXXXX',
    'auth_scheme': 'plain',
    'password': 'XXXXXX',
    'v': '1.1',
    'format': 'text',
    'data_encoding': 'TEXT',
    'media_url': "https://storage.googleapis.com/wa-script/Image%202.png",
    'caption':  `PS: I ONLY extract the garment from the image. Privacy game - Super Strong! 💪
    
    Send us the images of *minimum 4 of your topwear and 4 of your bottomwear* to begin!`,
    'action': `{
      "buttons": [
        {
          "type": "reply",
          "reply": {
            "id": "1a",
            "title": "Topwear"
          }
        },  {
          "type": "reply",
          "reply": {
            "id": "1a",
            "title": "Bottomwear"
          }
        }
        
      ]
    }`,
    'interactive_type': 'createWardrobe',
    'footer': ' ',
    'linkTrackingEnabled': 'true',
    'msg_id': 'addClothesNewUser' 
  });
  await sendMsg(msg, payload.source);
};

const handleAddClothesNewUser = async (payload) => {
  const pl = payload.payload;
  if (pl.title === "Topwear") {
    const msg =
    //  {
    //   type: "text",
    //   text: `Send us 4 of your topwear images, just click from your camera or upload from the gallery.`,
    // };
    qs.stringify({
      'send_to': payload.source,
      'msg_type': 'Text',
      'userid': '2000XXXXXX',
      'auth_scheme': 'plain',
      'password': 'XXXXXXX',
      'method': 'SendMessage',
      'v': '1.1',
      'format': 'json',
      'msg': 'Send us 4 of your topwear images, just click from your camera or upload from the gallery.' 
    })
        
    await sendMsg(msg, payload.source);
  } else if (pl.title === "Bottomwear") {
    const msg = 
    // {
    //   type: "text",
    //   text: `Send us 4 of your bottomwear images, just click from your camera or upload from the gallery.`,
    // };
    qs.stringify({
      'send_to': payload.source,
      'msg_type': 'Text',
      'userid': '2000XXXXXX',
      'auth_scheme': 'plain',
      'password': 'XXXXXXX',
      'method': 'SendMessage',
      'v': '1.1',
      'format': 'json',
      'msg': 'Send us 4 of your bottomwear images, just click from your camera or upload from the gallery.' 
    })
    await sendMsg(msg, payload.source);
  }
};

const mainMenu = async (payload) => {
  const msg = 
  
  // {
  //   type: "list",
  //   title: "",
  //   body: "Click on *Explore More* to unveil your style!",
  //   msgid: "mainMenu",
  //   globalButtons: [
  //     {
  //       type: "text",
  //       title: "Explore More",
  //     },
  //   ],
  //   items: [
  //     {
  //       title: "Explore More",
  //       subtitle: "Explore More",
  //       options: [
  //         {
  //           type: "text",
  //           title: "Add Clothes",
  //           description: "Click from your camera or upload from your gallery",
  //           postbackText: "Add Clothes",
  //         },
  //         {
  //           type: "text",
  //           title: "View My Wardrobe",
  //           description: "Unveil your digital wardrobe",
  //           postbackText: "View My Wardrobe",
  //         },
  //         {
  //           type: "text",
  //           title: "Get Wardrobe Outfit",
  //           description: "Select the garment for which you want outfits",
  //           postbackText: "Get Wardrobe Outfit",
  //         },
  //         {
  //           type: "text",
  //           title: "Outfits For Occasion",
  //           description: "Let us dress you for work, date night or partayyy",
  //           postbackText: "Outfits For Occasion",
  //         },
  //         {
  //           type: "text",
  //           title: "Click and Match",
  //           description:
  //             "Send pictures while shopping and match with clothes in your wardrobe",
  //           postbackText: "Click and Match",
  //         },
  //         {
  //           type: "text",
  //           title: "Feedback/Help",
  //           description: "We would love to hear from you",
  //           postbackText: "Feedback/Help",
  //         },
  //       ],
  //     },
  //   ],
  // };


  qs.stringify({
    'method': 'SENDMESSAGE',
    'msg': `Click on *Explore More* to unveil your style!`,
    'msg_type': 'text',
    'userid': '2000XXXXX',
    'auth_scheme': 'plain',
    'password': 'XXXXXX',
    'format': 'text',
    'interactive_type': 'list',
    'send_to': '9999999999',
    'action': `{
      "button": "Menu",
      "sections": [
        {
          "title": "️Explore More",
          "rows": [
            {
              "id": "id1",
              "title": "Add Clothes",
              "description": "Click from your camera or upload from your gallery"
            },
            {
              "id": "id2",
              "title": "View My Wardrobe",
              "description": "Unveil your digital wardrobe"
            },
            {
              "id": "id3",
              "title": "Get Wardrobe Outfit",
              "description": "Select the garment for which you want outfits"
            },
            {
              "id": "id4",
              "title": "Outfits For Occasion",
              "description": "Let us dress you for work, date night or partayyy"
            },
            {
              "id": "id5",
              "title": "Click and Match",
              "description": "Send pictures while shopping and match with clothes in your wardrobe"
            },
            {
              "id": "id6",
              "title": "Feedback/Help",
              "description": "We would love to hear from you"
            }
          ]
        }
      ]
    }`})





  await sendMsg(msg, payload.source);
};

const addClothes = async (payload) => {
  await User.findOneAndUpdate(
    { mobileNumber: payload.source },
    {
      isClickMatch: false,
    },
    {
      upsert: true,
      runValidators: true,
    }
  );
  const msg = 
  // {
  //   type: "text",
  //   text: "Send us pictures of your garments. Upload from gallery or click from your camera",
  // };
  qs.stringify({
    'send_to': payload.source,
    'msg_type': 'Text',
    'userid': '2000XXXXXX',
    'auth_scheme': 'plain',
    'password': 'XXXXXXX',
    'method': 'SendMessage',
    'v': '1.1',
    'format': 'json',
    'msg': 'Send us pictures of your garments. Upload from gallery or click from your camera' 
  })
  
  await sendMsg(msg, payload.source);
};

const clickAndMatch = async (payload) => {
  await User.findOneAndUpdate(
    { mobileNumber: payload.source },
    {
      isClickMatch: true,
    },
    {
      upsert: true,
      runValidators: true,
    }
  );
  const msg = 
  // {
  //   type: "text",
  //   text: `*Just send us a picture of a garment* while you shop and we will match it with clothes in your digital wardrobe!`,
  // };
  qs.stringify({
    'send_to': payload.source,
    'msg_type': 'Text',
    'userid': '2000XXXXXX',
    'auth_scheme': 'plain',
    'password': 'XXXXXXX',
    'method': 'SendMessage',
    'v': '1.1',
    'format': 'json',
    'msg': `*Just send us a picture of a garment* while you shop and we will match it with clothes in your digital wardrobe!`
  })
  
  await sendMsg(msg, payload.source);
};

const feedbackHelp = async (payload) => {
  let user = await User.findOneAndUpdate(
    { mobileNumber: payload.source },
    { mobileNumber: payload.source, givingFeedback: true },
    { upsert: true, runValidators: true }
  );
  const msg =
  //  {
  //   type: "list",
  //   title: "Feedback",
  //   body: "Please share your feedback/query here, we are all ears.📝",
  //   msgid: "mainMenu",
  //   globalButtons: [
  //     {
  //       type: "text",
  //       title: "Explore More",
  //     },
  //   ],
  //   items: [
  //     {
  //       title: "Explore More",
  //       subtitle: "Explore More",
  //       options: [
  //         {
  //           type: "text",
  //           title: "Add Clothes",
  //           description: "Click from your camera or upload from your gallery.",
  //           postbackText: "Add Clothes",
  //         },
  //         {
  //           type: "text",
  //           title: "View My Wardrobe",
  //           description: "Unveil your digital wardrobe",
  //           postbackText: "View My Wardrobe",
  //         },
  //         {
  //           type: "text",
  //           title: "Get Wardrobe Outfit",
  //           description: "Select the garment for which you want outfits",
  //           postbackText: "Get Wardrobe Outfit",
  //         },
  //         {
  //           type: "text",
  //           title: "Outfits For Occasion",
  //           description: "Let us dress you for work, date night or partayyy",
  //           postbackText: "Outfits For Occasion",
  //         },
  //         {
  //           type: "text",
  //           title: "Click and Match",
  //           description:
  //             "Send pictures while shopping and match with clothes in your wardrobe",
  //           postbackText: "Click and Match",
  //         },
  //         {
  //           type: "text",
  //           title: "Feedback/Help",
  //           description: "We would love to hear from you",
  //           postbackText: "Feedback/Help",
  //         },
  //       ],
  //     },
  //   ],
  // };

  qs.stringify({
    'method': 'SENDMESSAGE',
    'msg': `Please share your feedback/query here, we are all ears.📝`,
    'msg_type': 'text',
    'userid': '2000XXXXX',
    'auth_scheme': 'plain',
    'password': 'XXXXXX',
    'format': 'text',
    'interactive_type': 'list',
    'send_to': '9999999999',
    'action': `{
      "button": "Menu",
      "sections": [
        {
          "title": "️Explore More",
          "rows": [
            {
              "id": "id1",
              "title": "Add Clothes",
              "description": "Click from your camera or upload from your gallery"
            },
            {
              "id": "id2",
              "title": "View My Wardrobe",
              "description": "Unveil your digital wardrobe"
            },
            {
              "id": "id3",
              "title": "Get Wardrobe Outfit",
              "description": "Select the garment for which you want outfits"
            },
            {
              "id": "id4",
              "title": "Outfits For Occasion",
              "description": "Let us dress you for work, date night or partayyy"
            },
            {
              "id": "id5",
              "title": "Click and Match",
              "description": "Send pictures while shopping and match with clothes in your wardrobe"
            },
            {
              "id": "id6",
              "title": "Feedback/Help",
              "description": "We would love to hear from you"
            }
          ]
        }
      ]
    }`})

  sendMsg(msg, payload.source);
};

const handleMenuText = (payload) => {
  mainMenu(payload);
};

const handleMainMenu = async (payload) => {
  const pl = payload.payload;
  if (pl.postbackText === "Add Clothes") {
    addClothes(payload);
  } else if (pl.postbackText === "View My Wardrobe") {
    viewWardrobe(payload);
  } else if (pl.postbackText === "Get Wardrobe Outfit") {
    fromWardrobe(payload);
  } else if (pl.postbackText === "Outfits For Occasion") {
    occasionBasedOutfits(payload);
  } else if (pl.postbackText === "Click and Match") {
    clickAndMatch(payload);
  } else if (pl.postbackText === "Feedback/Help") {
    feedbackHelp(payload);
  }
};

const thankYou = async (payload) => {
  const msg = {
    type: "quick_reply",
    msgid: "thankyou",
    content: {
      type: "text",
      text: `Should we see more outfits or do you want to come
      back later?
      PS. Don't forget to try the outfits we co-created. Use
      #hopnobfashion on Insta to get featured in our
      community.`,
    },
    options: [
      {
        type: "text",
        title: "Main Menu",
      },
      {
        type: "text",
        title: "See you later",
      },
    ],
  };
  sendMsg(msg, payload.source);
};

const handleThankYou = async (payload) => {
  const pl = payload.payload;
  if (pl.title === "Main Menu") {
    mainMenu(payload);
  } else if (pl.title === "See you later") {
    const msg1 = 
    // {
    //   type: "text",
    //   text: `If we were helpful, please feel free to save this
    //   number (919016754973) as "Hey Hopnob" in your
    //   contacts and share it with your friends on
    //   Whatsapp.
      
    //   Your Preferences. Your Clothes. Your Outfits.`,
    // };
    qs.stringify({
      'send_to': payload.source,
      'msg_type': 'Text',
      'userid': '2000XXXXXX',
      'auth_scheme': 'plain',
      'password': 'XXXXXXX',
      'method': 'SendMessage',
      'v': '1.1',
      'format': 'json',
      'msg': `If we were helpful, please feel free to save this
      number (919016754973) as "Hey Hopnob" in your
      contacts and share it with your friends on
      Whatsapp.
      
      Your Preferences. Your Clothes. Your Outfits.`
    })
    
    const msg2 = {
      type: "image",
      originalUrl: "https://storage.googleapis.com/wa-script/Gif%207.gif",
      previewUrl: "https://storage.googleapis.com/wa-script/Gif%207.gif",
      caption: "",
    };
    await sendMsg(msg1, payload.source);
    await sendMsg(msg2, payload.source);
  }
};

const handleExploreMore = async (payload) => {
  mainMenu(payload);
};

const emptyOccasionOutfits = async (data) => {
  const msg = {
    type: "quick_reply",
    msgid: "exploreMore",
    content: {
      type: "image",
      url: "https://storage.googleapis.com/wa-script/add%20more%20clothes.jpg",
      text: `Sorry, your wardrobe does not have enough outfits for the selected occasion. Please send images of more clothes`,
      caption: "",
    },
    options: [
      {
        type: "text",
        title: "Explore More",
      },
    ],
  };
  await sendMsg(msg, data.mobileNumber);
};

const emptyMinimumNumberOfClothes = async (data) => {
  const msg = {
    type: "quick_reply",
    msgid: "exploreMore",
    content: {
      type: "image",
      url: "https://storage.googleapis.com/wa-script/add%20more%20clothes.jpg",
      text: `Please send more topwear and bottomwear images to see your outfits. (10 images would do the trick! 😍)`,
      caption: "",
    },
    options: [
      {
        type: "text",
        title: "Explore More",
      },
    ],
  };
  await sendMsg(msg, data.mobileNumber);
};

const empty = async (data) => {
  const msg = {
    type: "quick_reply",
    msgid: "exploreMore",
    content: {
      type: "image",
      url: "https://storage.googleapis.com/wa-script/Add%204%20Topwear%2C%20Add%203%20or%204%20bottomwear%2CAdd%203%20or%204%20Layers.png",
      text: `Ohhh.. Please upload more clothes to see outfits.`,
      caption: "",
    },
    options: [
      {
        type: "text",
        title: "Explore More",
      },
    ],
  };
  await sendMsg(msg, data.mobileNumber);
};

const blurry = async (data) => {
  const msg = {
    type: "quick_reply",
    msgid: "exploreMore",
    content: {
      type: "image",
      url: "https://storage.googleapis.com/wa-script/Image%203.jpg",
      text: `Please send us clear images of your clothes. Lay/hang your clothes like the above image while clicking the pictures.`,
      caption: "",
    },
    options: [
      {
        type: "text",
        title: "Explore More",
      },
    ],
  };
  await sendMsg(msg, data.tags.phone_number);
};

const fromWardrobe = async (payload) => {
  // Encode the String
  var encodedStringBtoA = btoa(payload.source);
  console.log(encodedStringBtoA);

  const msg = 
//   {
//     type: "list",
//     title: "Wardrobe",
//     body: `Click on the below link to view your wardrobe and select the garment for which you’d want the outfit suggestions.

// PS: Allow pop-ups from Hopnob on your browser to bring life to your digital wardrobe.
    
// https://taupe-nasturtium-06edf4.netlify.app/${encodedStringBtoA}

// If you are not able to click on the link,
// just *save* our number to use this link`,
//     msgid: "mainMenu",
//     globalButtons: [
//       {
//         type: "text",
//         title: "Explore More",
//       },
//     ],
//     items: [
//       {
//         title: "Explore More",
//         subtitle: "Explore More",
//         options: [
//           {
//             type: "text",
//             title: "Add Clothes",
//             description: "Click from your camera or upload from your gallery",
//             postbackText: "Add Clothes",
//           },
//           {
//             type: "text",
//             title: "View My Wardrobe",
//             description: "Unveil your digital wardrobe",
//             postbackText: "View My Wardrobe",
//           },
//           {
//             type: "text",
//             title: "Get Wardrobe Outfit",
//             description: "Select the garment for which you want outfits",
//             postbackText: "Get Wardrobe Outfit",
//           },
//           {
//             type: "text",
//             title: "Outfits For Occasion",
//             description: "Let us dress you for work, date night or partayyy",
//             postbackText: "Outfits For Occasion",
//           },
//           {
//             type: "text",
//             title: "Click and Match",
//             description:
//               "Send pictures while shopping and match with clothes in your wardrobe",
//             postbackText: "Click and Match",
//           },
//           {
//             type: "text",
//             title: "Feedback/Help",
//             description: "We would love to hear from you",
//             postbackText: "Feedback/Help",
//           },
//         ],
//       },
//     ],
//   };

  qs.stringify({
    'method': 'SENDMESSAGE',
    'msg': `Click on the below link to view your wardrobe and select the garment for which you’d want the outfit suggestions.

    PS: Allow pop-ups from Hopnob on your browser to bring life to your digital wardrobe.
        
    https://taupe-nasturtium-06edf4.netlify.app/${encodedStringBtoA}
    
    If you are not able to click on the link,
    just *save* our number to use this link`,
    'msg_type': 'text',
    'userid': '2000XXXXX',
    'auth_scheme': 'plain',
    'password': 'XXXXXX',
    'format': 'text',
    'interactive_type': 'list',
    'send_to': '9999999999',
    'action': `{
      "button": "Menu",
      "sections": [
        {
          "title": "️Explore More",
          "rows": [
            {
              "id": "id1",
              "title": "Add Clothes",
              "description": "Click from your camera or upload from your gallery"
            },
            {
              "id": "id2",
              "title": "View My Wardrobe",
              "description": "Unveil your digital wardrobe"
            },
            {
              "id": "id3",
              "title": "Get Wardrobe Outfit",
              "description": "Select the garment for which you want outfits"
            },
            {
              "id": "id4",
              "title": "Outfits For Occasion",
              "description": "Let us dress you for work, date night or partayyy"
            },
            {
              "id": "id5",
              "title": "Click and Match",
              "description": "Send pictures while shopping and match with clothes in your wardrobe"
            },
            {
              "id": "id6",
              "title": "Feedback/Help",
              "description": "We would love to hear from you"
            }
          ]
        }
      ]
    }`})

  await sendMsg(msg, payload.source);
};

const viewWardrobe = async (payload) => {
  // Encode the String
  var encodedStringBtoA = btoa(payload.source);
  console.log(encodedStringBtoA);

  const msg =
//    {
//     type: "list",
//     title: "Wardrobe",
//     body: `Click on the below link to view your digital wardrobe.
    
// https://taupe-nasturtium-06edf4.netlify.app/${encodedStringBtoA}

// If you are not able to click on the link,
// just *save* our number to use this link`,
//     msgid: "mainMenu",
//     globalButtons: [
//       {
//         type: "text",
//         title: "Explore More",
//       },
//     ],
//     items: [
//       {
//         title: "Explore More",
//         subtitle: "Explore More",
//         options: [
//           {
//             type: "text",
//             title: "Add Clothes",
//             description: "Click from your camera or upload from your gallery",
//             postbackText: "Add Clothes",
//           },
//           {
//             type: "text",
//             title: "View My Wardrobe",
//             description: "Unveil your digital wardrobe",
//             postbackText: "View My Wardrobe",
//           },
//           {
//             type: "text",
//             title: "Get Wardrobe Outfit",
//             description: "Select the garment for which you want outfits",
//             postbackText: "Get Wardrobe Outfit",
//           },
//           {
//             type: "text",
//             title: "Outfits For Occasion",
//             description: "Let us dress you for work, date night or partayyy",
//             postbackText: "Outfits For Occasion",
//           },
//           {
//             type: "text",
//             title: "Click and Match",
//             description:
//               "Send pictures while shopping and match with clothes in your wardrobe",
//             postbackText: "Click and Match",
//           },
//           {
//             type: "text",
//             title: "Feedback/Help",
//             description: "We would love to hear from you",
//             postbackText: "Feedback/Help",
//           },
//         ],
//       },
//     ],
//   };


  qs.stringify({
    'method': 'SENDMESSAGE',
    'msg': `Click on the below link to view your digital wardrobe.
    
    https://taupe-nasturtium-06edf4.netlify.app/${encodedStringBtoA}
    
    If you are not able to click on the link,
    just *save* our number to use this link`,
    'msg_type': 'text',
    'userid': '2000XXXXX',
    'auth_scheme': 'plain',
    'password': 'XXXXXX',
    'format': 'text',
    'interactive_type': 'list',
    'send_to': '9999999999',
    'action': `{
      "button": "Menu",
      "sections": [
        {
          "title": "️Explore More",
          "rows": [
            {
              "id": "id1",
              "title": "Add Clothes",
              "description": "Click from your camera or upload from your gallery"
            },
            {
              "id": "id2",
              "title": "View My Wardrobe",
              "description": "Unveil your digital wardrobe"
            },
            {
              "id": "id3",
              "title": "Get Wardrobe Outfit",
              "description": "Select the garment for which you want outfits"
            },
            {
              "id": "id4",
              "title": "Outfits For Occasion",
              "description": "Let us dress you for work, date night or partayyy"
            },
            {
              "id": "id5",
              "title": "Click and Match",
              "description": "Send pictures while shopping and match with clothes in your wardrobe"
            },
            {
              "id": "id6",
              "title": "Feedback/Help",
              "description": "We would love to hear from you"
            }
          ]
        }
      ]
    }`})






  await sendMsg(msg, payload.source);
};

const occasionBasedOutfits = async (payload) => {
  const msg = 
  // {
  //   type: "list",
  //   title: "Let's choose",
  //   body: "For which occasion can we dress you today?",
  //   msgid: "occasionBasedOutfits",
  //   globalButtons: [
  //     {
  //       type: "text",
  //       title: "Select an option",
  //     },
  //   ],
  //   items: [
  //     {
  //       title: "Select an option",
  //       subtitle: "Select an option",
  //       options: [
  //         {
  //           type: "text",
  //           title: "Keep it casual",
  //           description: "",
  //           postbackText: "Keep it casual",
  //         },
  //         {
  //           type: "text",
  //           title: "Just brunching",
  //           description: "",
  //           postbackText: "Just brunching",
  //         },
  //         {
  //           type: "text",
  //           title: "Work",
  //           description: "",
  //           postbackText: "Work",
  //         },
  //         {
  //           type: "text",
  //           title: "Date Night",
  //           description: "",
  //           postbackText: "Date Night",
  //         },
  //         {
  //           type: "text",
  //           title: "Party",
  //           description: "",
  //           postbackText: "Party",
  //         },
  //       ],
  //     },
  //   ],
  // };


  qs.stringify({
    'method': 'SENDMESSAGE',
    'msg': `For which occasion can we dress you today?`,
    'msg_type': 'text',
    'userid': '2000XXXXX',
    'auth_scheme': 'plain',
    'password': 'XXXXXX',
    'format': 'text',
    'interactive_type': 'list',
    'send_to': payload.source,
    'action': `{
      "button": "Menu",
      "sections": [
        {
          "title": "️Let's choose",
          "rows": [
            {
              "id": "id1",
              "title": "Keep it casual",
              "description": ""
            },
            {
              "id": "id2",
              "title": "Just brunching",
              "description": ""
            },
            {
              "id": "id3",
              "title": "Work",
              "description": ""
            },
            {
              "id": "id4",
              "title": "Date Night",
              "description": ""
            },
            {
              "id": "id5",
              "title": "Party",
              "description": ""
            }
          ]
        }
      ]
    }`})

  await sendMsg(msg, payload.source);
};

const handleOccasionBasedOutfits = async (payload) => {
  const pl = payload.payload;
  if (pl.postbackText === "Keep it casual") {
    keepItCasual(payload);
  } else if (pl.postbackText === "Just brunching") {
    justBrunching(payload);
  } else if (pl.postbackText === "Work") {
    work(payload);
  } else if (pl.postbackText === "Date Night") {
    dateNight(payload);
  } else if (pl.postbackText === "Party") {
    party(payload);
  }
};

const keepItCasual = async (payload) => {
  const msg =
  //  {
  //   type: "text",
  //   text: `Gotcha! Let's keep it cool and easy. Try these outfits...`,
  // };
  qs.stringify({
    'send_to': payload.source,
    'msg_type': 'Text',
    'userid': '2000XXXXXX',
    'auth_scheme': 'plain',
    'password': 'XXXXXXX',
    'method': 'SendMessage',
    'v': '1.1',
    'format': 'json',
    'msg': `Gotcha! Let's keep it cool and easy. Try these outfits...`
  })

  await sendMsg(msg, payload.source);
  const nc = getNATS();
  const sc = StringCodec();
  const obj = {
    mobileNumber: payload.source,
    recommend: 1,
    wardrobe: 0,
    clickMatch: 0,
    url: "https://www.hopnob.in",
    occasion: "keepItCasual",
    mode: 2,
  };

  const sendString = JSON.stringify(obj);
  nc.publish("test_whatsapp", sc.encode(sendString));
  console.log("published");
};

const justBrunching = async (payload) => {
  const msg =
  //  {
  //   type: "text",
  //   text: `Awesome! Let's get you weekend ready in no time. Try these outfits...`,
  // };
  qs.stringify({
    'send_to': payload.source,
    'msg_type': 'Text',
    'userid': '2000XXXXXX',
    'auth_scheme': 'plain',
    'password': 'XXXXXXX',
    'method': 'SendMessage',
    'v': '1.1',
    'format': 'json',
    'msg': `Awesome! Let's get you weekend ready in no time. Try these outfits...` 
  });
  await sendMsg(msg, payload.source);
  const nc = getNATS();
  const sc = StringCodec();
  const obj = {
    id:"",
    mobileNumber: payload.source,
    recommend: 1,
    wardrobe: 0,
    clickMatch: 0,
    url: "https://www.hopnob.in",
    occasion: "justBrunching",
    mode: 2,
  };

  const sendString = JSON.stringify(obj);
  nc.publish("staging_whatsapp_payload", sc.encode(sendString));
  console.log("published");
};

const work = async (payload) => {
  const msg = 
  // {
  //   type: "text",
  //   text: `Okay! Let's set you up for your next promotion. Try these outfits...`,
  // };
  qs.stringify({
    'send_to': payload.source,
    'msg_type': 'Text',
    'userid': '2000XXXXXX',
    'auth_scheme': 'plain',
    'password': 'XXXXXXX',
    'method': 'SendMessage',
    'v': '1.1',
    'format': 'json',
    'msg': `Okay! Let's set you up for your next promotion. Try these outfits...`
  });
  await sendMsg(msg, payload.source);
  const nc = getNATS();
  const sc = StringCodec();
  const obj = {
    mobileNumber: payload.source,
    recommend: 1,
    wardrobe: 0,
    clickMatch: 0,
    url: "https://www.hopnob.in",
    occasion: "work",
    mode: 2,
  };

  const sendString = JSON.stringify(obj);
  nc.publish("test_whatsapp", sc.encode(sendString));
  console.log("published");
};

const dateNight = async (payload) => {
  const msg =
  //  {
  //   type: "text",
  //   text: `Sweeeet! Let's dress to impress your special someone! Try these outfits...`,
  // };
  qs.stringify({
    'send_to': payload.source,
    'msg_type': 'Text',
    'userid': '2000XXXXXX',
    'auth_scheme': 'plain',
    'password': 'XXXXXXX',
    'method': 'SendMessage',
    'v': '1.1',
    'format': 'json',
    'msg': `Sweeeet! Let's dress to impress your special someone! Try these outfits...`
  });
  await sendMsg(msg, payload.source);
  const nc = getNATS();
  const sc = StringCodec();
  const obj = {
    id:"",
    mobileNumber: payload.source,
    recommend: 1,
    wardrobe: 0,
    clickMatch: 0,
    url: "https://www.hopnob.in",
    occasion: "dateNight",
    mode: 2,
  };

  const sendString = JSON.stringify(obj);
  nc.publish("whatsapp_staging", sc.encode(sendString));
  console.log("published");
};

const party = async (payload) => {
  const msg = 
  // {
  //   type: "text",
  //   text: `Wooh! Let's help you become the eye-popper partyer! Try these outfits tonight!`,
  // };
  qs.stringify({
    'send_to': payload.source,
    'msg_type': 'Text',
    'userid': '2000XXXXXX',
    'auth_scheme': 'plain',
    'password': 'XXXXXXX',
    'method': 'SendMessage',
    'v': '1.1',
    'format': 'json',
    'msg': `Wooh! Let's help you become the eye-popper partyer! Try these outfits tonight!`
  });
  await sendMsg(msg, payload.source);
  const nc = getNATS();
  const sc = StringCodec();
  const obj = {
    mobileNumber: payload.source,
    recommend: 1,
    wardrobe: 0,
    clickMatch: 0,
    url: "https://www.hopnob.in",
    occasion: "party",
    mode: 2,
  };

  const sendString = JSON.stringify(obj);
  nc.publish("test_whatsapp", sc.encode(sendString));
  console.log("published");
};

const recommend = async (data) => {
  try {
    console.log("data", data);
    const mobileNumber = data.mobileNumber;
    const recs = data.image_recommendation;
    // if image is blurry, send message
    // blurry(payload);
    // if image is empty, send message
    // console.log("recs", recs);
    let user = await User.findOne({ mobileNumber: data.mobileNumber });

    if (!user) {
      user = await User.create({ mobileNumber: data.mobileNumber });
      console.log("User created");
    } else {
      console.log("User found");
    }
    if (data.clickMatch === 1) {
      await ApparelClickAndMatch.create({
        mobileNumber: user.mobileNumber,
        url: data.url,
      });
      console.log("Apparel Click and Match created");
    }
    const apparels = await Apparel.find({ mobileNumber: user.mobileNumber });
    if (apparels.length < 10) {
      emptyMinimumNumberOfClothes(data);
      return;
    }
    if (recs.length === 0) {
      if (data.occasion == "") {
        empty(data);
      } else {
        emptyOccasionOutfits(data);
      }
      return;
    }

    const msg = {
      type: "quick_reply",
      msgid: "exploreMore",
      content: {
        type: "image",
        url: recs[0],
        text: "Here you go!",
        caption: "",
      },
      options: [
        {
          type: "text",
          title: "Explore More",
        },
      ],
    };
    await sendMsg(msg, mobileNumber);
  } catch (err) {
    console.log("err", err);
  }
};

const imageReceivedRecommend = async (payload) => {
  const msg = {
    type: "text",
    text: `Hang in there, your outfits are a few seconds away..`,
  };
  await sendMsg(msg, payload.source);
};

const imageReceivedSegment = async (payload) => {
  const msg = {
    type: "text",
    text: `Hang in there, entering the digital world of your clothes in a few minutes…`,
  };
  await sendMsg(msg, payload.source);
};

const segment = async (data) => {
  try {
    console.log("data", data);
    if (data.tags.clickMatch === 1) return;

    let user = await User.findOne({ mobileNumber: data.tags.phone_number });

    if (!user) {
      user = await User.create({ mobileNumber: data.tags.phone_number });
      console.log("User created");
    } else {
      console.log("User found");
    }

    if (data.tags.apparels.length === 0) {
      blurry(data);
      return;
    }

    await Apparel.create({
      mobileNumber: user.mobileNumber,
      url: data.url,
      category: data.tags.apparels[0].category[0],
      color: data.tags.apparels[0].color[0],
      subcategory: data.tags.apparels[0].subcategory[0],
      design: data.tags.apparels[0].design[0],
      pattern: data.tags.pattern[0],
    });
    console.log("Apparel created");

    const occasions = [
      "KeepItCasual",
      "JustBrunchin",
      "Work",
      "DateNight",
      "Party",
    ];

    for (const occasion of occasions) {
      if (data.recommendation[occasion].length === 0) continue;
      for (const rec of data.recommendation[occasion]) {
        await Occasion.findOneAndUpdate(
          { mobileNumber: user.mobileNumber, occasion: occasion },
          {
            mobileNumber: user.mobileNumber,
            occasion: occasion,
            $push: {
              recommendations: rec,
            },
          },
          {
            upsert: true,
            runValidators: true,
          }
        );
      }

      console.log("Occasion created");
    }

    if (data.recommend == 0) return;
    const mobileNumber = data.tags.phone_number;
    var encodedStringBtoA = btoa(mobileNumber);
    console.log(encodedStringBtoA);

    const msg = 
//     {
//       type: "list",
//       title: "Yay!",
//       body: `Your clothes have been added to your digital wardrobe!
// Have a look.

// https://taupe-nasturtium-06edf4.netlify.app/${encodedStringBtoA}

// If you are not able to click on the link,
// just *save* our number to use this link`,
//       msgid: "mainMenu",
//       globalButtons: [
//         {
//           type: "text",
//           title: "Explore More",
//         },
//       ],
//       items: [
//         {
//           title: "Explore More",
//           subtitle: "Explore More",
//           options: [
//             {
//               type: "text",
//               title: "Add Clothes",
//               description: "Click from your camera or upload from your gallery",
//               postbackText: "Add Clothes",
//             },
//             {
//               type: "text",
//               title: "View My Wardrobe",
//               description: "Unveil your digital wardrobe",
//               postbackText: "View My Wardrobe",
//             },
//             {
//               type: "text",
//               title: "Get Wardrobe Outfit",
//               description: "Select the garment for which you want outfits",
//               postbackText: "Get Wardrobe Outfit",
//             },
//             {
//               type: "text",
//               title: "Outfits For Occasion",
//               description: "Let us dress you for work, date night or partayyy",
//               postbackText: "Outfits For Occasion",
//             },
//             {
//               type: "text",
//               title: "Click and Match",
//               description:
//                 "Send pictures while shopping and match with clothes in your wardrobe",
//               postbackText: "Click and Match",
//             },
//             {
//               type: "text",
//               title: "Feedback/Help",
//               description: "We would love to hear from you",
//               postbackText: "Feedback/Help",
//             },
//           ],
//         },
//       ],
//     };


  qs.stringify({
    'method': 'SENDMESSAGE',
    'msg': `Your clothes have been added to your digital wardrobe!
    Have a look.
    
    https://taupe-nasturtium-06edf4.netlify.app/${encodedStringBtoA}
    
    If you are not able to click on the link,
    just *save* our number to use this link`,
    'msg_type': 'text',
    'userid': '2000XXXXX',
    'auth_scheme': 'plain',
    'password': 'XXXXXX',
    'format': 'text',
    'interactive_type': 'list',
    'send_to': payload.source,
    'action': `{
      "button": "Menu",
      "sections": [
        {
          "title": "️Yay!",
          "rows": [
            {
              "id": "id1",
              "title": "Add Clothes",
              "description": "Click from your camera or upload from your gallery"
            },
            {
              "id": "id2",
              "title": "View My Wardrobe",
              "description": "Unveil your digital wardrobe"
            },
            {
              "id": "id3",
              "title": "Get Wardrobe Outfit",
              "description": "Select the garment for which you want outfits"
            },
            {
              "id": "id4",
              "title": "Outfits For Occasion",
              "description": "Let us dress you for work, date night or partayyy"
            },
            {
              "id": "id5",
              "title": "Click and Match",
              "description": "Send pictures while shopping and match with clothes in your wardrobe"
            },
            {
              "id": "id5",
              "title": "Feedback/Help",
              "description": "We would love to hear from you"
            }
          ]
        }
      ]
    }`})


    await sendMsg(msg, mobileNumber);
  } catch (err) {
    console.log("err", err);
  }
};

module.exports = {
  handleHi,
  handleGarmentSelection,
  handleMainMenu,
  handleThankYou,
  empty,
  blurry,
  handleOccasionBasedOutfits,
  handleGetStarted,
  handleExplore,
  handleCreateWardrobe,
  handleAddClothesNewUser,
  recommend,
  segment,
  handleMenuText,
  handleExploreMore,
  imageReceivedRecommend,
  imageReceivedSegment,
  handleFeedback,
};
