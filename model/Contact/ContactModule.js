import db from "../../db.js";

// contact top module 
export const CreateContactTopModule = async (heading) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_topcontact (
                id INT AUTO_INCREMENT PRIMARY KEY,
                heading VARCHAR(255) NOT NULL
            )
        `);

        const [result] = await db.query(
            "INSERT INTO tbl_topcontact (heading) VALUES (?)",
            [heading]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting service:", error);
        throw error;
    }
};


export const GetContactTopModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_topcontact");
        return rows;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const GetContactTopIDModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_topcontact WHERE id = ?", [id]);
        return rows.length ? rows[0] : null; 
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const UpdateContactTopModule = async (id, heading) => {
    try {
        const [result] = await db.query(
            "UPDATE tbl_topcontact SET heading = ? WHERE id = ?",
            [heading, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error("Error updating banner:", error);
        throw error;
    }
};


export const DeleteContactTopModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_topcontact WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};

// contact module 
export const CreateContactModule = async (heading, para) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_contact (
                id INT AUTO_INCREMENT PRIMARY KEY,
                heading VARCHAR(255) NOT NULL,
                para TEXT NOT NULL
            )
        `);

        const [result] = await db.query(
            "INSERT INTO tbl_contact (heading, para) VALUES (?, ?)",
            [heading, para]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting service:", error);
        throw error;
    }
};


export const GetContactModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_contact");
        return rows;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const GetContactIDModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_contact WHERE id = ?", [id]);
        return rows.length ? rows[0] : null; 
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const UpdateContactModule = async (id, heading, para) => {
    try {
        const [result] = await db.query(
            "UPDATE tbl_contact SET heading = ?, para = ?  WHERE id = ?",
            [heading, para, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error("Error updating banner:", error);
        throw error;
    }
};


export const DeleteContactModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_contact WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};