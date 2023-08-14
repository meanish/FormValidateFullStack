const mongoose = require("mongoose");
const Validator = require("validatorjs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserTokenSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userOriginal",
      },
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// for token generation
UserTokenSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this.users[0] }, process.env.JWT_keyName);

    this.tokens = this.tokens.concat({ token: token }); //placing token in token field    //concat to add the token for every action login register add cart

    await this.save(); //for db saving
    return token;
  } catch (e) {
    res.send("Error in making a token");
  }
};

const userTokenOriginal = new mongoose.model(
  "userTokenOriginal",
  UserTokenSchema
);

module.exports = userTokenOriginal;
