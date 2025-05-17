import db from "../../db.js";

// AppointmentForm module 
export const CreateAppointmentFormModule = async (fullname, email, date, time, message) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_appointmentform (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fullname VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                date DATE NOT NULL,
                time TIME NOT NULL,
                message TEXT NOT NULL
            )
        `);

        const [result] = await db.query(
            "INSERT INTO tbl_appointmentform (fullname, email, date, time, message) VALUES (?, ?, ?, ?, ?)",
            [fullname, email, date, time, message]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting Appointment:", error);
        throw error;
    }
};


export const GetAppointmentFormModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_appointmentform");
        return rows;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const GetAppointmentFormIDModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_appointmentform WHERE id = ?", [id]);
        return rows.length ? rows[0] : null; 
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const UpdateAppointmentFormModule = async (id, fullname, email, date, time, message) => {
    try {
        const [result] = await db.query(
            "UPDATE tbl_appointmentform SET fullname = ?, email = ?, date = ?, time = ?, message = ?  WHERE id = ?",
            [fullname, email, date, time,  message, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error("Error updating banner:", error);
        throw error;
    }
};


export const DeleteAppointmentFormModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_appointmentform WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};