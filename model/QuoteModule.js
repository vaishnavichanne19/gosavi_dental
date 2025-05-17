import db from "../db.js";

// Quote module 
export const CreateQuoteModule = async (heading, para) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_quote (
                id INT AUTO_INCREMENT PRIMARY KEY,
                heading VARCHAR(255) NOT NULL,
                para TEXT NOT NULL
            )
        `);

        const [result] = await db.query(
            "INSERT INTO tbl_quote (heading, para) VALUES (?, ?)",
            [heading, para]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting Blog:", error);
        throw error;
    }
};


export const GetQuoteModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_quote");
        return rows;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const GetQuoteIDModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_quote WHERE id = ?", [id]);
        return rows.length ? rows[0] : null; 
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const UpdateQuoteModule = async (id, heading, para) => {
    try {
        const [result] = await db.query(
            "UPDATE tbl_quote SET heading = ?, para = ?  WHERE id = ?",
            [heading, para, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error("Error updating banner:", error);
        throw error;
    }
};


export const DeleteQuoteModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_quote WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};