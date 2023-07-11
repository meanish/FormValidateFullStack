const mongoose = require("mongoose")
const Validator = require("validatorjs")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const UserTokenSchema = new mongoose.Schema({
tokens: [{
    token: {
        type: String,
        required: true,
    },

}]
    },
    {
        timestamps: true,
    }
)

const userTokens = new mongoose.model("userOriginal", UserTokenSchema)

module.exports = userTokens;