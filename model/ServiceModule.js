import db from "../db.js";

// Service top module 
export const CreateServiceTopModule = async (heading, para) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_topservice (
                id INT AUTO_INCREMENT PRIMARY KEY,
                heading VARCHAR(255) NOT NULL,
                para TEXT NOT NULL
            )
        `);

        // Insert all 5 values including image
        const [result] = await db.query(
            "INSERT INTO tbl_topservice (heading, para) VALUES (?, ?)",
            [heading, para]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting service:", error);
        throw error;
    }
};


export const GetServiceTopModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_topservice");
        return rows;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const GetServiceTopIDModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_topservice WHERE id = ?", [id]);
        return rows.length ? rows[0] : null; 
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const UpdateServiceTopModule = async (id, heading, para) => {
    try {
        const [result] = await db.query(
            "UPDATE tbl_topservice SET heading = ?, para = ?  WHERE id = ?",
            [heading, para, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error("Error updating banner:", error);
        throw error;
    }
};


export const DeleteServiceTopModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_topservice WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};


// Service module 
export const CreateServiceModule = async ( title, description, serviceimage) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_service (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title  VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                serviceimage LONGBLOB NOT NULL, 
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Insert all 5 values including image
        const [result] = await db.query(
            "INSERT INTO tbl_service ( title, description, serviceimage) VALUES (?, ?, ?)",
            [ title, description, serviceimage]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting service:", error);
        throw error;
    }
};


export const GetServiceModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_service");

        // Convert image blob to base64
        const updatedRows = rows.map(service => {
            return {
                ...service,
                serviceimage: service.serviceimage
                    ? `data:image/jpeg;base64,${Buffer.from(service.serviceimage).toString("base64")}`
                    : null
            };
        });

        return updatedRows;
    } catch (error) {
        console.error("Error fetching service:", error);
        throw error;
    }
};


export const GetServiceIDModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_service WHERE id = ?", [id]);
        if (!rows.length) return null;

        const service = rows[0];

        // Convert BLOB image to base64 string
        if (service.serviceimage) {
            service.serviceimage = `data:image/jpeg;base64,${Buffer.from(service.serviceimage).toString("base64")}`;
        } else {
            service.serviceimage = null;
        }

        return service;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const UpdateServiceModule = async (id, title, description, imageBuffer) => {
    try {
      let query = "UPDATE tbl_service SET title = ?, description = ?";
      const params = [title, description];
  
      if (imageBuffer) {
        query += ", serviceimage = ?";
        params.push(imageBuffer);
      }
  
      query += " WHERE id = ?";
      params.push(id);
  
      const [result] = await db.query(query, params);
      return result.affectedRows;
    } catch (error) {
      console.error("Error updating service:", error);
      throw error;
    }
  };
  


export const DeleteServiceModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_service WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};

