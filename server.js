const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise; // reset mongoose.promise value

const DB_URI = "mongodb://localhost/gqltest";
const PORT = 4002;

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
    db.once("open", () => {
      console.log("+++Connected to mongoose");
    });

    app.listen(PORT, () => {
      console.log(
        "Running a GraphQL API server at localhost:" + PORT + "/graphql"
      );
    });
  })
  .catch(err => {
    console.log("failed to connect " + err);
  });
