const userOriginal = require("../models/userRegister");
const userTokenOriginal = require("../models/userTokens")


module.exports = {
    AddUser: async (req, res, next) => {
        try {
            const error = await userOriginal.validateRegister(req.body, res, next);

            if (error) {
                console.log(error);
                throw error;
            } else {
                const registerData = new userOriginal({
                    full_name: req.body.full_name, //from the form
                    password: req.body.password,
                    password_confirmation: req.body.password_confirmation,
                    email: req.body.email,
                    address: req.body.address,
                });


                await registerData.save();

                //save the user in token dB
                const userTokenData = new userTokenOriginal({
                    users: [registerData._id], // Associate the user with the user token
                });

                await userTokenData.save();
                console.log('Saved user data:', registerData);

                // console.log('Generated auth token:', registerData.authToken);
                res.status(200).json({registerData});
                // next();
            }
        } catch (err) {
            res.send(err);
        }
    },
};
