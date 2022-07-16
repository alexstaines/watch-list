const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let anime = new Schema(
  {
    title: {
      type: String,
    },
    averageRating: {
      type: Number,
    },
    synopsis: {
      type: String,
    },
    numberOfEps: {
      type: Number,
    },
    subtype: {
      type: String,
    },
    posterImage: {
      type: String,
    },
    watched: {
      type: Boolean,
    },
    watchedEps: {
      type: Number,
    },
    personalRating: {
      type: Number,
    },
    notes: {
      type: String,
    },
  },
  { collection: "Anime" }
);

module.exports = mongoose.model("anime", anime);
