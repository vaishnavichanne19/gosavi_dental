import db from "../db.js";

// Testimony top module 
export const CreateTestimonyTopModule = async (heading, para) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_toptestimony (
                id INT AUTO_INCREMENT PRIMARY KEY,
                heading VARCHAR(255) NOT NULL,
                para TEXT NOT NULL
            )
        `);

        // Insert all 5 values including image
        const [result] = await db.query(
            "INSERT INTO tbl_toptestimony (heading, para) VALUES (?, ?)",
            [heading, para]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting Testimony:", error);
        throw error;
    }
};


export const GetTestimonyTopModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_toptestimony");
        return rows;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const GetTestimonyTopIDModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_toptestimony WHERE id = ?", [id]);
        return rows.length ? rows[0] : null; 
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const UpdateTestimonyTopModule = async (id, heading, para) => {
    try {
        const [result] = await db.query(
            "UPDATE tbl_toptestimony SET heading = ?, para = ?  WHERE id = ?",
            [heading, para, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error("Error updating banner:", error);
        throw error;
    }
};


export const DeleteTestimonyTopModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_toptestimony WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};


// Testimony module 
export const CreateTestimonyModule = async ( testimonyimage, description, name) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_testimony (
                id INT AUTO_INCREMENT PRIMARY KEY,
                testimonyimage LONGBLOB NOT NULL, 
                description TEXT NOT NULL,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        const [result] = await db.query(
            "INSERT INTO tbl_testimony ( testimonyimage, description, name) VALUES (?, ?, ?)",
            [ testimonyimage, description, name]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting Testimony:", error);
        throw error;
    }
};


export const GetTestimonyModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_testimony");

        // Convert image blob to base64
        const updatedRows = rows.map(Testimony => {
            return {
                ...Testimony,
                testimonyimage: Testimony.testimonyimage
                    ? `data:image/jpeg;base64,${Buffer.from(Testimony.testimonyimage).toString("base64")}`
                    : null
            };
        });

        return updatedRows;
    } catch (error) {
        console.error("Error fetching Testimony:", error);
        throw error;
    }
};


export const GetTestimonyIDModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_testimony WHERE id = ?", [id]);
        if (!rows.length) return null;

        const Testimony = rows[0];

        // Convert BLOB image to base64 string
        if (Testimony.testimonyimage) {
            Testimony.testimonyimage = `data:image/jpeg;base64,${Buffer.from(Testimony.testimonyimage).toString("base64")}`;
        } else {
            Testimony.testimonyimage = null;
        }

        return Testimony;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const UpdateTestimonyModule = async (id, name, description, imageBuffer) => {
    try {
      let query = "UPDATE tbl_testimony SET name = ?, description = ?";
      const params = [ name, description];
  
      if (imageBuffer) {
        query += ", testimonyimage = ?";
        params.push(imageBuffer);
      }
  
      query += " WHERE id = ?";
      params.push(id);
  
      const [result] = await db.query(query, params);
      return result.affectedRows;
    } catch (error) {
      console.error("Error updating Testimony:", error);
      throw error;
    }
  };
  


export const DeleteTestimonyModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_testimony WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};

