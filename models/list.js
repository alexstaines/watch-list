const mongoose = require("mongoose");

const ListSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
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
    type: String,
    required: true,
    enum: ['Not Started', 'Started', 'Complete'],
    default: 'Not Started',
  },
  dateStarted: {
    type: Date,
  },
  dateFinished: {
    type: Date,
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
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  modified: {
    type: Date,
    default: Date.now,
  },
  position: {
    type: Number,
  },
});

module.exports = List = mongoose.model("list", ListSchema);
