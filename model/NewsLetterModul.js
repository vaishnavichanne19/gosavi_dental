import db from "../db.js";

// newsletter module 
export const CreateNewsModule = async (heading, para) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_news (
                id INT AUTO_INCREMENT PRIMARY KEY,
                heading VARCHAR(255) NOT NULL,
                para TEXT NOT NULL
            )
        `);

        // Insert all 5 values including image
        const [result] = await db.query(
            "INSERT INTO tbl_news (heading, para) VALUES (?, ?)",
            [heading, para]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting Price:", error);
        throw error;
    }
};


export const GetNewsModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_news");
        return rows;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const GetNewsIDModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_news WHERE id = ?", [id]);
        return rows.length ? rows[0] : null; 
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const UpdateNewsModule = async (id, heading, para) => {
    try {
        const [result] = await db.query(
            "UPDATE tbl_news SET heading = ?, para = ?  WHERE id = ?",
            [heading, para, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error("Error updating banner:", error);
        throw error;
    }
};


export const DeleteNewsModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_news WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};