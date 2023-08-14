const userLoginOriginal = require("../models/userLogin");
const UserOriginal = require("../models/userRegister");
const bcrypt = require("bcryptjs");
const userTokenOriginal = require("../models/userTokens");

module.exports = {
  RemoveUser: async (req, res) => {
    try {
      const tokenToRemove = req.body.token; // The token you want to remove
      const userId = req.user._id; // Assuming you have user's ID available from authentication
      console.log("inlogoutController", req.body.token);
      // Find the userTokenOriginal document associated with the user
      const userTokenData = await userTokenOriginal.findOne({ users: userId });

      if (userTokenData) {
        // Remove the token from the tokens array
        userTokenData.tokens = userTokenData.tokens.filter((tokenObj) => {
          // Filter out the token you want to remove
          return tokenObj.token !== tokenToRemove;
        });

        // Save the updated userTokenData document
        await userTokenData.save();

        return res.status(200).json({ message: "Token removed successfully" });
      } else {
        res.status(404).json({ message: "User token data not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error removing token" });
    }
  },

  RemoveUserAcc: async (req, res) => {
    try {
      const userId = req.user._id; // Assuming you have user's ID available from authentication

      // Remove user from userOriginal collection
      await UserOriginal.findByIdAndDelete(userId);

      // Remove user's token data from tokenOriginal collection
      await userTokenOriginal.findOneAndDelete({ users: userId });

      return res.status(200).json({ message: "Account removed successfully" });
    } catch (error) {
      console.error("Error during account removal:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};
