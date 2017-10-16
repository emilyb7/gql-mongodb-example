const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema(
  {
    id: Number,
    name: String,
    description: String,
    loc: { type: { type: String }, coordinates: [Number] },
    rating: Number
  },
  { collection: "location" }
);

locationSchema.index({ loc: "2dsphere" });

const location = mongoose.model("location", locationSchema);

module.exports = location;
