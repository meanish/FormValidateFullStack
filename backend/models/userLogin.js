const mongoose = require("mongoose")
const Validator = require("validatorjs")


const UserLoginSchema = new mongoose.Schema({

        email: {

            type: String,
            required: true,
            min: 2,
        },

        password: {
            type: String,
            required: true,
            minlength: [8, "Password must be atleast 8 letters"],
            maxlength: [100, "Password must not be more than 100 letters"],

        },
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


//for login validate form
UserLoginSchema.statics.validateLogin = async function (userData) {
    const rules = {

        email: 'required|email',
        password: 'required|min:8|max:255',

    };
    const validationMessages = {
        'email.required': 'Please enter an email address',
        'email.email': 'Please enter a valid email address',
        'email.unique': 'Email address is already in use',
        'password.required': 'Please enter a password',
        'password.min': 'Password must be at least 8 characters',
        'password.max': 'Password cannot exceed 255 characters',
    };
    const Validation = new Validator(userData, rules, validationMessages);
    if (Validation.fails()) {
        return { errors: Validation.errors.all() };
    }
};



const userLoginOriginal = new mongoose.model("userLoginOriginal", UserLoginSchema)

module.exports = userLoginOriginal;
