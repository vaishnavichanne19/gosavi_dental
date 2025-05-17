import { CreatePriceModule, CreatePriceTopModule, DeletePriceModule, DeletePriceTopModule, GetPriceIDModule, GetPriceModule, GetPriceTopIDModule, GetPriceTopModule, UpdatePriceModule, UpdatePriceTopModule } from "../model/PriceModule.js";

// Price top api 
export const createPriceTop = async (req, res) => {
    try {
        const { heading, para } = req.body;

        const PriceId = await CreatePriceTopModule(heading, para);
        res.status(201).json({ message: "Price added successfully", id: PriceId });
    } catch (error) {
        console.error("Error adding Price:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetPriceTop = async (req, res) => {
    try {
        const Prices = await GetPriceTopModule();
        res.json(Prices);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Prices" });
    }
};



export const GetPriceIdTop = async (req, res) => {
    try {
        const { id } = req.params;
        const Price = await GetPriceTopIDModule(id);

        if (Price) {
            res.status(200).json({ success: true, data: Price });
        } else {
            res.status(404).json({ success: false, message: "Price not found" });
        }
    } catch (error) {
        console.error("Error fetching Price:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const updatePriceTop = async (req, res) => {
    try {
        const { id } = req.params;
        const { heading, para } = req.body;

        const affectedRows = await UpdatePriceTopModule(id, heading, para);

        if (affectedRows > 0) {
            res.status(200).json({ success: true, message: "Price updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "Price not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating Price:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const deletePriceTop = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Price ID is required" });
        }

        const deletedRows = await DeletePriceTopModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "Price deleted successfully" });
        } else {
            res.status(404).json({ error: "Price not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting Price" });
    }
};


// Price  api 
export const createPrice = async (req, res) => {
    try {
        const { title, price, description } = req.body;

        const PriceId = await CreatePriceModule(title, price, description);
        res.status(201).json({ message: "Price added successfully", id: PriceId });
    } catch (error) {
        console.error("Error adding Price:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetPrice = async (req, res) => {
    try {
        const Prices = await GetPriceModule();
        res.json(Prices);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Prices" });
    }
};



export const GetPriceId = async (req, res) => {
    try {
        const { id } = req.params;
        const Price = await GetPriceIDModule(id);

        if (Price) {
            res.status(200).json({ success: true, data: Price });
        } else {
            res.status(404).json({ success: false, message: "Price not found" });
        }
    } catch (error) {
        console.error("Error fetching Price:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const updatePrice = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, description } = req.body;

        const affectedRows = await UpdatePriceModule(id, title, price, description);

        if (affectedRows > 0) {
            res.status(200).json({ success: true, message: "Price updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "Price not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating Price:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const deletePrice = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Price ID is required" });
        }

        const deletedRows = await DeletePriceModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "Price deleted successfully" });
        } else {
            res.status(404).json({ error: "Price not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting Price" });
    }
};

