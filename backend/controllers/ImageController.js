const imageOriginal = require("../models/imageUpload");
const sharp = require("sharp");

module.exports = {
  storeImage: async (req, res) => {
    const targetWidth = 450; // Adjust the target width as needed
    const targetHeight = 430;

    try {
      // Load the original image
      const image = sharp(req.file.path);

      // Get the metadata of the original image
      const metadata = await image.metadata();

      // Calculate the aspect ratio of the original image
      const originalAspectRatio = metadata.width / metadata.height;

      // Calculate the target dimensions while preserving the aspect ratio
      let resizedWidth, resizedHeight;
      if (originalAspectRatio > targetWidth / targetHeight) {
        resizedWidth = targetWidth;
        resizedHeight = targetWidth / originalAspectRatio;
      } else {
        resizedHeight = targetHeight;
        resizedWidth = targetHeight * originalAspectRatio;
      }

      // Resize and save the image
      const resizedImageBuffer = await image
        .resize(Math.floor(resizedWidth), Math.floor(resizedHeight))
        .toBuffer();

      // // Create a new image document in the database
      // const newImage = await imageOriginal.create({
      //   filename: req.file.filename,
      //   url: req.file.path, // Store the path where the original image is uploaded
      //   resizedUrl: "resized_" + req.file.filename, // Store the path for the resized image
      // });

      const resizedImagePath = `public/uploads/resized_${req.file.filename}`;
      await sharp(resizedImageBuffer).toFile(resizedImagePath);

      // Save the resized image
      await sharp(resizedImageBuffer).toFile(
        `public/uploads/resized_${req.file.filename}`
      );

      //  var $url = resized_img_path;
      const url = `uploads/resized_${req.file.filename}`;
      console.log("What is new", url);
      res.status(201).json({ url });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ error: "Image upload failed" });
    }
  },
};
