const Tabletop = require("tabletop");
const mongoose = require("mongoose");

// these belong in .env
const DB_URI = "mongodb://localhost/gqltest";
const SHEETS_URL =
  "docs.google.com/spreadsheets/d/1gcvnL7wEEnEFPeKngb5Magw1sZfKg4bhr_aBI9F-SUU/edit?usp=sharing";

mongoose.Promise = global.Promise;

const { createLocation, clearLocations } = require("./mongoose/queries/");

const init = cb => {
  Tabletop.init({
    key: SHEETS_URL,
    callback: cb,
    simpleSheet: true
  });
};

const getSheetData = () =>
  new Promise((resolve, reject) => {
    init(data => {
      try {
        resolve(data);
      } catch (err) {
        reject(data);
      }
    });
  });

const getCoordinates = url => {
  const coordsRegex = /@\-?[\d\.]+\,\-?[\d\.]+/;
  const separator = /[@\,]/;
  return url.match(coordsRegex)[0].split(separator).slice(1).map(Number);
};

const parseData = pub => {
  return {
    id: pub.id,
    name: pub.Name,
    description: pub.Description,
    rating: pub.Rating,
    link: pub.Link,
    coordinates: getCoordinates(pub.Link)
  };
};

mongoose
  .connect(DB_URI, {
    useMongoClient: true
  })
  .then(async () => {
    try {
      await clearLocations();
      const data = await getSheetData();
      await Promise.all(data.map(parseData).map(createLocation));
      await mongoose.disconnect();
      console.log("done");
    } catch (err) {
      throw new Error(err);
    }
  })
  .catch(err => {
    console.log("err", err);
  });
