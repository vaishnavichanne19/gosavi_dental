import { CreateServiceModule, CreateServiceTopModule, DeleteServiceModule, DeleteServiceTopModule, GetServiceIDModule, GetServiceModule, GetServiceTopIDModule, GetServiceTopModule, UpdateServiceModule, UpdateServiceTopModule } from "../model/ServiceModule.js";

// service top api 
export const createServiceTop = async (req, res) => {
    try {
        const { heading, para } = req.body;

        const ServiceId = await CreateServiceTopModule(heading, para);
        res.status(201).json({ message: "Service added successfully", id: ServiceId });
    } catch (error) {
        console.error("Error adding Service:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetServiceTop = async (req, res) => {
    try {
        const Services = await GetServiceTopModule();
        res.json(Services);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Services" });
    }
};



export const GetServiceIdTop = async (req, res) => {
    try {
        const { id } = req.params;
        const Service = await GetServiceTopIDModule(id);

        if (Service) {
            res.status(200).json({ success: true, data: Service });
        } else {
            res.status(404).json({ success: false, message: "Service not found" });
        }
    } catch (error) {
        console.error("Error fetching Service:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const updateServiceTop = async (req, res) => {
    try {
        const { id } = req.params;
        const { heading, para } = req.body;

        const affectedRows = await UpdateServiceTopModule(id, heading, para);

        if (affectedRows > 0) {
            res.status(200).json({ success: true, message: "Service updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "Service not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating Service:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const deleteServiceTop = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Service ID is required" });
        }

        const deletedRows = await DeleteServiceTopModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "Service deleted successfully" });
        } else {
            res.status(404).json({ error: "Service not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting Service" });
    }
};



// service api 
export const createService = async (req, res) => {
    try {
        const {  title, description } = req.body;
        const serviceimage = req.file?.buffer;

        const ServiceId = await CreateServiceModule( title, description, serviceimage);
        res.status(201).json({ message: "Service added successfully", id: ServiceId });
    } catch (error) {
        console.error("Error adding Service:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetService = async (req, res) => {
    try {
        const Services = await GetServiceModule();
        res.json(Services);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Services" });
    }
};



export const GetServiceId = async (req, res) => {
    try {
        const { id } = req.params;
        const Service = await GetServiceIDModule(id);

        if (Service) {
            res.status(200).json({ success: true, data: Service });
        } else {
            res.status(404).json({ success: false, message: "Service not found" });
        }
    } catch (error) {
        console.error("Error fetching Service:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const updateService = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const imageBuffer = req.file ? req.file.buffer : null;
  
      const affectedRows = await UpdateServiceModule(id, title, description, imageBuffer);
  
      if (affectedRows > 0) {
        res.status(200).json({ success: true, message: "Service updated successfully" });
      } else {
        res.status(404).json({ success: false, message: "Service not found or no changes made" });
      }
    } catch (error) {
      console.error("Error updating Service:", error);
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  };
  

export const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Service ID is required" });
        }

        const deletedRows = await DeleteServiceModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "Service deleted successfully" });
        } else {
            res.status(404).json({ error: "Service not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting Service" });
    }
};
