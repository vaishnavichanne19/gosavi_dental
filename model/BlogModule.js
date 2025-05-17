import db from "../db.js";

// Blog top module 
export const CreateBlogTopModule = async (heading, para) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_topblog (
                id INT AUTO_INCREMENT PRIMARY KEY,
                heading VARCHAR(255) NOT NULL,
                para TEXT NOT NULL
            )
        `);

        // Insert all 5 values including image
        const [result] = await db.query(
            "INSERT INTO tbl_topblog (heading, para) VALUES (?, ?)",
            [heading, para]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting Blog:", error);
        throw error;
    }
};


export const GetBlogTopModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_topblog");
        return rows;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const GetBlogTopIDModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_topblog WHERE id = ?", [id]);
        return rows.length ? rows[0] : null; 
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const UpdateBlogTopModule = async (id, heading, para) => {
    try {
        const [result] = await db.query(
            "UPDATE tbl_topblog SET heading = ?, para = ?  WHERE id = ?",
            [heading, para, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error("Error updating banner:", error);
        throw error;
    }
};


export const DeleteBlogTopModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_topblog WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};


// Blog module 
export const CreateBlogModule = async ( blogimage, date, title, description ) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_blog (
                id INT AUTO_INCREMENT PRIMARY KEY,
                blogimage LONGBLOB NOT NULL,
                date DATE NOT NULL, 
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        const [result] = await db.query(
            "INSERT INTO tbl_blog (blogimage, date, title, description) VALUES (?, ?, ?, ?)",
            [ blogimage, date, title, description ]
        );

        return result.insertId;
    } catch (error) {
        console.error("Error inserting Blog:", error);
        throw error;
    }
};


export const GetBlogModule = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_blog");

        // Convert image blob to base64
        const updatedRows = rows.map(Blog => {
            return {
                ...Blog,
                blogimage: Blog.blogimage
                    ? `data:image/jpeg;base64,${Buffer.from(Blog.blogimage).toString("base64")}`
                    : null
            };
        });

        return updatedRows;
    } catch (error) {
        console.error("Error fetching Blog:", error);
        throw error;
    }
};


export const GetBlogIDModule = async (id) => {
    try {
        const [rows] = await db.query("SELECT * FROM tbl_blog WHERE id = ?", [id]);
        if (!rows.length) return null;

        const Blog = rows[0];

        // Convert BLOB image to base64 string
        if (Blog.blogimage) {
            Blog.blogimage = `data:image/jpeg;base64,${Buffer.from(Blog.blogimage).toString("base64")}`;
        } else {
            Blog.blogimage = null;
        }

        return Blog;
    } catch (error) {
        console.error("Error fetching banner:", error);
        throw error;
    }
};


export const UpdateBlogModule = async (id, title, date, description, imageBuffer) => {
    try {
      let query = "UPDATE tbl_blog SET title = ?, date =  ?, description = ?";
      const params = [title, date, description];
  
      if (imageBuffer) {
        query += ", blogimage = ?";
        params.push(imageBuffer);
      }
  
      query += " WHERE id = ?";
      params.push(id);
  
      const [result] = await db.query(query, params);
      return result.affectedRows;
    } catch (error) {
      console.error("Error updating Blog:", error);
      throw error;
    }
  };
  
export const DeleteBlogModule = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM tbl_blog WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};

