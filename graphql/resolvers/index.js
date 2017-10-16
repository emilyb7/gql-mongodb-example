const Location = require("../types/location");

const queries = require("../../mongoose/queries");

module.exports = {
  hello: () => {
    return "Hello world";
  },

  getLocation: async ({ id }) => {
    return await queries
      .getLocation(id)
      .then(loc => {
        return new Location(loc);
      })
      .catch(err => {
        console.log(err);
      });
  },

  getLocations: async ({ rating, geolocation }) => {
    return await queries
      .getLocations(rating || 0, geolocation)
      .then(res => {
        return res.map(loc => new Location(loc));
      })
      .catch(err => {
        console.log(err);
      });
  }
};
