import db from "../db.js";

// HomeAppointmentForm module 
export const CreateHomeAppointmentFormModule = async (department, fullname, email, date, time, phone) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_homeappointmentform (
                id INT AUTO_INCREMENT PRIMARY KEY,
                department VARCHAR(100) NOT NULL,
                fullname VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                date DATE NOT NULL,
                time TIME NOT NULL,
                phone BIGINT NOT NULL
            )
        `);

        const [result] = await db.query(
            "INSERT INTO tbl_homeappointmentform (department, fullname, email, date, time, phone) VALUES (?, ?, ?, ?, ?, ?)",
            [department, fullname, email, date, time, phone]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting Appointment:", error);
        throw error;
    }
};


export const GetHomeAppointmentFormModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_homeappointmentform");
        return rows;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const GetHomeAppointmentFormIDModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_homeappointmentform WHERE id = ?", [id]);
        return rows.length ? rows[0] : null; 
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const UpdateHomeAppointmentFormModule = async (id, department, fullname, email, date, time, phone) => {
    try {
        const [result] = await db.query(
            "UPDATE tbl_homeappointmentform SET department = ?, fullname = ?, email = ?, date = ?, time = ?, phone = ?  WHERE id = ?",
            [department, fullname, email, date, time, phone, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error("Error updating banner:", error);
        throw error;
    }
};


export const DeleteHomeAppointmentFormModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_homeappointmentform WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};