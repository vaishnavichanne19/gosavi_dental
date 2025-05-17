import { CreateContactFormModule, DeleteContactFormModule, GetContactFormIDModule, GetContactFormModule, UpdateContactFormModule } from "../../model/Contact/ContactFormModule.js";

// ContactForm api 
export const createContactForm = async (req, res) => {
    try {
        const { fullname, email, subject, message } = req.body;

        const ContactFormId = await CreateContactFormModule(fullname, email, subject, message);
        res.status(201).json({ message: "ContactForm added successfully", id: ContactFormId });
    } catch (error) {
        console.error("Error adding ContactForm:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetContactForm = async (req, res) => {
    try {
        const ContactForms = await GetContactFormModule();
        res.json(ContactForms);
    } catch (error) {
        res.status(500).json({ error: "Error fetching ContactForms" });
    }
};



export const GetContactFormIdTop = async (req, res) => {
    try {
        const { id } = req.params;
        const ContactForm = await GetContactFormIDModule(id);

        if (ContactForm) {
            res.status(200).json({ success: true, data: ContactForm });
        } else {
            res.status(404).json({ success: false, message: "ContactForm not found" });
        }
    } catch (error) {
        console.error("Error fetching ContactForm:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const updateContactForm = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullname, email, subject, message } = req.body;

        const affectedRows = await UpdateContactFormModule(id, fullname, email, subject, message);

        if (affectedRows > 0) {
            res.status(200).json({ success: true, message: "ContactForm updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "ContactForm not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating ContactForm:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const deleteContactForm = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ContactForm ID is required" });
        }

        const deletedRows = await DeleteContactFormModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "ContactForm deleted successfully" });
        } else {
            res.status(404).json({ error: "ContactForm not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting ContactForm" });
    }
};
