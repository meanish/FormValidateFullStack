const ImageController = require("../controllers/ImageController");
const express = require("express");
const app = express();
const router = express.Router();
const multer = require("multer");
const imageSize = require("image-size");
const path = require("path");
const sharp = require("sharp");

app.use(express.static(path.join(__dirname, "public")));

// / Set up multer for handling file uploads

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads/")); // Store uploads in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Unsupported file type"), false); // Reject the file
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

router.post("/", upload.single("file"), ImageController.storeImage);

module.exports = router;
