const Tabletop = require("tabletop");
const mongoose = require("mongoose");

const DB_URI = "mongodb://localhost/gqltest";

mongoose.Promise = global.Promise;

const { createLocation, clearLocations } = require("./mongoose/queries/");

const init = cb => {
  Tabletop.init({
    key:
      "docs.google.com/spreadsheets/d/1gcvnL7wEEnEFPeKngb5Magw1sZfKg4bhr_aBI9F-SUU/edit?usp=sharing",
    callback: cb,
    simpleSheet: true
  });
};

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
  .then(connection => {
    return clearLocations()
      .then(() => Promise.resolve())
      .catch(err => Promise.reject(err));
  })
  .then(result => {
    return new Promise((res, rej) => {
      init(data => {
        if (data) return res(data);
        rej("error getting data");
      });
    });
  })
  .then(data => {
    const promises = data.map(parseData).map(createLocation);
    return Promise.all(promises)
      .then(res => {
        mongoose.disconnect();
      })
      .catch(err => {
        console.log(err);
      });
  })
  .then(done => {
    console.log("done");
  })
  .catch(err => {
    console.log("err", err);
  });
