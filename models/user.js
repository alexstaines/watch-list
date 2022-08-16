const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  visibility: {
    type: Boolean,
    default: false,
  },
  listTitle: {
    type: String,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
