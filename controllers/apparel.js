const Apparel = require("../models/Apparel");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const Occasion = require("../models/Occasion");

const getAllApparels = async (req, res) => {
  const {
    params: { id: mobileNumber },
  } = req;

  const apparels = await Apparel.find({ mobileNumber: mobileNumber }).sort(
    "createdAt"
  );
  res
    .status(StatusCodes.OK)
    .json({ mobileNumber, apparels, count: apparels.length });
};

const deleteApparel = async (req, res) => {
  const {
    params: { apparelId },
  } = req;

  const apparel = await Apparel.findByIdAndDelete(apparelId);
  if (!apparel) {
    throw new NotFoundError(`No apparel with id ${apparelId}`);
  }

  const layer = {
    "baseball jacket": "Jackets and Coats",
    "biker jacket": "Jackets and Coats",
    "bomber jacket": "Jackets and Coats",
    "casual jacketss": "Jackets and Coats",
    "harrington jacket": "Jackets and Coats",
    "parka coat": "Jackets and Coats",
    peacoat: "Jackets and Coats",
    "pilot jacket": "Jackets and Coats",
    "puffer jacketss": "Jackets and Coats",
    "winter coatss": "Jackets and Coats",
    "winter jacketss": "Jackets and Coats",
    "trench coats": "Jackets and Coats",
    "wool coats": "Jackets and Coats",
    vests: "Jackets and Coats",
    "duffle coat": "Jackets and Coats",
    "racer jacket": "Jackets and Coats",
    "suit jackets and tuxedos": "Jackets and Coats",
    "windstoppers & softshells": "Jackets and Coats",
    "kimono coat": "Jackets and Coats",
    "raincoats and ponchos": "Jackets and Coats",
    "casual overalls": "Overalls and Dungarees",
    "knitted vests": "Upper",
    "knitted ponchos": "Jackets and Coats",
    Cardigans: "Upper",
    "blazer dresses": "Dress",
    "blouse dress": "Dress",
    "bodycon dress": "Dress",
    "casual dresses": "Dress",
    "fit & flare dresses": "Dress",
    "knitted dresses": "Dress",
    "sheath dresses": "Dress",
    "slip dress": "Dress",
    "wrap dress": "Dress",
    "casual overalls": "Overalls and Dungarees",
    "elegant overalls": "Overalls and Dungarees",
    "winter overalls": "Overalls and Dungarees",
    "work overalls": "Overalls and Dungarees",
    "baseball jacket": "jackets and coats",
    "biker jacket": "jackets and coats",
    "bomber jacket": "jackets and coats",
    "casual jackets": "jackets and coats",
    "duffle coat": "jackets and coats",
    "harrington jacket": "jackets and coats",
    "kimono coat": "jackets and coats",
    "knitted ponchos": "jackets and coats",
    "parka coat": "jackets and coats",
    peacoat: "jackets and coats",
    "pilot jacket": "jackets and coats",
    "puffer jackets": "jackets and coats",
    "racer jacket": "jackets and coats",
    "raincoats and ponchos": "jackets and coats",
    "suit jackets and tuxedos": "jackets and coats",
    "trench coats": "jackets and coats",
    "windstoppers & softshells": "jackets and coats",
    "winter coats": "jackets and coats",
    "winter jackets": "jackets and coats",
    "wool coats": "jackets and coats",
    Cardigans: "Top",
    vests: "Top",
    "knitted vests": "Top",
  };

  const occasion = await Occasion.find({ mobileNumber: apparel.mobileNumber });

  for (let i = 0; i < occasion.length; i++) {
    const newArr = [];
    for (let j = 0; j < occasion[i].recommendations.length; j++) {
      const arr = occasion[i].recommendations[j];
      if (apparel.category === "Top") {
        if (
          layer.has(apparel.subcategory) &&
          arr.length === 13 &&
          // arr[10] === apparel.subcategory &&
          // arr[11] === apparel.color &&
          arr[12] === apparel.url
        ) {
          continue;
        } else if (
          // arr[0] === apparel.subcategory &&
          // arr[1] === apparel.design &&
          // arr[2] === apparel.pattern &&
          // arr[3] === apparel.color &&
          arr[4] === apparel.url
        ) {
          continue;
        }
      } else if (apparel.category === "Bottom") {
        if (
          // arr[5] === apparel.subcategory &&
          // arr[6] === apparel.design &&
          // arr[7] === apparel.pattern &&
          // arr[8] === apparel.color &&
          arr[9] === apparel.url
        ) {
          continue;
        }
      }
      newArr.push(arr);
    }
    await Occasion.findOneAndUpdate(
      {
        mobileNumber: occasion[i].mobileNumber,
        occasion: occasion[i].occasion,
      },
      {
        $set: {
          recommendations: newArr,
        },
      },
      {
        runValidators: true,
      }
    );
  }

  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllApparels,
  deleteApparel,
};
