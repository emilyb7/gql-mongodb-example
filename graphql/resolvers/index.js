const Location = require("../types/location");

const queries = require("../../mongoose/queries");

module.exports = {
  hello: () => "Hello world",

  getLocation: async ({ id }) =>
    await queries
      .getLocation(id)
      .then(loc => {
        g;
        return new Location(loc);
      })
      .catch(err => {
        console.log(err);
      }),

  getLocations: async ({ rating, geolocation, distance }) =>
    await queries
      .getLocations(rating || 0, geolocation, distance || 5)
      .then(res => {
        return res.map(loc => new Location(loc));
      })
      .catch(err => {
        console.log(err);
      })
};
