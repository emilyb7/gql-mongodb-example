const Location = require("../location");

module.exports = (rating, geolocation, distance) => {
  let aggregates = [
    {
      $match: { rating: { $gte: rating } }
    }
  ];
  if (geolocation.length === 2) {
    aggregates.unshift({
      $geoNear: {
        near: {
          type: "Point",
          coordinates: geolocation
        },
        distanceField: "distance",
        spherical: true,
        maxDistance: distance * 1000
      }
    });
  }
  return new Promise(async (resolve, reject) => {
    try {
      let locations = await Location.aggregate(aggregates);
      resolve(locations);
    } catch (err) {
      reject(err);
    }
  });
};
