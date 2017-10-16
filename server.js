const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise; // reset mongoose.promise value

const DB_URI = "mongodb://localhost/gqltest";

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: require("./graphql/schema"),
    rootValue: require("./graphql/resolvers"),
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
      // require("./data")();
      console.log("Running a GraphQL API server at localhost:6666/graphql");
    });
  });
