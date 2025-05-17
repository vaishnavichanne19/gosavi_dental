import db from "../db.js";

export const CreateBannerModule = async (heading, description, bannerimage) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_banner (
                id INT AUTO_INCREMENT PRIMARY KEY,
                heading VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                bannerimage LONGBLOB NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Insert banner data
        const [result] = await db.query(
            "INSERT INTO tbl_banner (heading, description, bannerimage) VALUES (?, ?, ?)",
            [heading, description, bannerimage]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting banner:", error);
        throw error;
    }
};

export const GetBannerModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_banner");
             // Convert image blob to base64
             const updatedRows = rows.map(banner => {
                return {
                    ...banner,
                    bannerimage: banner.bannerimage
                        ? `data:image/jpeg;base64,${Buffer.from(banner.bannerimage).toString("base64")}`
                        : null
                };
            });
    
            return updatedRows;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


// ✅ Get Banner by ID Module
export const GetBannerIdModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_banner WHERE id = ?", [id]);
        if (!rows.length) return null;

        const banner = rows[0];

        // Convert BLOB image to base64 string
        if (banner.bannerimage) {
            banner.bannerimage = `data:image/jpeg;base64,${Buffer.from(banner.bannerimage).toString("base64")}`;
        } else {
            banner.bannerimage = null;
        }

        return banner;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};

// ✅ Update Banner by ID Module
export const UpdateBannerModule = async (id, heading, description, imageBuffer) => {
    try {
         let query = "UPDATE tbl_banner SET heading = ?, description = ?";
         const params = [heading, description];
         
           if (imageBuffer) {
                 query += ", bannerimage = ?";
                 params.push(imageBuffer);
               }
           
               query += " WHERE id = ?";
               params.push(id);
           
               const [result] = await db.query(query, params);
               return result.affectedRows;

    } catch (error) {
        console.error("Error updating banner:", error);
        throw error;
    }
};


export const DeleteBannerModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_banner WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};

// Emergency Cases module 

export const CreateBannerCard1 = async (heading, description, number) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_cases (
                id INT AUTO_INCREMENT PRIMARY KEY,
                heading VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                number INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Insert banner data
        const [result] = await db.query(
            "INSERT INTO tbl_cases (heading, description, number) VALUES (?, ?, ?)",
            [heading, description, number]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting banner:", error);
        throw error;
    }
};

export const GetBannerCard1Module = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_cases");
        return rows;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


// ✅ Get Banner by ID Card1
export const GetBannerIdCard1 = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_cases WHERE id = ?", [id]);
        return rows.length ? rows[0] : null; 
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};

// ✅ Update Banner by ID Card1
export const UpdateBannerCard1 = async (id, heading, description, number) => {
    try {
        const [result] = await db.query(
            "UPDATE tbl_cases SET heading = ?, description = ?, number = ? WHERE id = ?",
            [heading, description, number, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error("Error updating banner:", error);
        throw error;
    }
};


export const DeleteBannerCard1 = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_cases WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};

// Opening Hours Top module 
export const CreateBannerTopCard2 = async (heading) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_tophours (
                id INT AUTO_INCREMENT PRIMARY KEY,
                heading VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Insert banner data
        const [result] = await db.query(
            "INSERT INTO tbl_tophours (heading) VALUES (?)",
            [heading]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting banner:", error);
        throw error;
    }
};

export const GetBannerTopCard2Module = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_tophours");
        return rows;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


// ✅ Get Banner by ID TopCard2
export const GetBannerIdTopCard2 = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_tophours WHERE id = ?", [id]);
        return rows.length ? rows[0] : null; 
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};

// ✅ Update Banner by ID TopCard2
export const UpdateBannerTopCard2 = async (id, heading) => {
    try {
        const [result] = await db.query(
            "UPDATE tbl_tophours SET heading = ? WHERE id = ?",
            [heading, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error("Error updating banner:", error);
        throw error;
    }
};


export const DeleteBannerTopCard2 = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_tophours WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};


// Opening Hours module 
export const CreateBannerCard2 = async ( day, time) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_hours (
                id INT AUTO_INCREMENT PRIMARY KEY,
                day VARCHAR(255) NOT NULL,
                time VARCHAR (100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Insert banner data
        const [result] = await db.query(
            "INSERT INTO tbl_hours ( day, time) VALUES (?, ?)",
            [ day, time]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting banner:", error);
        throw error;
    }
};

export const GetBannerCard2Module = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_hours");
        return rows;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


// ✅ Get Banner by ID Card2
export const GetBannerIdCard2 = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_hours WHERE id = ?", [id]);
        return rows.length ? rows[0] : null; 
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};

// ✅ Update Banner by ID Card2
export const UpdateBannerCard2 = async (id,day, time) => {
    try {
        const [result] = await db.query(
            "UPDATE tbl_hours SET day = ?, time = ? WHERE id = ?",
            [day, time, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error("Error updating banner:", error);
        throw error;
    }
};


export const DeleteBannerCard2 = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_hours WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};

