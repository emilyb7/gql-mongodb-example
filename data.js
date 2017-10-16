const mongoose = require("mongoose");
const locationModel = require("./mongoose/location");

const createLocation = locationData => {
  const location = new locationModel({
    id: locationData.id,
    name: locationData.name,
    description: locationData.description,
    loc: { type: "Point", coordinates: locationData.coordinates },
    rating: locationData.rating
  });

  location.save((err, res) => {
    if (err) {
      return console.log(err);
    }
    console.log("new location saved - " + locationData.name);
  });
};

const { locations } = require("./data.json");

module.exports = () => {
  console.log("let's go");
  locations.forEach(loc => {
    createLocation(loc);
  });
};
