const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");

const getLocation = require("./mongoose/queries/get_location");
mongoose.Promise = global.Promise;

const uri = "mongodb://localhost/gqltest";

const schema = buildSchema(`


  type RandomDie {
    numSides: Int!,
    rollOnce: Int!,
    roll(numRolls: Int!): [Int]
  }

  type Query {
    hello: String,
    quote: String,
    random: Float!,
    rollThreeDice: [Int],
    rollDice(numDice: Int!): [Int],
    getDie(numSides: Int): RandomDie,
    location(id: Int): String,
  }
`);

class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({ numRolls }) {
    return Array(numRolls).fill(0).map(() => this.rollOnce());
  }
}

const root = {
  hello: () => {
    return "Hello world";
  },

  quote: () => (Math.random() < 0.5 ? "hello" : "good bye"),

  random: () => Math.random(),

  rollThreeDice: () => [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6)),

  rollDice: ({ numDice }) =>
    Array(numDice).fill(0).map(_ => 1 + Math.floor(Math.random() * 6)),

  getDie: ({ numSides }) => new RandomDie(numSides || 6),

  location: async ({ id }) => {
    return await getLocation(id)
      .then(loc => {
        return loc.description;
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
  .connect(uri, {
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
