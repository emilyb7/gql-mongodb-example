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

  getLocations: async () => {
    return await queries
      .getLocations()
      .then(res => {
        return res.map(loc => new Location(loc));
      })
      .catch(err => {
        console.log(err);
      });
  }
};
