import { CreateHomeAppointmentFormModule, DeleteHomeAppointmentFormModule, GetHomeAppointmentFormIDModule, GetHomeAppointmentFormModule, UpdateHomeAppointmentFormModule } from "../model/HomeAppointmentForm.js";

// HomeAppointmentForm api 
export const createHomeAppointmentForm = async (req, res) => {
    try {
        const { department, fullname, email, date, time, phone } = req.body;

        const HomeAppointmentFormId = await CreateHomeAppointmentFormModule(department, fullname, email, date, time, phone);
        res.status(201).json({ message: "HomeAppointmentForm added successfully", id: HomeAppointmentFormId });
    } catch (error) {
        console.error("Error adding HomeAppointmentForm:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetHomeAppointmentForm = async (req, res) => {
    try {
        const HomeAppointmentForms = await GetHomeAppointmentFormModule();
        res.json(HomeAppointmentForms);
    } catch (error) {
        res.status(500).json({ error: "Error fetching HomeAppointmentForms" });
    }
};



export const GetHomeAppointmentFormIdTop = async (req, res) => {
    try {
        const { id } = req.params;
        const HomeAppointmentForm = await GetHomeAppointmentFormIDModule(id);

        if (HomeAppointmentForm) {
            res.status(200).json({ success: true, data: HomeAppointmentForm });
        } else {
            res.status(404).json({ success: false, message: "HomeAppointmentForm not found" });
        }
    } catch (error) {
        console.error("Error fetching HomeAppointmentForm:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const updateHomeAppointmentForm = async (req, res) => {
    try {
        const { id } = req.params;
        const { department, fullname, email, date, time, phone } = req.body;

        const affectedRows = await UpdateHomeAppointmentFormModule(id, department, fullname, email, date, time, phone);

        if (affectedRows > 0) {
            res.status(200).json({ success: true, message: "HomeAppointmentForm updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "HomeAppointmentForm not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating HomeAppointmentForm:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const deleteHomeAppointmentForm = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "HomeAppointmentForm ID is required" });
        }

        const deletedRows = await DeleteHomeAppointmentFormModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "HomeAppointmentForm deleted successfully" });
        } else {
            res.status(404).json({ error: "HomeAppointmentForm not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting HomeAppointmentForm" });
    }
};
