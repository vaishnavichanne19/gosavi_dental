import { CreateGalleryModule, DeleteGalleryModule, GetGalleryIDModule, GetGalleryModule, UpdateGalleryModule } from "../model/GalleryModel.js";

export const createGallery = async (req, res) => {
    try {
        const galleryimage = req.file?.buffer;

        const GalleryId = await CreateGalleryModule(galleryimage);
        res.status(201).json({ message: "Gallery added successfully", id: GalleryId });
    } catch (error) {
        console.error("Error adding Gallery:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetGallery = async (req, res) => {
    try {
        const Gallerys = await GetGalleryModule();
        res.json(Gallerys);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Gallerys" });
    }
};



export const GetGalleryId = async (req, res) => {
    try {
        const { id } = req.params;
        const Gallery = await GetGalleryIDModule(id);

        if (Gallery) {
            res.status(200).json({ success: true, data: Gallery });
        } else {
            res.status(404).json({ success: false, message: "Gallery not found" });
        }
    } catch (error) {
        console.error("Error fetching Gallery:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const updateGallery = async (req, res) => {
    try {
      const { id } = req.params;
      const imageBuffer = req.file ? req.file.buffer : null;
  
      const affectedRows = await UpdateGalleryModule(id, imageBuffer);
  
      if (affectedRows > 0) {
        res.status(200).json({ success: true, message: "Gallery updated successfully" });
      } else {
        res.status(404).json({ success: false, message: "Gallery not found or no changes made" });
      }
    } catch (error) {
      console.error("Error updating Gallery:", error);
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  };
  

export const deleteGallery = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Gallery ID is required" });
        }

        const deletedRows = await DeleteGalleryModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "Gallery deleted successfully" });
        } else {
            res.status(404).json({ error: "Gallery not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting Gallery" });
    }
};
