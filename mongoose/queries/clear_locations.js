const locationModel = require("../location");

module.exports = () => {
  console.log("clearing data");
  return new Promise((resolve, reject) => {
    locationModel
      .remove({})
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};
