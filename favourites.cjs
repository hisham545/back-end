const mongoose = require("mongoose");
const fav = new mongoose.Schema({
  title1: {
    type: String,
    required: true,
  },
  desc1: {
    type: String,
    required: true,
  },
  image1: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("fav", fav);
