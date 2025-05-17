import db from "../db.js";

// dentacare top module 
export const CreateDentacareTopModule = async ( heading, description) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_headerdentacare (
                id INT AUTO_INCREMENT PRIMARY KEY,
                heading  VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Insert all 5 values including image
        const [result] = await db.query(
            "INSERT INTO tbl_headerdentacare ( heading, description) VALUES (?, ?)",
            [ heading, description]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting dentacare:", error);
        throw error;
    }
};


export const GetDentacareTopModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_headerdentacare");
        return rows;
    } catch (error) {
        console.error("Error fetching dentacare:", error);
        throw error;
    }
};


export const GetDentacareIDTopModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_headerdentacare WHERE id = ?", [id]);
        return rows.length ? rows[0] : null;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const UpDatedentacareTopModule = async (id, heading, description) => {
    try {
      const [result] = await db.query(
        "UPDATE tbl_headerdentacare SET heading = ?, description = ?  WHERE id = ?",
        [heading, description, id]
      );
      return result.affectedRows;
    } catch (error) {
      console.error("Error updating dentacare:", error);
      throw error;
    }
  };
  


export const DeleteDentacareTopModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_headerdentacare WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};


// dentacare image module 
export const CreateDentacareImageModule = async (dentacareimage) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_imagedentacare (
                id INT AUTO_INCREMENT PRIMARY KEY,
                dentacareimage LONGBLOB NOT NULL, 
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Insert all 5 values including image
        const [result] = await db.query(
            "INSERT INTO tbl_imagedentacare ( dentacareimage) VALUES (?)",
            [ dentacareimage]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting dentacare:", error);
        throw error;
    }
};


export const GetDentacareImageModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_imagedentacare");

        // Convert image blob to base64
        const updatedRows = rows.map(dentacare => {
            return {
                ...dentacare,
                dentacareimage: dentacare.dentacareimage
                    ? `data:image/jpeg;base64,${Buffer.from(dentacare.dentacareimage).toString("base64")}`
                    : null
            };
        });

        return updatedRows;
    } catch (error) {
        console.error("Error fetching dentacare:", error);
        throw error;
    }
};


export const GetDentacareIDImageModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_imagedentacare WHERE id = ?", [id]);
        if (!rows.length) return null;

        const dentacare = rows[0];

        // Convert BLOB image to base64 string
        if (dentacare.dentacareimage) {
            dentacare.dentacareimage = `data:image/jpeg;base64,${Buffer.from(dentacare.dentacareimage).toString("base64")}`;
        } else {
            dentacare.dentacareimage = null;
        }

        return dentacare;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const UpDatedentacareImageModule = async (id, imageBuffer) => {
    try {
      const query = "UPDATE tbl_imagedentacare SET dentacareimage = ? WHERE id = ?";
      const params = [imageBuffer, id];

      const [result] = await db.query(query, params);
      return result.affectedRows;
    } catch (error) {
      console.error("Error updating dentacare:", error);
      throw error;
    }
  };
  
export const DeleteDentacareImageModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_imagedentacare WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};


// dentacare module 
export const CreateDentacareModule = async (title, para) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_dentacare (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                para TEXT NOT NULL
            )
        `);

        // Insert all 5 values including image
        const [result] = await db.query(
            "INSERT INTO tbl_dentacare (title, para) VALUES (?, ?)",
            [title, para]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting dentacare:", error);
        throw error;
    }
};


export const GetDentacareModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_dentacare");
        return rows;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const GetDentacareIDModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_dentacare WHERE id = ?", [id]);
        return rows.length ? rows[0] : null; 
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const UpdateDentacareModule = async (id, title, para) => {
    try {
        const [result] = await db.query(
            "UPDATE tbl_dentacare SET title = ?, para = ?  WHERE id = ?",
            [title, para, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error("Error updating banner:", error);
        throw error;
    }
};


export const DeleteDentacareModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_dentacare WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};




