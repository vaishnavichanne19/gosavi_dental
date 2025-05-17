import { CreateQuoteModule, DeleteQuoteModule, GetQuoteIDModule, GetQuoteModule, UpdateQuoteModule } from "../model/QuoteModule.js";

// Quote api 
export const createQuote = async (req, res) => {
    try {
        const { heading, para } = req.body;

        const QuoteId = await CreateQuoteModule(heading, para);
        res.status(201).json({ message: "Quote added successfully", id: QuoteId });
    } catch (error) {
        console.error("Error adding Quote:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetQuote = async (req, res) => {
    try {
        const Quotes = await GetQuoteModule();
        res.json(Quotes);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Quotes" });
    }
};



export const GetQuoteIdTop = async (req, res) => {
    try {
        const { id } = req.params;
        const Quote = await GetQuoteIDModule(id);

        if (Quote) {
            res.status(200).json({ success: true, data: Quote });
        } else {
            res.status(404).json({ success: false, message: "Quote not found" });
        }
    } catch (error) {
        console.error("Error fetching Quote:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const updateQuote = async (req, res) => {
    try {
        const { id } = req.params;
        const { heading, para } = req.body;

        const affectedRows = await UpdateQuoteModule(id, heading, para);

        if (affectedRows > 0) {
            res.status(200).json({ success: true, message: "Quote updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "Quote not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating Quote:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const deleteQuote = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Quote ID is required" });
        }

        const deletedRows = await DeleteQuoteModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "Quote deleted successfully" });
        } else {
            res.status(404).json({ error: "Quote not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting Quote" });
    }
};
