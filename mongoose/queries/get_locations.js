const Location = require("../location");

module.exports = (rating, geolocation) => {
  return new Promise(async (resolve, reject) => {
    if (geolocation) {
      try {
        let locations = await Location.aggregate([
          {
            $geoNear: {
              near: {
                type: "Point",
                coordinates: geolocation
              },
              distanceField: "distance",
              spherical: true,
              maxDistance: 20000
            }
          },
          {
            $match: { rating: { $gte: rating } }
          }
        ]);
        resolve(locations);
      } catch (err) {
        reject(err);
      }
    } else {
      try {
        let locations = await Location.find().where("rating").gte(rating);
        resolve(locations);
      } catch (err) {
        reject(err);
      }
    }
  });
};
