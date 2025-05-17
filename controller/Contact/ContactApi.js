import { CreateContactModule, CreateContactTopModule, DeleteContactModule, DeleteContactTopModule, GetContactIDModule, GetContactModule, GetContactTopIDModule, GetContactTopModule, UpdateContactModule, UpdateContactTopModule } from "../../model/Contact/ContactModule.js";

// contact top api 
export const createContactTop = async (req, res) => {
    try {
        const { heading} = req.body;

        const ContactTopId = await CreateContactTopModule(heading);
        res.status(201).json({ message: "ContactTop added successfully", id: ContactTopId });
    } catch (error) {
        console.error("Error adding ContactTop:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetContactTop = async (req, res) => {
    try {
        const ContactTops = await GetContactTopModule();
        res.json(ContactTops);
    } catch (error) {
        res.status(500).json({ error: "Error fetching ContactTops" });
    }
};



export const GetContactTopId = async (req, res) => {
    try {
        const { id } = req.params;
        const ContactTop = await GetContactTopIDModule(id);

        if (ContactTop) {
            res.status(200).json({ success: true, data: ContactTop });
        } else {
            res.status(404).json({ success: false, message: "ContactTop not found" });
        }
    } catch (error) {
        console.error("Error fetching ContactTop:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const updateContactTop = async (req, res) => {
    try {
        const { id } = req.params;
        const { heading} = req.body;

        const affectedRows = await UpdateContactTopModule(id, heading);

        if (affectedRows > 0) {
            res.status(200).json({ success: true, message: "ContactTop updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "ContactTop not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating ContactTop:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const deleteContactTop = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ContactTop ID is required" });
        }

        const deletedRows = await DeleteContactTopModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "ContactTop deleted successfully" });
        } else {
            res.status(404).json({ error: "ContactTop not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting ContactTop" });
    }
};


// contact api 
export const createContact = async (req, res) => {
    try {
        const { heading, para } = req.body;

        const ContactId = await CreateContactModule(heading, para);
        res.status(201).json({ message: "Contact added successfully", id: ContactId });
    } catch (error) {
        console.error("Error adding Contact:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const GetContact = async (req, res) => {
    try {
        const Contacts = await GetContactModule();
        res.json(Contacts);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Contacts" });
    }
};

export const GetContactId = async (req, res) => {
    try {
        const { id } = req.params;
        const Contact = await GetContactIDModule(id);

        if (Contact) {
            res.status(200).json({ success: true, data: Contact });
        } else {
            res.status(404).json({ success: false, message: "Contact not found" });
        }
    } catch (error) {
        console.error("Error fetching Contact:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { heading, para } = req.body;

        const affectedRows = await UpdateContactModule(id, heading, para);

        if (affectedRows > 0) {
            res.status(200).json({ success: true, message: "Contact updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "Contact not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating Contact:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Contact ID is required" });
        }

        const deletedRows = await DeleteContactModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "Contact deleted successfully" });
        } else {
            res.status(404).json({ error: "Contact not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting Contact" });
    }
};