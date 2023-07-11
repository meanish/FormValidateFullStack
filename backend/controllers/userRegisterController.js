const userOriginal = require("../models/userRegister");

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
                console.log('Saved user data:', registerData);

                // console.log('Generated auth token:', registerData.authToken);
                res.status(200).json({ registerData });
                // next();
            }
        } catch (err) {
            res.send(err);
        }
    },
};
