const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userOriginal",
      },
    ],
    content: String,
    title: String,
    featured_image: String,
  },
  {
    timestamps: true,
  }
);

const blogOriginal = new mongoose.model("blogOriginal", blogSchema);

module.exports = blogOriginal;
