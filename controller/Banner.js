import { CreateBannerCard1, CreateBannerCard2, CreateBannerModule, CreateBannerTopCard2, DeleteBannerCard1, DeleteBannerCard2, DeleteBannerModule, DeleteBannerTopCard2, GetBannerCard1Module, GetBannerCard2Module, GetBannerIdCard1, GetBannerIdCard2, GetBannerIdModule, GetBannerIdTopCard2, GetBannerModule, GetBannerTopCard2Module, UpdateBannerCard1, UpdateBannerCard2, UpdateBannerModule, UpdateBannerTopCard2 } from "../model/BannerModel.js";

export const createBanner = async (req, res) => {
    try {
        const { heading, description } = req.body;
        const bannerimage = req.file.buffer; 

        const bannerId = await CreateBannerModule(heading, description, bannerimage);
        res.status(201).json({ message: "Banner added successfully", id: bannerId });
    } catch (error) {
        console.error("Error adding banner:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetBanner = async (req, res) => {
    try {
        const banners = await GetBannerModule();
        res.json(banners);
    } catch (error) {
        res.status(500).json({ error: "Error fetching banners" });
    }
};


// ✅ Get Banner by ID using module
export const GetBannerId = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await GetBannerIdModule(id);

        if (banner) {
            res.status(200).json({ success: true, data: banner });
        } else {
            res.status(404).json({ success: false, message: "Banner not found" });
        }
    } catch (error) {
        console.error("Error fetching banner:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// ✅ Update Banner by ID using module
export const updateBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const { heading, description } = req.body;
        const imageBuffer = req.file ? req.file.buffer : null;

        const affectedRows = await UpdateBannerModule(id, heading, description, imageBuffer);

        if (affectedRows > 0) {
            res.status(200).json({ success: true, message: "Banner updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "Banner not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating banner:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Banner ID is required" });
        }

        const deletedRows = await DeleteBannerModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "Banner deleted successfully" });
        } else {
            res.status(404).json({ error: "Banner not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting banner" });
    }
};

// emergency cases api 
export const createBannerCard1 = async (req, res) => {
    try {
        const { heading, description, number } = req.body; 

        const bannerCard1Id = await CreateBannerCard1(heading, description, number);
        res.status(201).json({ message: "BannerCard1 added successfully", id: bannerCard1Id });
    } catch (error) {
        console.error("Error adding bannerCard1:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetBannerCard1 = async (req, res) => {
    try {
        const bannerCard1s = await GetBannerCard1Module();
        res.json(bannerCard1s);
    } catch (error) {
        res.status(500).json({ error: "Error fetching bannerCard1s" });
    }
};


// ✅ Get BannerCard1 by ID using module
export const GetBannerCard1Id = async (req, res) => {
    try {
        const { id } = req.params;
        const bannerCard1 = await GetBannerIdCard1(id);

        if (bannerCard1) {
            res.status(200).json({ success: true, data: bannerCard1 });
        } else {
            res.status(404).json({ success: false, message: "BannerCard1 not found" });
        }
    } catch (error) {
        console.error("Error fetching bannerCard1:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// ✅ Update BannerCard1 by ID using module
export const updateBannerCard1 = async (req, res) => {
    try {
        const { id } = req.params;
        const { heading, description, number } = req.body;

        if (!id || !heading || !description || !number) {
            return res.status(400).json({ success: false, message: "ID, heading, description, and number are required" });
        }

        const affectedRows = await UpdateBannerCard1(id, heading, description, number);

        if (affectedRows > 0) {
            res.status(200).json({ success: true, message: "BannerCard1 updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "BannerCard1 not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating bannerCard1:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const deleteBannerCard1 = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "BannerCard1 ID is required" });
        }

        const deletedRows = await DeleteBannerCard1(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "BannerCard1 deleted successfully" });
        } else {
            res.status(404).json({ error: "BannerCard1 not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting bannerCard1" });
    }
};

// Opening Hours Top api 
export const createBannerTopCard2 = async (req, res) => {
    try {
        const { heading} = req.body; 

        const bannerTopCard2Id = await CreateBannerTopCard2(heading);
        res.status(201).json({ message: "BannerTopCard2 added successfully", id: bannerTopCard2Id });
    } catch (error) {
        console.error("Error adding bannerTopCard2:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetBannerTopCard2 = async (req, res) => {
    try {
        const bannerTopCard2s = await GetBannerTopCard2Module();
        res.json(bannerTopCard2s);
    } catch (error) {
        res.status(500).json({ error: "Error fetching bannerTopCard2s" });
    }
};


// ✅ Get BannerTopCard2 by ID using module
export const GetBannerTopCard2Id = async (req, res) => {
    try {
        const { id } = req.params;
        const bannerTopCard2 = await GetBannerIdTopCard2(id);

        if (bannerTopCard2) {
            res.status(200).json({ success: true, data: bannerTopCard2 });
        } else {
            res.status(404).json({ success: false, message: "BannerTopCard2 not found" });
        }
    } catch (error) {
        console.error("Error fetching bannerTopCard2:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// ✅ Update BannerTopCard2 by ID using module
export const updateBannerTopCard2 = async (req, res) => {
    try {
        const { id } = req.params;
        const { heading} = req.body;

        const affectedRows = await UpdateBannerTopCard2(id, heading);

        if (affectedRows > 0) {
            res.status(200).json({ success: true, message: "BannerTopCard2 updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "BannerTopCard2 not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating bannerTopCard2:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const deleteBannerTopCard2 = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "BannerTopCard2 ID is required" });
        }

        const deletedRows = await DeleteBannerTopCard2(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "BannerTopCard2 deleted successfully" });
        } else {
            res.status(404).json({ error: "BannerTopCard2 not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting bannerTopCard2" });
    }
};



// Opening Hours api 
export const createBannerCard2 = async (req, res) => {
    try {
        const { day, time } = req.body; 

        const bannerCard2Id = await CreateBannerCard2(day, time);
        res.status(201).json({ message: "BannerCard2 added successfully", id: bannerCard2Id });
    } catch (error) {
        console.error("Error adding bannerCard2:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetBannerCard2 = async (req, res) => {
    try {
        const bannerCard2s = await GetBannerCard2Module();
        res.json(bannerCard2s);
    } catch (error) {
        res.status(500).json({ error: "Error fetching bannerCard2s" });
    }
};


// ✅ Get BannerCard2 by ID using module
export const GetBannerCard2Id = async (req, res) => {
    try {
        const { id } = req.params;
        const bannerCard2 = await GetBannerIdCard2(id);

        if (bannerCard2) {
            res.status(200).json({ success: true, data: bannerCard2 });
        } else {
            res.status(404).json({ success: false, message: "BannerCard2 not found" });
        }
    } catch (error) {
        console.error("Error fetching bannerCard2:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// ✅ Update BannerCard2 by ID using module
export const updateBannerCard2 = async (req, res) => {
    try {
        const { id } = req.params;
        const { day, time } = req.body;

        const affectedRows = await UpdateBannerCard2(id, day, time);

        if (affectedRows > 0) {
            res.status(200).json({ success: true, message: "BannerCard2 updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "BannerCard2 not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating bannerCard2:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const deleteBannerCard2 = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "BannerCard2 ID is required" });
        }

        const deletedRows = await DeleteBannerCard2(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "BannerCard2 deleted successfully" });
        } else {
            res.status(404).json({ error: "BannerCard2 not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting bannerCard2" });
    }
};

