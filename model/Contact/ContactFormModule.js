import db from "../../db.js";

// ContactForm module 
export const CreateContactFormModule = async (fullname, email, subject, message) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_contactform (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fullname VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                subject TEXT NOT NULL,
                message TEXT NOT NULL
            )
        `);

        const [result] = await db.query(
            "INSERT INTO tbl_contactform (fullname, email, subject, message) VALUES (?, ?, ?, ?)",
            [fullname, email, subject, message]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting Contact:", error);
        throw error;
    }
};


export const GetContactFormModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_contactform");
        return rows;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const GetContactFormIDModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_contactform WHERE id = ?", [id]);
        return rows.length ? rows[0] : null; 
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const UpdateContactFormModule = async (id, fullname, email, subject, message) => {
    try {
        const [result] = await db.query(
            "UPDATE tbl_contactform SET fullname = ?, email = ?, subject = ?, message = ?  WHERE id = ?",
            [fullname, email, subject, message, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error("Error updating banner:", error);
        throw error;
    }
};


export const DeleteContactFormModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_contactform WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};