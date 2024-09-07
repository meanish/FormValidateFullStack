const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    filename: String,
    url: String,
    resizedUrl: String,
  },
  {
    timestamps: true,
  }
);

const imageOriginal = new mongoose.model("imageOriginal", imageSchema);

module.exports = imageOriginal;
