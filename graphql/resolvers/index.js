const Location = require("../types/location");

const queries = require("../../mongoose/queries");
const postcodeRequest = require("../postcode");

module.exports = {
  hello: () => "Hello world",

  getLocation: async ({ id }) =>
    await queries
      .getLocation(id)
      .then(loc => {
        return new Location(loc);
      })
      .catch(err => {
        console.log(err);
      }),

  getLocations: async ({ rating, postcode, distance }) =>
    await postcodeRequest(postcode)
      .then(geolocation => {
        return queries
          .getLocations(rating || 0, geolocation, distance || 5)
          .then(res => res.map(loc => new Location(loc)));
      })
      .catch(err => {
        if (err === "invalid postcode") {
          return [];
        }
        console.log(err);
      })
};
