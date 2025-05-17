import db from "../db.js";

// Meet top module 
export const CreateMeetTopModule = async (heading, para) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_topMeet (
                id INT AUTO_INCREMENT PRIMARY KEY,
                heading VARCHAR(255) NOT NULL,
                para TEXT NOT NULL
            )
        `);

        // Insert all 5 values including image
        const [result] = await db.query(
            "INSERT INTO tbl_topMeet (heading, para) VALUES (?, ?)",
            [heading, para]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting Meet:", error);
        throw error;
    }
};


export const GetMeetTopModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_topMeet");
        return rows;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const GetMeetTopIDModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_topMeet WHERE id = ?", [id]);
        return rows.length ? rows[0] : null; 
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const UpdateMeetTopModule = async (id, heading, para) => {
    try {
        const [result] = await db.query(
            "UPDATE tbl_topMeet SET heading = ?, para = ?  WHERE id = ?",
            [heading, para, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error("Error updating banner:", error);
        throw error;
    }
};


export const DeleteMeetTopModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_topMeet WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};


// Meet module 
export const CreateMeetModule = async ( title, subtitle, description, meetimage) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_Meet (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title  VARCHAR(255) NOT NULL,
                subtitle VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                meetimage LONGBLOB NOT NULL, 
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Insert all 5 values including image
        const [result] = await db.query(
            "INSERT INTO tbl_Meet ( title, subtitle, description, meetimage) VALUES (?, ?, ?, ?)",
            [ title, subtitle, description, meetimage]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting Meet:", error);
        throw error;
    }
};


export const GetMeetModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_Meet");

        // Convert image blob to base64
        const updatedRows = rows.map(Meet => {
            return {
                ...Meet,
                meetimage: Meet.meetimage
                    ? `data:image/jpeg;base64,${Buffer.from(Meet.meetimage).toString("base64")}`
                    : null
            };
        });

        return updatedRows;
    } catch (error) {
        console.error("Error fetching Meet:", error);
        throw error;
    }
};


export const GetMeetIDModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_Meet WHERE id = ?", [id]);
        if (!rows.length) return null;

        const Meet = rows[0];

        // Convert BLOB image to base64 string
        if (Meet.meetimage) {
            Meet.meetimage = `data:image/jpeg;base64,${Buffer.from(Meet.meetimage).toString("base64")}`;
        } else {
            Meet.meetimage = null;
        }

        return Meet;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const UpdateMeetModule = async (id, title, subtitle, description, imageBuffer) => {
    try {
      let query = "UPDATE tbl_Meet SET title = ?, subtitle = ?, description = ?";
      const params = [title, subtitle, description];
  
      if (imageBuffer) {
        query += ", meetimage = ?";
        params.push(imageBuffer);
      }
  
      query += " WHERE id = ?";
      params.push(id);
  
      const [result] = await db.query(query, params);
      return result.affectedRows;
    } catch (error) {
      console.error("Error updating Meet:", error);
      throw error;
    }
  };
  


export const DeleteMeetModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_Meet WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};

