const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");

const getLocation = require("./mongoose/queries/get_location");

mongoose.Promise = global.Promise; // reset mongoose.promise value

const DB_URI = "mongodb://localhost/gqltest";

const schema = buildSchema(`

  type Location {
    id: Int,
    name: String!,
    description: String,
    coordinates: [Float],
    getLocationName: String,
    getLocationDescription: String,
    getLocationCoordinates: String
  }

  type Query {
    getLocation(id: Int): Location,
    location(id: Int): String,
  }
`);

class Location {
  constructor(loc) {
    this.id = loc.id;
    this.name = loc.name;
    this.description = loc.description;
    this.coordinates = loc.coordinates;
  }

  getLocationName() {
    return this.name;
  }

  getLocationDescription() {
    return this.description;
  }

  getLocationCoordinates() {
    console.log(this.coordinates);
    return this.coordinates.join(", ");
  }
}

const root = {
  hello: () => {
    return "Hello world";
  },

  getLocation: async ({ id }) => {
    return await getLocation(id)
      .then(loc => {
        return new Location(loc);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

mongoose
  .connect(DB_URI, {
    useMongoClient: true
  })
  .then(db => {
    db.on("error", () => {
      console.log("---FAILED to connect to mongoose");
    });

    db.once("open", () => {
      console.log("+++Connected to mongoose");
    });

    app.listen(4002, () => {
      //require("./data")();
      console.log("Running a GraphQL API server at localhost:6666/graphql");
    });
  });
