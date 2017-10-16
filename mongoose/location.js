const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema(
  {
    id: Number,
    name: String,
    description: String,
    coordinates: [Number]
  },
  { collection: "location" }
);

const location = mongoose.model("location", locationSchema);

module.exports = location;
