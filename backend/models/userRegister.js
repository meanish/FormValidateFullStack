const mongoose = require("mongoose");
const Validator = require("validatorjs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    full_name: {
      required: true,
      type: String,
      min: 2,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 2,
    },
    address: {
      required: true,
      type: String,
      min: 2,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be atleast 8 letters"],
      maxlength: [100, "Password must not be more than 100 letters"],
    },
    password_confirmation: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//for register form
UserSchema.statics.validateRegister = async function (userData) {
  const rules = {
    full_name: "required|string|min:2|max:255",
    address: "required|string|min:2|max:255",
    email: "required|email",
    password: "required|min:8",
    password_confirmation: "required|same:password",
    image: "image|mimes:jpg,png,jpeg,gif|max:2048",
  };
  const validationMessages = {
    "full_name.required": "Please enter a name",
    "full_name.min": "Name must be at least 2 characters",
    "full_name.max": "Name cannot exceed 255 characters",
    "address.required": "Please enter a name",
    "address.min": "Name must be at least 2 characters",
    "address.max": "Name cannot exceed 255 characters",
    "email.required": "Please enter an email address",
    "email.email": "Please enter a valid email address",
    "email.unique": "Email address is already in use",
    "password.required": "Please enter a password",
    "password.min": "Password must be at least 8 characters",
    "password.max": "Password cannot exceed 255 characters",
    "required.password_confirmation": "Please confirm your password.",
    "confirmed.password_confirmation":
      "The password confirmation does not match.",
    // 'image.required': 'Please upload an image.',
    "image.image": "The uploaded file is not an image.",
    "image.mimes": "The uploaded image must be a JPG, PNG, JPEG, or GIF file.",
    "image.max": "The uploaded image must not exceed 2 megabytes.",
  };
  // Check if email is already in use
  const existingUser = await this.findOne({ email: userData.email });

  console.log("Existing", existingUser);

  if (existingUser) {
    return { errors: { email: ["Email address is already registered"] } };
  }
  const Validation = new Validator(userData, rules, validationMessages);

  if (Validation.fails()) {
    return { errors: Validation.errors.all() };
  }
};

//before .save() we need to hash password
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    //only call on password change modify type

    this.password = await bcrypt.hash(this.password, 10); //10 is round of protection

    this.password_confirmation = await bcrypt.hash(this.password, 10);
  }
});

const userOriginal = new mongoose.model("userOriginal", UserSchema);

module.exports = userOriginal;
