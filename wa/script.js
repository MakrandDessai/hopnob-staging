const { sendMsg } = require("./sendMsg");
const { getNATS } = require("../nats/connect");
const { StringCodec } = require("nats");
const User = require("../models/User");
const Apparel = require("../models/Apparel");
const ApparelClickAndMatch = require("../models/ApparelClickAndMatch");
const Occasion = require("../models/Occasion");

const handleHi = async (payload) => {
  var user = await User.findOne({ mobileNumber: payload.source });
  if (!user) {
    // if user is not found
    user = await User.create({ mobileNumber: payload.source });
    console.log("User created");
    const msg1 = {
      type: "video",
      url: "https://storage.googleapis.com/wa-script/video%201.mp4",
      caption: `Hello ${user.firstName ?? ""}😄 
I am *Hopnob*, your personalized styling partner.

I can help you with :
  • *Digitizing* your wardrobe in seconds
  • *Matching* and *creating* instant outfits from *your* clothes
  • Suggesting *occasion based outfits* from your wardrobe

*Hopnob* is loved by its community of *10k+* and is super excited to be your style buddy!!
`,
    };
    const msg2 = {
      type: "quick_reply",
      msgid: "explore",
      content: {
        type: "text",
        text: "Let's get started? Click Explore :)",
      },
      options: [
        {
          type: "text",
          title: "Explore",
        },
        {
          type: "text",
          title: "Main Menu",
        },
      ],
    };
    await sendMsg(msg1, payload.source);
    await sendMsg(msg2, payload.source);
  } else {
    // if  user is found
    console.log("User found");
    const msg1 = {
      type: "video",
      url: "https://storage.googleapis.com/wa-script/video%201.mp4",
      caption: `Hello ${user.firstName ?? ""} 😄
Welcome back to Hopnob!`,
    };
    const msg2 = {
      type: "list",
      title: "We missed you!",
      body: `Let's pick some awesome outfits for you, shall we?`,
      msgid: "getStarted",
      globalButtons: [
        {
          type: "text",
          title: "Select an option",
        },
      ],
      items: [
        {
          title: "Select an option",
          subtitle: "Select an option",
          options: [
            {
              type: "text",
              title: "Add Clothes",
              description: "",
              postbackText: "Add Clothes",
            },
            {
              type: "text",
              title: "Get Outfit Suggest",
              description: "",
              postbackText: "Get Outfit Suggestions",
            },
            {
              type: "text",
              title: "Click and Match",
              description: "",
              postbackText: "Click and Match",
            },
            {
              type: "text",
              title: "Feedback/Help",
              description: "",
              postbackText: "Feedback/Help",
            },
          ],
        },
      ],
    };
    await sendMsg(msg1, payload.source);
    await sendMsg(msg2, payload.source);
  }
};

const handleGetStarted = async (payload) => {
  const pl = payload.payload;
  if (pl.postbackText === "Add Clothes") {
    addClothes(payload);
  } else if (pl.postbackText === "Get Outfit Suggestions") {
    getOutfitSuggestions(payload);
  } else if (pl.postbackText === "Click and Match") {
    clickAndMatch(payload);
  } else if (pl.postbackText === "Feedback/Help") {
    feedbackHelp(payload);
  }
};

const handleExplore = async (payload) => {
  const pl = payload.payload;
  if (pl.title === "Explore") {
    garmentSelection(payload);
  } else if (pl.title === "Main Menu") {
    mainMenu(payload);
  }
};

const garmentSelection = async (payload) => {
  const msg1 = {
    type: "sticker",
    url: "https://storage.googleapis.com/wa-script/sticker%201.webp",
  };
  const msg2 = {
    type: "sticker",
    url: "https://storage.googleapis.com/wa-script/sticker%202.webp",
  };
  const msg3 = {
    type: "sticker",
    url: "https://storage.googleapis.com/wa-script/sticker%203.webp",
  };
  const msg4 = {
    type: "sticker",
    url: "https://storage.googleapis.com/wa-script/sticker%204.webp",
  };
  const msg = {
    type: "list",
    title: "Let’s start!",
    body: `To start, tell us which topwear do you like - 1, 2, 3 or 4?
For eg., if you like the *Yellow top, just select "1"* from the options.`,
    msgid: "selectTop",
    globalButtons: [
      {
        type: "text",
        title: "Select an option",
      },
    ],
    items: [
      {
        title: "Select an option",
        subtitle: "Select an option",
        options: [
          {
            type: "text",
            title: "1",
            description: "",
            postbackText: "1",
          },
          {
            type: "text",
            title: "2",
            description: "",
            postbackText: "2",
          },
          {
            type: "text",
            title: "3",
            description: "",
            postbackText: "3",
          },
          {
            type: "text",
            title: "4",
            description: "",
            postbackText: "4",
          },
        ],
      },
    ],
  };
  await sendMsg(msg1, payload.source);
  await sendMsg(msg2, payload.source);
  await sendMsg(msg3, payload.source);
  await sendMsg(msg4, payload.source);
  await sendMsg(msg, payload.source);
};

const handleGarmentSelection = async (payload) => {
  const pl = payload.payload;
  const msg1 = {
    type: "sticker",
    url: "https://storage.googleapis.com/wa-script/sticker%205.webp",
  };
  const msg2 = {
    type: "text",
    text: "Here are a few *kickass outfits* for your selection:",
  };
  await sendMsg(msg1, payload.source);
  await sendMsg(msg2, payload.source);
  var msg = {};
  if (pl.postbackText === "1") {
    msg = {
      type: "image",
      originalUrl:
        "https://storage.googleapis.com/wa-script/Image%201%20-%20B.jpg",
      previewUrl:
        "https://storage.googleapis.com/wa-script/Image%201%20-%20B.jpg",
      caption: "",
    };
  } else if (pl.postbackText === "2") {
    msg = {
      type: "image",
      originalUrl:
        "https://storage.googleapis.com/wa-script/Image%201%20-%20C.jpg",
      previewUrl:
        "https://storage.googleapis.com/wa-script/Image%201%20-%20C.jpg",
      caption: "",
    };
  } else if (pl.postbackText === "3") {
    msg = {
      type: "image",
      originalUrl:
        "https://storage.googleapis.com/wa-script/Image%201%20-%20D.jpg",
      previewUrl:
        "https://storage.googleapis.com/wa-script/Image%201%20-%20D.jpg",
      caption: "",
    };
  } else if (pl.postbackText === "4") {
    msg = {
      type: "image",
      originalUrl:
        "https://storage.googleapis.com/wa-script/Image%201%20-%20A.jpg",
      previewUrl:
        "https://storage.googleapis.com/wa-script/Image%201%20-%20A.jpg",
      caption: "",
    };
  }
  await sendMsg(msg, payload.source);
  const msg3 = {
    type: "quick_reply",
    msgid: "createWardrobe",
    content: {
      type: "text",
      text: `Like how it works? Yayyy!
Now, let's *create outfits for you!* Just send us images of any *4* of your *topwear* and any *4* of your *bottomwear*.
We will do the outfit matchmaking :)`,
    },
    options: [
      {
        type: "text",
        title: "Click garment photo",
      },
      {
        type: "text",
        title: "Upload from gallery",
      },
    ],
  };
  await sendMsg(msg3, payload.source);
};

const handleCreateWardrobe = async (payload) => {
  const pl = payload.payload;
  if (pl.title === "Click garment photo") {
    clickGarmentPhoto(payload);
  } else if (pl.title === "Upload from gallery") {
    uploadFromYourDevice(payload);
  }
};

const handleUpload = async (payload) => {
  const pl = payload.payload;
};

const handleQr1 = async (payload) => {
  const pl = payload.payload;
  if (pl.title === "Explore") {
    garmentSelection(payload);
  } else if (pl.title === "Main Menu") {
    mainMenu(payload);
  }
};

const mainMenu = async (payload) => {
  const msg = {
    type: "list",
    title: "Select an option",
    body: "Select an option",
    msgid: "mainMenu",
    globalButtons: [
      {
        type: "text",
        title: "Select an option",
      },
    ],
    items: [
      {
        title: "Select an option",
        subtitle: "Select an option",
        options: [
          {
            type: "text",
            title: "Add Clothes",
            description: "",
            postbackText: "Add Clothes",
          },
          {
            type: "text",
            title: "Get Outfit Suggest",
            description: "",
            postbackText: "Get Outfit Suggestions",
          },
          {
            type: "text",
            title: "Click and Match",
            description: "",
            postbackText: "Click and Match",
          },
          {
            type: "text",
            title: "Feedback/Help",
            description: "",
            postbackText: "Feedback/Help",
          },
        ],
      },
    ],
  };
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
  const msg = {
    type: "quick_reply",
    msgid: "addClothes",
    content: {
      type: "text",
      text: `Just click a photo of any clothing and *we will match it with clothes in your digital wardrobe!*`,
    },
    options: [
      {
        type: "text",
        title: "Click garment photo",
      },
      {
        type: "text",
        title: "Upload from gallery",
      },
    ],
  };
  await sendMsg(msg, payload.source);
};

const getOutfitSuggestions = async (payload) => {
  const msg = {
    type: "quick_reply",
    msgid: "getOutfitSuggestions",
    content: {
      type: "text",
      text: `Please choose`,
    },
    options: [
      {
        type: "text",
        title: "From Wardrobe",
      },
      {
        type: "text",
        title: "Occasion Outfits",
      },
    ],
  };
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
  const msg = {
    type: "quick_reply",
    msgid: "clickAndMatch",
    content: {
      type: "text",
      text: `Just click a photo of any clothing and *we will match it with clothes in your digital wardrobe!*`,
    },
    options: [
      {
        type: "text",
        title: "Click garment photo",
      },
      {
        type: "text",
        title: "Upload from gallery",
      },
    ],
  };
  await sendMsg(msg, payload.source);
};

const feedbackHelp = async (payload) => {
  const msg = {
    type: "text",
    text: "Please share your feedback/query here, we are all ears.📝",
  };
  sendMsg(msg, payload.source);
};

const handleMenuText = (payload) => {
  mainMenu(payload);
};

const handleMainMenu = async (payload) => {
  const pl = payload.payload;
  if (pl.postbackText === "Add Clothes") {
    addClothes(payload);
  } else if (pl.postbackText === "Get Outfit Suggestions") {
    getOutfitSuggestions(payload);
  } else if (pl.postbackText === "Click and Match") {
    clickAndMatch(payload);
  } else if (pl.postbackText === "Feedback/Help") {
    feedbackHelp(payload);
  }
};

const handleFeedback = async (payload) => {
  const msg = {
    type: "text",
    text: "Thank you for your message, we will get back to you in 48 hours.",
  };
  sendMsg(msg, payload.source);
};

const handleClickAndMatch = async (payload) => {
  const pl = payload.payload;
  if (pl.title === "Click garment photo") {
    clickGarmentPhoto(payload);
  } else if (pl.title === "Upload from gallery") {
    uploadFromYourDevice(payload);
  }
};

const handleAddClothes = async (payload) => {
  const pl = payload.payload;
  if (pl.title === "Click garment photo") {
    clickGarmentPhoto(payload);
  } else if (pl.title === "Upload from gallery") {
    uploadFromYourDevice(payload);
  }
};

const handleEmpty = async (payload) => {
  const pl = payload.payload;
  if (pl.title === "Click garment photo") {
    clickGarmentPhoto(payload);
  } else if (pl.title === "Upload from gallery") {
    uploadFromYourDevice(payload);
  }
};

const clickGarmentPhoto = async (payload) => {
  const msg1 = {
    type: "text",
    text: `Lay/hang the garment flat on a plain surface/wall for best results! Like this ⬇️`,
  };
  const msg2 = {
    type: "sticker",
    url: "https://storage.googleapis.com/wa-script/sticker%206.webp",
  };
  await sendMsg(msg1, payload.source);
  await sendMsg(msg2, payload.source);
};

const uploadFromYourDevice = async (payload) => {
  const msg1 = {
    type: "text",
    text: `Upload your photo of the clothes. Here's a reference image ⬇️
    
PS: *I ONLY extract the garment* from the image. Privacy game - Super Strong!`,
  };
  const msg2 = {
    type: "image",
    originalUrl: "https://storage.googleapis.com/wa-script/Image%202.png",
    previewUrl: "https://storage.googleapis.com/wa-script/Image%202.png",
    caption: "Let's Upload",
  };
  await sendMsg(msg1, payload.source);
  await sendMsg(msg2, payload.source);
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
    const msg1 = {
      type: "text",
      text: `If we were helpful, please feel free to save this
      number (919016754973) as "Hey Hopnob" in your
      contacts and share it with your friends on
      Whatsapp.
      
      Your Preferences. Your Clothes. Your Outfits.`,
    };
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

const empty = async (data) => {
  const msg1 = {
    type: "image",
    originalUrl: "https://storage.googleapis.com/wa-script/Image%203.jpg",
    previewUrl: "https://storage.googleapis.com/wa-script/Image%203.jpg",
    caption: `Ohhh.. Please upload more clothes to see outfits.`,
  };
  const msg2 = {
    type: "quick_reply",
    msgid: "empty",
    content: {
      type: "text",
      text: `Just click a photo of any clothing and *we will match it with clothes in your digital wardrobe!*`,
    },
    options: [
      {
        type: "text",
        title: "Click garment photo",
      },
      {
        type: "text",
        title: "Upload from gallery",
      },
    ],
  };
  await sendMsg(msg1, data.mobileNumber);
  await sendMsg(msg2, data.mobileNumber);
};

const blurry = async (payload) => {
  const msg1 = {
    type: "text",
    text: `Unfortunately, it seems this picture is not clear,
        which is why we can't identify it. Can you take a new
        picture and send to us?

        Have a look at these pictures for reference. ⬇️`,
  };
  const msg2 = {
    type: "image",
    originalUrl: "https://storage.googleapis.com/wa-script/Image%203.jpg",
    previewUrl: "https://storage.googleapis.com/wa-script/Image%203.jpg",
    caption: "",
  };
  await sendMsg(msg1, mobileNumber);
  await sendMsg(msg2, mobileNumber);
};

const handleGetOutfitSuggestions = async (payload) => {
  const pl = payload.payload;
  if (pl.title === "From Wardrobe") {
    fromWardrobe(payload);
  } else if (pl.title === "Occasion Outfits") {
    occasionBasedOutfits(payload);
  }
};

const fromWardrobe = async (payload) => {
  // Encode the String
  var encodedStringBtoA = btoa(payload.source);
  console.log(encodedStringBtoA);

  const msg = {
    type: "text",
    text: `Just *select the clothing from your wardrobe* for which you want the outfit suggestions.

https://taupe-nasturtium-06edf4.netlify.app/${encodedStringBtoA}`,
  };
  await sendMsg(msg, payload.source);
};

const occasionBasedOutfits = async (payload) => {
  const msg1 = {
    type: "image",
    originalUrl: "https://storage.googleapis.com/wa-script/Image%204.jpg",
    previewUrl: "https://storage.googleapis.com/wa-script/Image%204.jpg",
    caption: "",
  };
  const msg2 = {
    type: "list",
    title: "Let's choose",
    body: "For which occasion can we dress you today?",
    msgid: "occasionBasedOutfits",
    globalButtons: [
      {
        type: "text",
        title: "Select an option",
      },
    ],
    items: [
      {
        title: "Select an option",
        subtitle: "Select an option",
        options: [
          {
            type: "text",
            title: "Keep it casual",
            description: "",
            postbackText: "Keep it casual",
          },
          {
            type: "text",
            title: "Just brunching",
            description: "",
            postbackText: "Just brunching",
          },
          {
            type: "text",
            title: "Work",
            description: "",
            postbackText: "Work",
          },
          {
            type: "text",
            title: "Date Night",
            description: "",
            postbackText: "Date Night",
          },
          {
            type: "text",
            title: "Party",
            description: "",
            postbackText: "Party",
          },
        ],
      },
    ],
  };
  await sendMsg(msg1, payload.source);
  await sendMsg(msg2, payload.source);
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
  const msg = {
    type: "text",
    text: `Gotcha! Let's keep it cool and easy. Try these outfits...`,
  };
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
  const msg = {
    type: "text",
    text: `Awesome! Let's get you weekend ready in no time. Try these outfits...`,
  };
  await sendMsg(msg, payload.source);
  const nc = getNATS();
  const sc = StringCodec();
  const obj = {
    mobileNumber: payload.source,
    recommend: 1,
    wardrobe: 0,
    clickMatch: 0,
    url: "https://www.hopnob.in",
    occasion: "justBrunching",
    mode: 2,
  };

  const sendString = JSON.stringify(obj);
  nc.publish("test_whatsapp", sc.encode(sendString));
  console.log("published");
};

const work = async (payload) => {
  const msg = {
    type: "text",
    text: `Okay! Let's set you up for your next promotion. Try these outfits...`,
  };
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
  const msg = {
    type: "text",
    text: `Sweeeet! Let's dress to impress your special someone! Try these outfits...`,
  };
  await sendMsg(msg, payload.source);
  const nc = getNATS();
  const sc = StringCodec();
  const obj = {
    mobileNumber: payload.source,
    recommend: 1,
    wardrobe: 0,
    clickMatch: 0,
    url: "https://www.hopnob.in",
    occasion: "dateNight",
    mode: 2,
  };

  const sendString = JSON.stringify(obj);
  nc.publish("test_whatsapp", sc.encode(sendString));
  console.log("published");
};

const party = async (payload) => {
  const msg = {
    type: "text",
    text: `Wooh! Let's help you become the eye-popper partyer! Try these outfits tonight!`,
  };
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
    if (recs.length === 0) {
      empty(data);
      return;
    }
    const msg1 = {
      type: "text",
      text: `Here you go! We have created these AMAZING outfits matching this garment..`,
    };
    await sendMsg(msg1, mobileNumber);
    recs.forEach(async (rec) => {
      const msg = {
        type: "image",
        originalUrl: rec,
        previewUrl: rec,
        caption: "",
      };
      await sendMsg(msg, data.mobileNumber);
    });
    const msg6 = {
      type: "sticker",
      url: "https://storage.googleapis.com/wa-script/sticker%208.webp",
    };
    await sendMsg(msg6, mobileNumber);
    const msg2 = {
      type: "quick_reply",
      msgid: "recommend",
      content: {
        type: "text",
        text: `*P.S. Want to dress for work or a date night?*
  
  Just add a *few more garments* (~30) and *get occasion based recommendations*. We are with you every step of the way, let's make you talk of the town!`,
      },
      options: [
        {
          type: "text",
          title: "Add Clothes",
        },
        {
          type: "text",
          title: "Get Outfit Suggest",
        },
        {
          type: "text",
          title: "Main Menu",
        },
      ],
    };
    await sendMsg(msg2, mobileNumber);
  } catch (err) {
    console.log("err", err);
  }
};

const handleRecommend = async (payload) => {
  const pl = payload.payload;
  if (pl.title === "Add Clothes") {
    addClothes(payload);
  } else if (pl.title === "Get Outfit Suggest") {
    getOutfitSuggestions(payload);
  } else if (pl.title === "Main Menu") {
    mainMenu(payload);
  }
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
    const msg1 = {
      type: "text",
      text: "Entering the digital world of your clothes in 3…2…1…",
    };
    await sendMsg(msg1, mobileNumber);
    const msg2 = {
      type: "image",
      originalUrl: data.url,
      previewUrl: data.url,
      caption: "",
    };
    await sendMsg(msg2, mobileNumber);
    const msg3 = {
      type: "text",
      text: "Yay! Your clothes have been added to your digital wardrobe!",
    };
    await sendMsg(msg3, mobileNumber);
    const msg4 = {
      type: "sticker",
      url: "https://storage.googleapis.com/wa-script/sticker%207.webp",
    };
    await sendMsg(msg4, mobileNumber);
    const msg5 = {
      type: "quick_reply",
      msgid: "segment",
      content: {
        type: "text",
        text: `Please Choose`,
      },
      options: [
        {
          type: "text",
          title: "From Wardrobe",
        },
        {
          type: "text",
          title: "Show Outfits",
          postbackText: `${data.url}`,
        },
      ],
    };
    await sendMsg(msg5, mobileNumber);
  } catch (err) {
    console.log("err", err);
  }
};

const handleSegment = async (payload) => {
  const pl = payload.payload;
  if (pl.title === "From Wardrobe") {
    fromWardrobe(payload);
  } else if (pl.title === "Show Outfits") {
    showOutfits(payload);
  }
};

const showOutfits = async (payload) => {
  const nc = getNATS();
  const sc = StringCodec();

  const obj = {
    mobileNumber: payload.source,
    recommend: 1,
    wardrobe: 0,
    clickMatch: 0,
    url: payload.payload.postbackText,
    occasion: "work",
    mode: 1,
  };

  const sendString = JSON.stringify(obj);
  nc.publish("test_whatsapp", sc.encode(sendString));

  console.log("published");
};

module.exports = {
  handleHi,
  handleGarmentSelection,
  handleUpload,
  handleQr1,
  handleFeedback,
  handleMainMenu,
  handleClickAndMatch,
  handleThankYou,
  empty,
  blurry,
  handleEmpty,
  handleAddClothes,
  handleGetOutfitSuggestions,
  handleOccasionBasedOutfits,
  handleGetStarted,
  handleExplore,
  handleCreateWardrobe,
  handleRecommend,
  recommend,
  segment,
  handleSegment,
  handleMenuText,
};
