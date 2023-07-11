// //verify token 


// const jwt = require("jsonwebtoken")
// const UserCollection = require("../models/register.js");

// const auth = async (req, res, next) => {
//     try {
//         const token = req.cookies.formjwt;

//         const verifyUser = jwt.verify(token, process.env.JWT_keyName);//gives main _id of collection 

//         const userDetail = await UserCollection.findOne({ _id: verifyUser._id })

//         req.user = userDetail //everything user have all collections
//         req.token = token;
//         next();
//     }
//     catch (e) { res.status(402).send("Not log in how to loout") }

// }


// module.exports = auth;

