const jwt = require("jsonwebtoken");
const userOriginal = require("../models/userRegister");
const url = require("url");

const auth = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      console.log("in auth", token);
      const verifyUser = jwt.verify(token, process.env.JWT_keyName); //return valid user detail

      const userDetail = await userOriginal
        .findById(verifyUser._id)
        .select("-password");

      req.user = userDetail; //req.user contail all login user detail
      req.body.token = token;

      next();
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.error("Authentication error:", error);
    // For API requests, return an error response (e.g., HTTP 500 Internal Server Error)
    if (req.path.startsWith("/api")) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

module.exports = auth;
