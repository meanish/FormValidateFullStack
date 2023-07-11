const express = require('express');
const app = express();
const router = express.Router();

const UserRegisterController = require("../controllers/UserRegisterController")



// router.get("/", (req, res) => {
//     res.send("Home page3")
// });


router.post("/", UserRegisterController.AddUser);

module.exports = router;