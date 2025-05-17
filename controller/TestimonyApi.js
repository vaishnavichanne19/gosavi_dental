import { CreateTestimonyModule, CreateTestimonyTopModule, DeleteTestimonyModule, DeleteTestimonyTopModule, GetTestimonyIDModule, GetTestimonyModule, GetTestimonyTopIDModule, GetTestimonyTopModule, UpdateTestimonyModule, UpdateTestimonyTopModule } from "../model/TestimonyModule.js";

// Testimony top api 
export const createTestimonyTop = async (req, res) => {
    try {
        const { heading, para } = req.body;

        const TestimonyId = await CreateTestimonyTopModule(heading, para);
        res.status(201).json({ message: "Testimony added successfully", id: TestimonyId });
    } catch (error) {
        console.error("Error adding Testimony:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetTestimonyTop = async (req, res) => {
    try {
        const Testimonys = await GetTestimonyTopModule();
        res.json(Testimonys);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Testimonys" });
    }
};



export const GetTestimonyIdTop = async (req, res) => {
    try {
        const { id } = req.params;
        const Testimony = await GetTestimonyTopIDModule(id);

        if (Testimony) {
            res.status(200).json({ success: true, data: Testimony });
        } else {
            res.status(404).json({ success: false, message: "Testimony not found" });
        }
    } catch (error) {
        console.error("Error fetching Testimony:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const updateTestimonyTop = async (req, res) => {
    try {
        const { id } = req.params;
        const { heading, para } = req.body;

        const affectedRows = await UpdateTestimonyTopModule(id, heading, para);

        if (affectedRows > 0) {
            res.status(200).json({ success: true, message: "Testimony updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "Testimony not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating Testimony:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const deleteTestimonyTop = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Testimony ID is required" });
        }

        const deletedRows = await DeleteTestimonyTopModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "Testimony deleted successfully" });
        } else {
            res.status(404).json({ error: "Testimony not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting Testimony" });
    }
};



// Testimony api 
export const createTestimony = async (req, res) => {
    try {
        const { description, name} = req.body;
        const testimonyimage = req.file?.buffer;

        const TestimonyId = await CreateTestimonyModule( testimonyimage, description, name);
        res.status(201).json({ message: "Testimony added successfully", id: TestimonyId });
    } catch (error) {
        console.error("Error adding Testimony:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetTestimony = async (req, res) => {
    try {
        const Testimonys = await GetTestimonyModule();
        res.json(Testimonys);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Testimonys" });
    }
};



export const GetTestimonyId = async (req, res) => {
    try {
        const { id } = req.params;
        const Testimony = await GetTestimonyIDModule(id);

        if (Testimony) {
            res.status(200).json({ success: true, data: Testimony });
        } else {
            res.status(404).json({ success: false, message: "Testimony not found" });
        }
    } catch (error) {
        console.error("Error fetching Testimony:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const updateTestimony = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const imageBuffer = req.file ? req.file.buffer : null;
  
      const affectedRows = await UpdateTestimonyModule(id, name, description, imageBuffer);
  
      if (affectedRows > 0) {
        res.status(200).json({ success: true, message: "Testimony updated successfully" });
      } else {
        res.status(404).json({ success: false, message: "Testimony not found or no changes made" });
      }
    } catch (error) {
      console.error("Error updating Testimony:", error);
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  };
  

export const deleteTestimony = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Testimony ID is required" });
        }

        const deletedRows = await DeleteTestimonyModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "Testimony deleted successfully" });
        } else {
            res.status(404).json({ error: "Testimony not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting Testimony" });
    }
};
