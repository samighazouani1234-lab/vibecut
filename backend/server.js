import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());

app.post("/generate", upload.single("audio"), (req, res) => {
    res.json({ videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" });
});

app.listen(3000, () => console.log("Server running"));
