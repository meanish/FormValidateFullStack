const blogOriginal = require("../models/blog");

module.exports = {
  //get all blogs
  Getblog: async (req, res) => {
    try {
      const allBlogs = await blogOriginal
        .find()
        .populate("users", "full_name email -_id") // Populate users with the username field
        .sort({ updatedAt: -1 }); // Sort by createdAt in descending order

      res.status(200).json({ blogs: allBlogs });
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({ error: "An error occurred while fetching blogs" });
    }
  },

  //create a new blog and store
  Storeblog: async (req, res) => {
    try {
      const { content } = req.body; // Get the content from the request body
      console.log("What is in body", content); // Get the content from the request body

      const newBlog = await blogOriginal.create({
        users: req.user._id,
        content: content,
      });
      res
        .status(201)
        .json({ message: "Blog created successfully", blog: newBlog });

      console.log(newBlog);
    } catch (error) {
      console.error("Error creating blog:", error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the blog" });
    }
  },

  //find admin's blog
  Myblog: async (req, res) => {
    try {
      const userId = req.user._id;

      const myblogs = await blogOriginal
        .find({ users: userId })
        .populate("users", "full_name email")
        .sort({ updatedAt: -1 });
      res.json(myblogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred to fetch your blogs" });
    }
  },

  GetSingleBlog: async (req, res) => {
    try {
      const userId = req.user._id;
      const { id } = req.body;
      console.log(id);
      const myblogs = await blogOriginal
        .find({ users: userId })
        .populate("users", "full_name email");

      const selectedBlog = myblogs.find((blog) => blog._id.toString() === id);

      if (!selectedBlog) {
        return res.status(404).json({
          error:
            "Either you don't permission to edit the blog or the blog with that id never existed",
        });
      }
      res.json(selectedBlog);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occured",
      });
    }
  },

  UpdateBlog: async (req, res) => {
    try {
      const { id, content } = req.body;
      const selectedBlog = await blogOriginal.findById(id);

      selectedBlog.content = content;
      // selectedBlog.createdAt = new Date();

      await selectedBlog.save();
      res.status(200).json({ message: "Blog content updated successfully" });
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  DeleteBlog: async (req, res) => {
    try {
      const { contentId } = req.body;
      const userId = req.user._id;

      //check if the id is present in the userBlogCollection
      // Check if the contentId is present in the userBlogCollection
      const userBlog = await blogOriginal.findOne({
        users: userId,
        _id: contentId,
      });
      if (userBlog) {
        // If yes, remove it and save the database
        // await blogOriginal.findByIdAndRemove(contentId);
        return res
          .status(200)
          .json({ message: "Blog post deleted successfully" });
      } else {
        // If no, throw an error indicating that the content doesn't belong to the user
        return res
          .status(403)
          .json({ error: "Blog post does not belong to the user" });
      }
      //if yes remove it and save dB
      //else throw error that the is not belonged to the user
    } catch {}
  },
};
