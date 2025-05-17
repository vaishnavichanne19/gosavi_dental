import { CreateQuoteFormModule, DeleteQuoteFormModule, GetQuoteFormIDModule, GetQuoteFormModule, UpdateQuoteFormModule } from "../model/QuoteFormModule.js";

// QuoteForm api 
export const createQuoteForm = async (req, res) => {
    try {
        const { fullname, email, phone, website, message } = req.body;

        const QuoteFormId = await CreateQuoteFormModule(fullname, email, phone, website, message);
        res.status(201).json({ message: "QuoteForm added successfully", id: QuoteFormId });
    } catch (error) {
        console.error("Error adding QuoteForm:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetQuoteForm = async (req, res) => {
    try {
        const QuoteForms = await GetQuoteFormModule();
        res.json(QuoteForms);
    } catch (error) {
        res.status(500).json({ error: "Error fetching QuoteForms" });
    }
};



export const GetQuoteFormIdTop = async (req, res) => {
    try {
        const { id } = req.params;
        const QuoteForm = await GetQuoteFormIDModule(id);

        if (QuoteForm) {
            res.status(200).json({ success: true, data: QuoteForm });
        } else {
            res.status(404).json({ success: false, message: "QuoteForm not found" });
        }
    } catch (error) {
        console.error("Error fetching QuoteForm:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const updateQuoteForm = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullname, email, phone, website, message } = req.body;

        const affectedRows = await UpdateQuoteFormModule(id, fullname, email, phone, website, message);

        if (affectedRows > 0) {
            res.status(200).json({ success: true, message: "QuoteForm updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "QuoteForm not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating QuoteForm:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const deleteQuoteForm = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "QuoteForm ID is required" });
        }

        const deletedRows = await DeleteQuoteFormModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "QuoteForm deleted successfully" });
        } else {
            res.status(404).json({ error: "QuoteForm not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting QuoteForm" });
    }
};
