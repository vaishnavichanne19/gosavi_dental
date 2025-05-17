import db from "../db.js";

// QuoteForm module 
export const CreateQuoteFormModule = async (fullname, email, phone, website, message) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_quoteform (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fullname VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone BIGINT NOT NULL,
                website TEXT NOT NULL,
                message TEXT NOT NULL
            )
        `);

        const [result] = await db.query(
            "INSERT INTO tbl_quoteform (fullname, email, phone, website, message) VALUES (?, ?, ?, ?, ?)",
            [fullname, email, phone, website, message]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting Quote:", error);
        throw error;
    }
};


export const GetQuoteFormModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_quoteform");
        return rows;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const GetQuoteFormIDModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_quoteform WHERE id = ?", [id]);
        return rows.length ? rows[0] : null; 
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const UpdateQuoteFormModule = async (id, fullname, email, phone, website, message) => {
    try {
        const [result] = await db.query(
            "UPDATE tbl_quoteform SET fullname = ?, email = ?, phone = ?, website = ?, message = ?  WHERE id = ?",
            [fullname, email, phone, website, message, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error("Error updating banner:", error);
        throw error;
    }
};


export const DeleteQuoteFormModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_quoteform WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};