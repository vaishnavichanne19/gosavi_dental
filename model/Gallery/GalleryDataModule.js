import db from "../../db.js";

export const CreateGalleryDataModule = async (heading, gallerydataimage) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_gallerydata (
                id INT AUTO_INCREMENT PRIMARY KEY,
                heading VARCHAR(255) NOT NULL,
                gallerydataimage LONGBLOB NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Insert GalleryData data
        const [result] = await db.query(
            "INSERT INTO tbl_gallerydata (heading, gallerydataimage) VALUES (?, ?)",
            [heading, gallerydataimage]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting GalleryData:", error);
        throw error;
    }
};

export const GetGalleryDataModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_gallerydata");
             // Convert image blob to base64
             const updatedRows = rows.map(GalleryData => {
                return {
                    ...GalleryData,
                    gallerydataimage: GalleryData.gallerydataimage
                        ? `data:image/jpeg;base64,${Buffer.from(GalleryData.gallerydataimage).toString("base64")}`
                        : null
                };
            });
    
            return updatedRows;
    } catch (error) {
        console.error("Error fetching GalleryData:", error);
        throw error;
    }
};


// ✅ Get GalleryData by ID Module
export const GetGalleryDataIdModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_gallerydata WHERE id = ?", [id]);
        if (!rows.length) return null;

        const GalleryData = rows[0];

        // Convert BLOB image to base64 string
        if (GalleryData.gallerydataimage) {
            GalleryData.gallerydataimage = `data:image/jpeg;base64,${Buffer.from(GalleryData.gallerydataimage).toString("base64")}`;
        } else {
            GalleryData.gallerydataimage = null;
        }

        return GalleryData;
    } catch (error) {
        console.error("Error fetching GalleryData:", error);
        throw error;
    }
};

// ✅ Update GalleryData by ID Module
export const UpdateGalleryDataModule = async (id, heading, imageBuffer) => {
    try {
         let query = "UPDATE tbl_gallerydata SET heading = ?";
         const params = [heading];
         
           if (imageBuffer) {
                 query += ", gallerydataimage = ?";
                 params.push(imageBuffer);
               }
           
               query += " WHERE id = ?";
               params.push(id);
           
               const [result] = await db.query(query, params);
               return result.affectedRows;

    } catch (error) {
        console.error("Error updating GalleryData:", error);
        throw error;
    }
};


export const DeleteGalleryDataModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_gallerydata WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting GalleryData:", error);
        throw error;
    }
};