import db from "../db.js";

// Price top module 
export const CreatePriceTopModule = async (heading, para) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_topPrice (
                id INT AUTO_INCREMENT PRIMARY KEY,
                heading VARCHAR(255) NOT NULL,
                para TEXT NOT NULL
            )
        `);

        // Insert all 5 values including image
        const [result] = await db.query(
            "INSERT INTO tbl_topPrice (heading, para) VALUES (?, ?)",
            [heading, para]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting Price:", error);
        throw error;
    }
};


export const GetPriceTopModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_topPrice");
        return rows;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const GetPriceTopIDModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_topPrice WHERE id = ?", [id]);
        return rows.length ? rows[0] : null; 
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const UpdatePriceTopModule = async (id, heading, para) => {
    try {
        const [result] = await db.query(
            "UPDATE tbl_topPrice SET heading = ?, para = ?  WHERE id = ?",
            [heading, para, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error("Error updating banner:", error);
        throw error;
    }
};


export const DeletePriceTopModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_topPrice WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};


// Price module 
export const CreatePriceModule = async (title, price, description) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_pricedata (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                price VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Insert all 5 values including image
        const [result] = await db.query(
            "INSERT INTO tbl_pricedata (title, price, description) VALUES (?, ?, ?)",
            [title, price, description]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting Price:", error);
        throw error;
    }
};


export const GetPriceModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_pricedata");
        return rows;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const GetPriceIDModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_pricedata WHERE id = ?", [id]);
        return rows.length ? rows[0] : null; 
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const UpdatePriceModule = async (id, title, price, description) => {
    try {
        const [result] = await db.query(
            "UPDATE tbl_pricedata SET title = ?, price = ?, description = ?  WHERE id = ?",
            [title, price, description, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error("Error updating banner:", error);
        throw error;
    }
};


export const DeletePriceModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_pricedata WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};