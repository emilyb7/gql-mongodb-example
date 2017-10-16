const Location = require("../location");

module.exports = id => {
  return new Promise(async (resolve, reject) => {
    try {
      let location = await Location.findOne({ id: id });
      resolve(location);
    } catch (err) {
      reject(err);
    }
  });
};
