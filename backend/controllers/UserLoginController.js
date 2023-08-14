const userLoginOriginal = require("../models/userLogin");
const UserOriginal = require("../models/userRegister");
const bcrypt = require("bcryptjs");
const userTokenOriginal = require("../models/userTokens");

module.exports = {
  LogUser: async (req, res) => {
    try {
      const { email } = req.body;
      const { password } = req.body;

      //form form validation errror
      const error = await userLoginOriginal.validateLogin(req.body, res);
      if (error) {
        throw error;
      }

      //for valid user or not
      const userData = await UserOriginal.findOne({ email: email }); //if there exist email then take the document of it not only email

      if (userData === null) {
        throw { errors: { email: ["Your Email is not registered yet."] } };
      }

      const haspassword = await bcrypt.compare(password, userData.password); //comparing password with hash password

      if (haspassword) {
        console.log("Correct password");
        // Generate token and store in user token document
        const userTokenData = await userTokenOriginal.findOne({
          users: userData._id,
        });

        if (userTokenData) {
          // Generate token and update the tokens array in the existing userTokenData document
          const generatedToken = await userTokenData.generateAuthToken();
          console.log("Generated auth for login token:", generatedToken);
          // Return the generated token in the response
          res.status(200).json({ token: generatedToken, user: userData });
        } else {
          throw new Error("User token document not found");
        }
      } else {
        throw {
          errors: { password: ["Your Password doesn't match the email."] },
        };
      }
    } catch (e) {
      res.send(e); //this is helping to send error to frontend
      console.log("Catch in login controller", e);
    }
  },
};
