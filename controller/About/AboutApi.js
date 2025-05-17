import { CreateAboutModule, DeleteAboutModule, GetAboutIDModule, GetAboutModule, UpdateAboutModule } from "../../model/About/AboutModule.js";

export const createAbout = async (req, res) => {
    try {
        const {  title1, description1, title2, description2, title3, description3 } = req.body;
        const aboutimage = req.file?.buffer;

        const AboutId = await CreateAboutModule( title1, description1, aboutimage, title2, description2, title3, description3);
        res.status(201).json({ message: "About added successfully", id: AboutId });
    } catch (error) {
        console.error("Error adding About:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetAbout = async (req, res) => {
    try {
        const Abouts = await GetAboutModule();
        res.json(Abouts);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Abouts" });
    }
};



export const GetAboutId = async (req, res) => {
    try {
        const { id } = req.params;
        const About = await GetAboutIDModule(id);

        if (About) {
            res.status(200).json({ success: true, data: About });
        } else {
            res.status(404).json({ success: false, message: "About not found" });
        }
    } catch (error) {
        console.error("Error fetching About:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const updateAbout = async (req, res) => {
    try {
      const { id } = req.params;
      const { title1, description1, title2, description2, title3, description3 } = req.body;
      const imageBuffer = req.file ? req.file.buffer : null;
  
      const affectedRows = await UpdateAboutModule(id, title1, description1, imageBuffer, title2, description2, title3, description3);
  
      if (affectedRows > 0) {
        res.status(200).json({ success: true, message: "About updated successfully" });
      } else {
        res.status(404).json({ success: false, message: "About not found or no changes made" });
      }
    } catch (error) {
      console.error("Error updating About:", error);
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  };
  

export const deleteAbout = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "About ID is required" });
        }

        const deletedRows = await DeleteAboutModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "About deleted successfully" });
        } else {
            res.status(404).json({ error: "About not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting About" });
    }
};
