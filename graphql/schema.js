const { buildSchema } = require("graphql");
const { readFileSync } = require("fs");
const path = require("path");

module.exports = buildSchema(
  readFileSync(path.join(__dirname, "schema.graphql"), "utf8")
);
