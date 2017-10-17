const locationModel = require("../location");

module.exports = () => {
  return new Promise((resolve, reject) => {
    locationModel.remove({}).then(resolve).catch(reject);
  });
};
