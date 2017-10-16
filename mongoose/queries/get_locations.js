const Location = require("../location");

module.exports = id => {
  return new Promise(async (resolve, reject) => {
    try {
      let locations = await Location.find();
      resolve(locations);
    } catch (err) {
      reject(err);
    }
  });
};
