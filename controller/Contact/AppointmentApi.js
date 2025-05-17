import { CreateAppointmentFormModule, DeleteAppointmentFormModule, GetAppointmentFormIDModule, GetAppointmentFormModule, UpdateAppointmentFormModule } from "../../model/Contact/AppointmentModule.js";

// AppointmentForm api 
export const createAppointmentForm = async (req, res) => {
    try {
        const { fullname, email, date, time, message } = req.body;

        const AppointmentFormId = await CreateAppointmentFormModule(fullname, email, date, time, message);
        res.status(201).json({ message: "AppointmentForm added successfully", id: AppointmentFormId });
    } catch (error) {
        console.error("Error adding AppointmentForm:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetAppointmentForm = async (req, res) => {
    try {
        const AppointmentForms = await GetAppointmentFormModule();
        res.json(AppointmentForms);
    } catch (error) {
        res.status(500).json({ error: "Error fetching AppointmentForms" });
    }
};



export const GetAppointmentFormIdTop = async (req, res) => {
    try {
        const { id } = req.params;
        const AppointmentForm = await GetAppointmentFormIDModule(id);

        if (AppointmentForm) {
            res.status(200).json({ success: true, data: AppointmentForm });
        } else {
            res.status(404).json({ success: false, message: "AppointmentForm not found" });
        }
    } catch (error) {
        console.error("Error fetching AppointmentForm:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const updateAppointmentForm = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullname, email, date, time, message } = req.body;

        const affectedRows = await UpdateAppointmentFormModule(id, fullname, email, date, time, message);

        if (affectedRows > 0) {
            res.status(200).json({ success: true, message: "AppointmentForm updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "AppointmentForm not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating AppointmentForm:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const deleteAppointmentForm = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "AppointmentForm ID is required" });
        }

        const deletedRows = await DeleteAppointmentFormModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "AppointmentForm deleted successfully" });
        } else {
            res.status(404).json({ error: "AppointmentForm not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting AppointmentForm" });
    }
};
