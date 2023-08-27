const blogController = require("../controllers/blogController");
const express = require("express");
const app = express();
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/create", auth, blogController.Storeblog);
router.get("/view", auth, blogController.Getblog);
router.get("/myblog", auth, blogController.Myblog);
router.post("/singleblog", auth, blogController.GetSingleBlog);
router.post("/updateblog", auth, blogController.UpdateBlog);
router.post("/deleteblog", auth, blogController.DeleteBlog);

module.exports = router;
