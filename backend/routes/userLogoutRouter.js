const UserLogoutController = require("../controllers/UseLogoutController");
const express = require("express");
const app = express();
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, UserLogoutController.RemoveUser);
router.delete("/", auth, UserLogoutController.RemoveUserAcc);

module.exports = router;
