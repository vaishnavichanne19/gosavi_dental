import db from "../db.js";

export const CreateGalleryModule = async (galleryimage) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_gallery (
                id INT AUTO_INCREMENT PRIMARY KEY,
                galleryimage LONGBLOB NOT NULL, 
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        const [result] = await db.query(
            "INSERT INTO tbl_gallery (galleryimage) VALUES (?)",
            [galleryimage]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting Gallery:", error);
        throw error;
    }
};


export const GetGalleryModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_gallery");

        // Convert image blob to base64
        const updatedRows = rows.map(Gallery => {
            return {
                ...Gallery,
                galleryimage: Gallery.galleryimage
                    ? `data:image/jpeg;base64,${Buffer.from(Gallery.galleryimage).toString("base64")}`
                    : null
            };
        });

        return updatedRows;
    } catch (error) {
        console.error("Error fetching Gallery:", error);
        throw error;
    }
};


export const GetGalleryIDModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_gallery WHERE id = ?", [id]);
        if (!rows.length) return null;

        const Gallery = rows[0];

        // Convert BLOB image to base64 string
        if (Gallery.galleryimage) {
            Gallery.galleryimage = `data:image/jpeg;base64,${Buffer.from(Gallery.galleryimage).toString("base64")}`;
        } else {
            Gallery.galleryimage = null;
        }

        return Gallery;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const UpdateGalleryModule = async (id, imageBuffer) => {
    try {
      const query = "UPDATE tbl_gallery SET galleryimage = ? WHERE id = ?";
      const params = [imageBuffer, id];
  
      const [result] = await db.query(query, params);
      return result.affectedRows;
    } catch (error) {
      console.error("Error updating Gallery:", error);
      throw error;
    }
  };
  

export const DeleteGalleryModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_gallery WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};

