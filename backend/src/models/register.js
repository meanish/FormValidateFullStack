const mongoose = require("mongoose")
const Validator = require("validatorjs")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserDataSchema = new mongoose.Schema({
    firstname: {
        required: true,
        type: String,
        min: 2,
        max: 255
    },
    lastname: {
        type: String,
        required: true,
        min: 2,
        max: 255
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
        max: 255
    },
    password: {
        type: String,
        required: true,
        required: true,
        minlength: [8, "Password must be atleast 8 letters"],
        maxlength: [100, "Password must not be more than 100 letters"],

    },
    password_confirmation: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        },

    }]

})

const UserCollection = new mongoose.model("UserCollection", UserDataSchema);


module.exports = UserCollection;

// //for token genration
// UserDataSchema.methods.generateAuthToken = async function () {
//     try {
//         const token = jwt.sign({ _id: this._id }, process.env.JWT_keyName)
//         console.log("new token", token)
//         this.tokens = this.tokens.concat({ token: token })  //placing token in tooken field    //concat to add the token for every action login register add cart    
//         console.log("new db structure", this)

//         await this.save(); //for db saving
//         return token;



//     }
//     catch (e) {
//         res.send("Error in making a token")
//     }
// }


// //before .save() we need to hash password 
// UserDataSchema.pre("save", async function (next) {
//     if (this.isModified("password")) {                  //only call on password change modify type
//         console.log(`Entered password is ${this.password}`)
//         this.password = await bcrypt.hash(this.password, 10); //10 is round of protection
//         console.log(`Changed password is  ${this.password}`);
//         this.password_confirmation = await bcrypt.hash(this.password, 10);
//         console.log("password converted", this)

//     }
// })





//for proper validation

//for register form
// UserDataSchema.statics.validateRegister = async function (userData) {
//     const rules = {
//         firstname: 'required|string|min:2|max:255',
//         lastname: 'required|string|min:2|max:255',
//         address: 'required|string|min:2|max:255',
//         email: 'required|email',
//         password: 'required|min:8',
//         password_confirmation: 'required|same:password',

//     };
//     const validationMessages = {
//         'firstname.required': 'Please enter a name',
//         'firstname.min': 'Name must be at least 2 characters',
//         'firstname.max': 'Name cannot exceed 255 characters',
//         'lastname.required': 'Please enter a name',
//         'lastname.min': 'Name must be at least 2 characters',
//         'lastname.max': 'Name cannot exceed 255 characters',
//         'address.required': 'Please enter a name',
//         'address.min': 'Name must be at least 2 characters',
//         'address.max': 'Name cannot exceed 255 characters',
//         'email.required': 'Please enter an email address',
//         'email.email': 'Please enter a valid email address',
//         'email.unique': 'Email address is already in use',
//         'password.required': 'Please enter a password',
//         'password.min': 'Password must be at least 8 characters',
//         'password.max': 'Password cannot exceed 255 characters',
//         'required.password_confirmation': 'Please confirm your password.',
//         'confirmed.password_confirmation': 'The password confirmation does not match.',
//     };
//     const Validation = new Validator(userData, rules, validationMessages);

//     if (Validation.fails()) {
//         return Validation.errors.all();
//     }
// };


// //for login form
// UserDataSchema.statics.validateLogin = function (userData) {
//     const rules = {
//         email: 'required|email',
//         password: 'required|min:8|max:255',
//     };

//     const validation = new Validator(userData, rules);
//     if (validation.fails()) {
//         return validation.errors.all();
//     }

//     return null;
// };


//Creating Collection
