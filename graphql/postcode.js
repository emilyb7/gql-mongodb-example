const fetch = require("node-fetch");

const clean = str => str.toLowerCase().split(" ").join("");

module.exports = postcode => {
  return new Promise((resolve, reject) => {
    if (!postcode) resolve([]);

    const url = "http://postcodes.io/postcodes/" + clean(postcode);

    fetch(url)
      .then(res => res.json())
      .then(({ result }) => {
        if (!result) reject("invalid postcode");
        resolve([result.latitude, result.longitude]);
      })
      .catch(err => {
        reject("fetch error " + err);
      });
  });
};
