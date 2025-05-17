import express from "express";
import route from "./Routes/BannerRoute.js";
import cors from "cors"

const app = express();
const port = 8010;

app.use(express.json());
app.use(cors());
app.use("/api", route);
app.use("/images", express.static("images"));


    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });

