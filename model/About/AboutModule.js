import db from "../../db.js";

export const CreateAboutModule = async ( title1, description1, aboutimage, title2, description2, title3, description3) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_about (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title1  VARCHAR(255) NOT NULL,
                description1 TEXT NOT NULL,
                aboutimage LONGBLOB NOT NULL, 
                title2  VARCHAR(255) NOT NULL,
                description2 TEXT NOT NULL,
                title3  VARCHAR(255) NOT NULL,
                description3 TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Insert all 5 values including image
        const [result] = await db.query(
            "INSERT INTO tbl_about ( title1, description1, aboutimage, title2, description2, title3, description3) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [ title1, description1, aboutimage, title2, description2, title3, description3]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting About:", error);
        throw error;
    }
};


export const GetAboutModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_about");

        // Convert image blob to base64
        const updatedRows = rows.map(About => {
            return {
                ...About,
                aboutimage: About.aboutimage
                    ? `data:image/jpeg;base64,${Buffer.from(About.aboutimage).toString("base64")}`
                    : null
            };
        });

        return updatedRows;
    } catch (error) {
        console.error("Error fetching About:", error);
        throw error;
    }
};


export const GetAboutIDModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_about WHERE id = ?", [id]);
        if (!rows.length) return null;

        const About = rows[0];

        // Convert BLOB image to base64 string
        if (About.aboutimage) {
            About.aboutimage = `data:image/jpeg;base64,${Buffer.from(About.aboutimage).toString("base64")}`;
        } else {
            About.aboutimage = null;
        }

        return About;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const UpdateAboutModule = async (id, title1, description1, imageBuffer, title2, description2, title3, description3) => {
    try {
      let query = "UPDATE tbl_about SET title1 = ?, description1 = ?, title2 = ?, description2 = ?, title3 = ?, description3 = ?";
      const params = [title1, description1, title2, description2, title3, description3];
  
      if (imageBuffer) {
        query += ", aboutimage = ?";
        params.push(imageBuffer);
      }
  
      query += " WHERE id = ?";
      params.push(id);
  
      const [result] = await db.query(query, params);
      return result.affectedRows;
    } catch (error) {
      console.error("Error updating About:", error);
      throw error;
    }
  };
  


export const DeleteAboutModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_about WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};
