import { CreateMeetModule, CreateMeetTopModule, DeleteMeetModule, DeleteMeetTopModule, GetMeetIDModule, GetMeetModule, GetMeetTopIDModule, GetMeetTopModule, UpdateMeetModule, UpdateMeetTopModule } from "../model/MeetDentistModel.js";

// Meet top api 
export const createMeetTop = async (req, res) => {
    try {
        const { heading, para } = req.body;

        const MeetId = await CreateMeetTopModule(heading, para);
        res.status(201).json({ message: "Meet added successfully", id: MeetId });
    } catch (error) {
        console.error("Error adding Meet:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetMeetTop = async (req, res) => {
    try {
        const Meets = await GetMeetTopModule();
        res.json(Meets);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Meets" });
    }
};



export const GetMeetIdTop = async (req, res) => {
    try {
        const { id } = req.params;
        const Meet = await GetMeetTopIDModule(id);

        if (Meet) {
            res.status(200).json({ success: true, data: Meet });
        } else {
            res.status(404).json({ success: false, message: "Meet not found" });
        }
    } catch (error) {
        console.error("Error fetching Meet:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const updateMeetTop = async (req, res) => {
    try {
        const { id } = req.params;
        const { heading, para } = req.body;

        const affectedRows = await UpdateMeetTopModule(id, heading, para);

        if (affectedRows > 0) {
            res.status(200).json({ success: true, message: "Meet updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "Meet not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating Meet:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const deleteMeetTop = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Meet ID is required" });
        }

        const deletedRows = await DeleteMeetTopModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "Meet deleted successfully" });
        } else {
            res.status(404).json({ error: "Meet not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting Meet" });
    }
};



// Meet api 
export const createMeet = async (req, res) => {
    try {
        const {  title, subtitle, description } = req.body;
        const Meetimage = req.file?.buffer;

        const MeetId = await CreateMeetModule( title, subtitle, description, Meetimage);
        res.status(201).json({ message: "Meet added successfully", id: MeetId });
    } catch (error) {
        console.error("Error adding Meet:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const GetMeet = async (req, res) => {
    try {
        const Meets = await GetMeetModule();
        res.json(Meets);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Meets" });
    }
};



export const GetMeetId = async (req, res) => {
    try {
        const { id } = req.params;
        const Meet = await GetMeetIDModule(id);

        if (Meet) {
            res.status(200).json({ success: true, data: Meet });
        } else {
            res.status(404).json({ success: false, message: "Meet not found" });
        }
    } catch (error) {
        console.error("Error fetching Meet:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const updateMeet = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, subtitle, description } = req.body;
      const imageBuffer = req.file ? req.file.buffer : null;
  
      const affectedRows = await UpdateMeetModule(id, title, subtitle, description, imageBuffer);
  
      if (affectedRows > 0) {
        res.status(200).json({ success: true, message: "Meet updated successfully" });
      } else {
        res.status(404).json({ success: false, message: "Meet not found or no changes made" });
      }
    } catch (error) {
      console.error("Error updating Meet:", error);
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  };
  

export const deleteMeet = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Meet ID is required" });
        }

        const deletedRows = await DeleteMeetModule(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: "Meet deleted successfully" });
        } else {
            res.status(404).json({ error: "Meet not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting Meet" });
    }
};
