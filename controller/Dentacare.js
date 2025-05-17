import { CreateDentacareImageModule, CreateDentacareModule, CreateDentacareTopModule, DeleteDentacareImageModule, DeleteDentacareModule, DeleteDentacareTopModule, GetDentacareIDImageModule, GetDentacareIDModule, GetDentacareIDTopModule, GetDentacareImageModule, GetDentacareModule, GetDentacareTopModule, UpDatedentacareImageModule, UpdateDentacareModule, UpDatedentacareTopModule } from "../model/DentacareModel.js";

// Dentacare Top api 
export const createDentacareTop = async (req, res) => {
    try {
        const {  heading, description } = req.body;

        const DentacareId = await CreateDentacareTopModule( heading, description);
        res.status(201).json({ message: "Dentacare added successfully", id: DentacareId });
    } catch (error) {
        console.error("Error adding Dentacare:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetDentacareTop = async (req, res) => {
    try {
        const Dentacares = await GetDentacareTopModule();
        res.json(Dentacares);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Dentacares" });
    }
};



export const GetDentacareTopId = async (req, res) => {
    try {
        const { id } = req.params;
        const Dentacare = await GetDentacareIDTopModule(id);

        if (Dentacare) {
            res.status(200).json({ success: true, data: Dentacare });
        } else {
            res.status(404).json({ success: false, message: "Dentacare not found" });
        }
    } catch (error) {
        console.error("Error fetching Dentacare:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const updateDentacareTop = async (req, res) => {
    try {
      const { id } = req.params;
      const { heading, description } = req.body;
  
      const affectedRows = await UpDatedentacareTopModule(id, heading, description);
  
      if (affectedRows > 0) {
        res.status(200).json({ success: true, message: "Dentacare updated successfully" });
      } else {
        res.status(404).json({ success: false, message: "Dentacare not found or no changes made" });
      }
    } catch (error) {
      console.error("Error updating Dentacare:", error);
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  };
  

export const deleteDentacareTop = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Dentacare ID is required" });
        }

        const deletedRows = await DeleteDentacareTopModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "Dentacare deleted successfully" });
        } else {
            res.status(404).json({ error: "Dentacare not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting Dentacare" });
    }
};


// Dentacare Image api 
export const createDentacareImage = async (req, res) => {
    try {
        const dentacareimage = req.file?.buffer;

        const DentacareId = await CreateDentacareImageModule(dentacareimage);
        res.status(201).json({ message: "Dentacare added successfully", id: DentacareId });
    } catch (error) {
        console.error("Error adding Dentacare:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetDentacareImage = async (req, res) => {
    try {
        const Dentacares = await GetDentacareImageModule();
        res.json(Dentacares);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Dentacares" });
    }
};



export const GetDentacareImageId = async (req, res) => {
    try {
        const { id } = req.params;
        const Dentacare = await GetDentacareIDImageModule(id);

        if (Dentacare) {
            res.status(200).json({ success: true, data: Dentacare });
        } else {
            res.status(404).json({ success: false, message: "Dentacare not found" });
        }
    } catch (error) {
        console.error("Error fetching Dentacare:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const updateDentacareImage = async (req, res) => {
    try {
      const { id } = req.params;
      const imageBuffer = req.file ? req.file.buffer : null;
  
      const affectedRows = await UpDatedentacareImageModule(id, imageBuffer);
  
      if (affectedRows > 0) {
        res.status(200).json({ success: true, message: "Dentacare updated successfully" });
      } else {
        res.status(404).json({ success: false, message: "Dentacare not found or no changes made" });
      }
    } catch (error) {
      console.error("Error updating Dentacare:", error);
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  };
  

export const deleteDentacareImage = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Dentacare ID is required" });
        }

        const deletedRows = await DeleteDentacareImageModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "Dentacare deleted successfully" });
        } else {
            res.status(404).json({ error: "Dentacare not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting Dentacare" });
    }
};


// Dentacare  api 
export const createDentacare = async (req, res) => {
    try {
        const { title, para } = req.body;

        const DentacareId = await CreateDentacareModule(title, para);
        res.status(201).json({ message: "Dentacare added successfully", id: DentacareId });
    } catch (error) {
        console.error("Error adding Dentacare:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetDentacare = async (req, res) => {
    try {
        const Dentacares = await GetDentacareModule();
        res.json(Dentacares);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Dentacares" });
    }
};



export const GetDentacareId = async (req, res) => {
    try {
        const { id } = req.params;
        const Dentacare = await GetDentacareIDModule(id);

        if (Dentacare) {
            res.status(200).json({ success: true, data: Dentacare });
        } else {
            res.status(404).json({ success: false, message: "Dentacare not found" });
        }
    } catch (error) {
        console.error("Error fetching Dentacare:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const updateDentacare = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, para } = req.body;

        const affectedRows = await UpdateDentacareModule(id, title, para);

        if (affectedRows > 0) {
            res.status(200).json({ success: true, message: "Dentacare updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "Dentacare not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating Dentacare:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const deleteDentacare = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Dentacare ID is required" });
        }

        const deletedRows = await DeleteDentacareModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "Dentacare deleted successfully" });
        } else {
            res.status(404).json({ error: "Dentacare not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting Dentacare" });
    }
};



