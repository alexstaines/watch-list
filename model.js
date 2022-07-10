const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let anime = new Schema(
  {
    title: {
      type: String
    },
    averageRating: {
      type: Number
    },
    synopsis: {
      type: String
    },
    watched: {
        type: Boolean
    },
    watchedEps: {
        type: Number
    }
  },
  { collection: "Anime" }
);

module.exports = mongoose.model("anime", anime);