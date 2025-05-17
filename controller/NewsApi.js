import { CreateNewsModule, DeleteNewsModule, GetNewsIDModule, GetNewsModule, UpdateNewsModule } from "../model/NewsLetterModul.js";

 
export const createNews = async (req, res) => {
    try {
        const { heading, para } = req.body;

        const NewsId = await CreateNewsModule(heading, para);
        res.status(201).json({ message: "News added successfully", id: NewsId });
    } catch (error) {
        console.error("Error adding News:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetNews = async (req, res) => {
    try {
        const Newss = await GetNewsModule();
        res.json(Newss);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Newss" });
    }
};



export const GetIdNews = async (req, res) => {
    try {
        const { id } = req.params;
        const News = await GetNewsIDModule(id);

        if (News) {
            res.status(200).json({ success: true, data: News });
        } else {
            res.status(404).json({ success: false, message: "News not found" });
        }
    } catch (error) {
        console.error("Error fetching News:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const { heading, para } = req.body;

        const affectedRows = await UpdateNewsModule(id, heading, para);

        if (affectedRows > 0) {
            res.status(200).json({ success: true, message: "News updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "News not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating News:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const deleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "News ID is required" });
        }

        const deletedRows = await DeleteNewsModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "News deleted successfully" });
        } else {
            res.status(404).json({ error: "News not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting News" });
    }
};