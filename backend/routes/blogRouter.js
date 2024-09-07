const blogController = require("../controllers/blogController");
const express = require("express");
const app = express();
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../utils/imageUpload");

router.post("/create", auth, upload.single('featured_image'), blogController.Storeblog);
router.get("/view",  blogController.Getblog);
router.get("/myblog", auth, blogController.Myblog);
router.get("/single/:id", blogController.ViewSingleBlog);
router.post("/singleblog", auth, blogController.GetSingleBlog);
router.post("/updateblog", auth, upload.single('featured_image'), blogController.UpdateBlog);
router.delete("/delete/:id", auth, blogController.DeleteBlog);

module.exports = router;
