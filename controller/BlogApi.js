import { CreateBlogModule, CreateBlogTopModule, DeleteBlogModule, DeleteBlogTopModule, GetBlogIDModule, GetBlogModule, GetBlogTopIDModule, GetBlogTopModule, UpdateBlogModule, UpdateBlogTopModule } from "../model/BlogModule.js";

// Blog top api 
export const createBlogTop = async (req, res) => {
    try {
        const { heading, para } = req.body;

        const BlogId = await CreateBlogTopModule(heading, para);
        res.status(201).json({ message: "Blog added successfully", id: BlogId });
    } catch (error) {
        console.error("Error adding Blog:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetBlogTop = async (req, res) => {
    try {
        const Blogs = await GetBlogTopModule();
        res.json(Blogs);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Blogs" });
    }
};



export const GetBlogIdTop = async (req, res) => {
    try {
        const { id } = req.params;
        const Blog = await GetBlogTopIDModule(id);

        if (Blog) {
            res.status(200).json({ success: true, data: Blog });
        } else {
            res.status(404).json({ success: false, message: "Blog not found" });
        }
    } catch (error) {
        console.error("Error fetching Blog:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const updateBlogTop = async (req, res) => {
    try {
        const { id } = req.params;
        const { heading, para } = req.body;

        const affectedRows = await UpdateBlogTopModule(id, heading, para);

        if (affectedRows > 0) {
            res.status(200).json({ success: true, message: "Blog updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "Blog not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating Blog:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const deleteBlogTop = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Blog ID is required" });
        }

        const deletedRows = await DeleteBlogTopModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "Blog deleted successfully" });
        } else {
            res.status(404).json({ error: "Blog not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting Blog" });
    }
};



// Blog api 
export const createBlog = async (req, res) => {
    try {
        const { date, title, description} = req.body;
        const blogimage = req.file?.buffer;

        const BlogId = await CreateBlogModule( blogimage, date, title, description);
        res.status(201).json({ message: "Blog added successfully", id: BlogId });
    } catch (error) {
        console.error("Error adding Blog:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetBlog = async (req, res) => {
    try {
        const Blogs = await GetBlogModule();
        res.json(Blogs);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Blogs" });
    }
};



export const GetBlogId = async (req, res) => {
    try {
        const { id } = req.params;
        const Blog = await GetBlogIDModule(id);

        if (Blog) {
            res.status(200).json({ success: true, data: Blog });
        } else {
            res.status(404).json({ success: false, message: "Blog not found" });
        }
    } catch (error) {
        console.error("Error fetching Blog:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const updateBlog = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, date, description } = req.body;
      const imageBuffer = req.file ? req.file.buffer : null;
  
      const affectedRows = await UpdateBlogModule(id, title, date, description, imageBuffer);
  
      if (affectedRows > 0) {
        res.status(200).json({ success: true, message: "Blog updated successfully" });
      } else {
        res.status(404).json({ success: false, message: "Blog not found or no changes made" });
      }
    } catch (error) {
      console.error("Error updating Blog:", error);
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  };
  

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Blog ID is required" });
        }

        const deletedRows = await DeleteBlogModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "Blog deleted successfully" });
        } else {
            res.status(404).json({ error: "Blog not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting Blog" });
    }
};
