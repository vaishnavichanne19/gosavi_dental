import { CreateGalleryDataModule, DeleteGalleryDataModule, GetGalleryDataIdModule, GetGalleryDataModule, UpdateGalleryDataModule } from "../../model/Gallery/GalleryDataModule.js";

export const createGalleryData = async (req, res) => {
    try {
        const { heading} = req.body;
        const gallerydataimage = req.file.buffer; 

        const GalleryDataId = await CreateGalleryDataModule(heading, gallerydataimage);
        res.status(201).json({ message: "GalleryData added successfully", id: GalleryDataId });
    } catch (error) {
        console.error("Error adding GalleryData:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetGalleryData = async (req, res) => {
    try {
        const GalleryDatas = await GetGalleryDataModule();
        res.json(GalleryDatas);
    } catch (error) {
        res.status(500).json({ error: "Error fetching GalleryDatas" });
    }
};


// ✅ Get GalleryData by ID using module
export const GetGalleryDataId = async (req, res) => {
    try {
        const { id } = req.params;
        const GalleryData = await GetGalleryDataIdModule(id);

        if (GalleryData) {
            res.status(200).json({ success: true, data: GalleryData });
        } else {
            res.status(404).json({ success: false, message: "GalleryData not found" });
        }
    } catch (error) {
        console.error("Error fetching GalleryData:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// ✅ Update GalleryData by ID using module
export const updateGalleryData = async (req, res) => {
    try {
        const { id } = req.params;
        const { heading } = req.body;
        const imageBuffer = req.file ? req.file.buffer : null;

        const affectedRows = await UpdateGalleryDataModule(id, heading, imageBuffer);

        if (affectedRows > 0) {
            res.status(200).json({ success: true, message: "GalleryData updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "GalleryData not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating GalleryData:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const deleteGalleryData = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "GalleryData ID is required" });
        }

        const deletedRows = await DeleteGalleryDataModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "GalleryData deleted successfully" });
        } else {
            res.status(404).json({ error: "GalleryData not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting GalleryData" });
    }
};