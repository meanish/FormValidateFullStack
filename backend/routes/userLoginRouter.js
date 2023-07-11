const UserLoginController = require("../controllers/UserLoginController")
const express = require('express');
const app = express();
const router = express.Router();



// router.get("/", (req, res) => {
//     res.send("Login pAge3")
// });


router.post("/", UserLoginController.LogUser);

module.exports = router;