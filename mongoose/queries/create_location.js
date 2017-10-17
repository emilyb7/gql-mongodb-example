const locationModel = require("../location");

module.exports = locationData => {
  const location = new locationModel({
    id: locationData.id,
    name: locationData.name,
    description: locationData.description,
    loc: { type: "Point", coordinates: locationData.coordinates },
    rating: locationData.rating
  });

  return new Promise((resolve, reject) => {
    location.save((err, res) => {
      if (err) {
        console.log("error saving location in db " + err);
        reject(err);
      }
      console.log("new location saved - " + locationData.name);
      resolve(res);
    });
  });
};
