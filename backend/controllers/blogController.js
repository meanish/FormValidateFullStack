const blogOriginal = require("../models/blog");

module.exports = {
  //get all blogs
  Getblog: async (req, res) => {
    try {
      const allBlogs = await blogOriginal
        .find()
        .populate("users", "full_name email -_id") // Populate users with the username field
        .sort({ updatedAt: -1 }); // Sort by createdAt in descending order


      console.log("AllBlogs", allBlogs.slice(0, 2))
      const BWImages = Array.isArray(allBlogs)
        ? allBlogs.map((currData) => {
          if (currData.featured_image) {
            return {
              ...currData._doc,
              featured_image: `${process.env.REACT_PUBLIC_HISI_SERVER}/uploads/${currData.featured_image}`
            };
          } else {
            return currData;
          }
        })
        : [];

      console.log("All Blogs after image", BWImages.slice(0, 2))


      // console.log("Blogs with image", BWImages)

      res.status(200).json({ blogs: BWImages });
    } catch (error) {
      console.error("Error fetching blogs:", error.message);
      res.status(500).json({ error: "An error occurred while fetching blogs" });
    }
  },

  //create a new blog and store
  Storeblog: async (req, res) => {
    try {
      const fields = req.body
      const file = req.file

      const { content, title } = fields
      console.log("Fields arer", content, title, "files", file)

      const newBlog = await blogOriginal.create({
        users: req.user._id,
        content: content,
        title: title,
        featured_image: file ? file.filename : null,
      });
      res
        .status(201)
        .json({ message: "Blog created successfully", blog: newBlog });

      console.log("After blog uploaded", newBlog);


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


      const BWImages = Array.isArray(myblogs)
        ? myblogs.map((currData) => {
          if (currData.featured_image) {
            return {
              ...currData._doc,
              featured_image: `${process.env.REACT_PUBLIC_HISI_SERVER}/uploads/${currData.featured_image}`
            };
          } else {
            return currData;
          }
        })
        : [];

      console.log("All Blogs after image", BWImages.slice(0, 2))

      res.json({ sucess: true, data: BWImages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred to fetch your blogs" });
    }
  },



  ViewSingleBlog: async (req, res) => {
    const allBlogs = await blogOriginal
      .find()
      .populate("users", "full_name email -_id") // Populate users with the username field
      .sort({ updatedAt: -1 }); // Sort by createdAt in descending order


    const id = req.params.id; // Get the ID from the route parameter

    const getSingleBlog = allBlogs.find((currData) => currData._id.toString() === id)

    console.log(getSingleBlog)


    const BWithImage = getSingleBlog.featured_image
      ? {
        ...getSingleBlog._doc,
        featured_image: `${process.env.REACT_PUBLIC_HISI_SERVER}/uploads/${getSingleBlog.featured_image}`,
      }
      : getSingleBlog;
    if (getSingleBlog) {
      res.status(500).json({ success: true, data: BWithImage });

    }
    else {
      res.status(500).json({ error: "An error occurred to fetch blog" });

    }
  },

  GetSingleBlog: async (req, res) => {
    try {
      const userId = req.user._id;
      const { id } = req.body;


      console.log("IID of the searched blog", id);


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

      console.log("selectedBlog", selectedBlog)
      const BWithImage = selectedBlog.featured_image
        ? {
          ...selectedBlog._doc,
          featured_image: `${process.env.REACT_PUBLIC_HISI_SERVER}/uploads/${selectedBlog.featured_image}`,
        }
        : selectedBlog;


      console.log("Blog is", BWithImage)

      res.json({ success: true, data: BWithImage });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occured",
      });
    }
  },

  UpdateBlog: async (req, res) => {
    try {
      const fields = req.body
      const file = req.file

      const { content, title, id } = fields


      console.log("Fileds", fields)


      const selectedBlog = await blogOriginal.findById(id);

      selectedBlog.content = content;
      selectedBlog.title = title;
      if (file) {
        selectedBlog.featured_image = file.filename;
      }
      // selectedBlog.createdAt = new Date();


      console.log("Slected Blog", selectedBlog)
      await selectedBlog.save();
      res.status(200).json({ message: "Blog content updated successfully" });
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  DeleteBlog: async (req, res) => {
    try {
      const userId = req.user._id;
      const  id= req.params.id;

      console.log(userId, id)
      //check if the id is present in the userBlogCollection
      // Check if the contentId is present in the userBlogCollection
      const userBlog = await blogOriginal.findOne({
        users: userId,
        _id: id,
      });

      console.log("User Blogs", userBlog)


      if (userBlog) {
        await blogOriginal.findByIdAndRemove(id);
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
    } catch { }
  },
};
