import {CreateAchievementModule, CreateAchievementTopModule, DeleteAchievementModule, DeleteAchievementTopModule, GetAchievementModule, GetAchievementTopModule, GetIdAchievementModule, GetIdAchievementTopModule, UpdateAchievementModule, UpdateAchievementTopModule} from '../model/AchievementModel.js'
// achievement top api 
export const createAchievementTop = async (req, res) => {
    try {
        const { title, para } = req.body; 

        const AchievementTopId = await CreateAchievementTopModule(title, para);
        res.status(201).json({ message: "AchievementTop added successfully", id: AchievementTopId });
    } catch (error) {
        console.error("Error adding AchievementTop:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetAchievementTop = async (req, res) => {
    try {
        const AchievementTops = await GetAchievementTopModule();
        res.json(AchievementTops);
    } catch (error) {
        res.status(500).json({ error: "Error fetching AchievementTops" });
    }
};


// ✅ Get AchievementTop by ID using module
export const GetAchievementTopId = async (req, res) => {
    try {
        const { id } = req.params;
        const AchievementTop = await GetIdAchievementTopModule(id);

        if (AchievementTop) {
            res.status(200).json({ success: true, data: AchievementTop });
        } else {
            res.status(404).json({ success: false, message: "AchievementTop not found" });
        }
    } catch (error) {
        console.error("Error fetching AchievementTop:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// ✅ Update AchievementTop by ID using module
export const updateAchievementTop = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, para } = req.body;

        if (!id || !title || !para) {
            return res.status(400).json({ success: false, message: "ID, title, para are required" });
        }

        const affectedRows = await UpdateAchievementTopModule(id, title, para);

        if (affectedRows > 0) {
            res.status(200).json({ success: true, message: "AchievementTop updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "AchievementTop not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating AchievementTop:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const deleteAchievementTop = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "AchievementTop ID is required" });
        }

        const deletedRows = await DeleteAchievementTopModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "AchievementTop deleted successfully" });
        } else {
            res.status(404).json({ error: "AchievementTop not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting AchievementTop" });
    }
};

// achievement api 
export const createAchievement = async (req, res) => {
    try {
        const { count, description } = req.body; 

        const AchievementId = await CreateAchievementModule(count, description);
        res.status(201).json({ message: "Achievement added successfully", id: AchievementId });
    } catch (error) {
        console.error("Error adding Achievement:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetAchievement = async (req, res) => {
    try {
        const Achievements = await GetAchievementModule();
        res.json(Achievements);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Achievements" });
    }
};


// ✅ Get Achievement by ID using module
export const GetAchievementId = async (req, res) => {
    try {
        const { id } = req.params;
        const Achievement = await GetIdAchievementModule(id);

        if (Achievement) {
            res.status(200).json({ success: true, data: Achievement });
        } else {
            res.status(404).json({ success: false, message: "Achievement not found" });
        }
    } catch (error) {
        console.error("Error fetching Achievement:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// ✅ Update Achievement by ID using module
export const updateAchievement = async (req, res) => {
    try {
        const { id } = req.params;
        const { count, description } = req.body;

        if (!id || !count || !description) {
            return res.status(400).json({ success: false, message: "ID, count, description are required" });
        }

        const affectedRows = await UpdateAchievementModule(id, count, description);

        if (affectedRows > 0) {
            res.status(200).json({ success: true, message: "Achievement updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "Achievement not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating Achievement:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const deleteAchievement = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Achievement ID is required" });
        }

        const deletedRows = await DeleteAchievementModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "Achievement deleted successfully" });
        } else {
            res.status(404).json({ error: "Achievement not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting Achievement" });
    }
};
