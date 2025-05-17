import db from "../db.js";

// Achievement top module 
export const CreateAchievementTopModule = async (title, para) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_topachievement (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                para TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Insert banner data
        const [result] = await db.query(
            "INSERT INTO tbl_topachievement (title, para) VALUES (?, ?)",
            [title, para]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting banner:", error);
        throw error;
    }
};

export const GetAchievementTopModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_topachievement");
        return rows;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


// ✅ Get Banner by ID Card1
export const GetIdAchievementTopModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_topachievement WHERE id = ?", [id]);
        return rows.length ? rows[0] : null; 
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};

// ✅ Update Banner by ID Card1
export const UpdateAchievementTopModule = async (id, title, para) => {
    try {
        const [result] = await db.query(
            "UPDATE tbl_topachievement SET title = ?, para = ? WHERE id = ?",
            [title, para, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error("Error updating banner:", error);
        throw error;
    }
};


export const DeleteAchievementTopModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_topachievement WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};

// achievement module 
export const CreateAchievementModule = async (count, description) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_achievement (
                id INT AUTO_INCREMENT PRIMARY KEY,
                count VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Insert banner data
        const [result] = await db.query(
            "INSERT INTO tbl_achievement (count, description) VALUES (?, ?)",
            [count, description]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting banner:", error);
        throw error;
    }
};

export const GetAchievementModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_achievement");
        return rows;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


// ✅ Get Banner by ID Card1
export const GetIdAchievementModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_achievement WHERE id = ?", [id]);
        return rows.length ? rows[0] : null; 
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};

// ✅ Update Banner by ID Card1
export const UpdateAchievementModule = async (id, count, description) => {
    try {
        const [result] = await db.query(
            "UPDATE tbl_achievement SET count = ?, description = ? WHERE id = ?",
            [count, description, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error("Error updating banner:", error);
        throw error;
    }
};


export const DeleteAchievementModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_achievement WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};
