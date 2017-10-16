const { buildSchema } = require("graphql");

module.exports = buildSchema(`

  type Location {
    id: Int,
    name: String!,
    description: String,
    coordinates: [Float],
    rating: Int,
  }

  type Query {
    getLocation(id: Int): Location,
    getLocations(rating: Int, geolocation: [Float]): [Location]
  }
`);