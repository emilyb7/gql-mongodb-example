const { buildSchema } = require("graphql");

module.exports = buildSchema(`

  type Location {
    id: Int,
    name: String!,
    description: String,
    coordinates: [Float]
  }

  type Query {
    getLocation(id: Int): Location,
    getLocations: [Location]
  }
`);
