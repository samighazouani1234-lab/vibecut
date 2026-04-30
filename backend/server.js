import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());

// 👉 servir le frontend
app.use(express.static("frontend"));

// 👉 route principale
app.get("/", (req, res) => {
  res.sendFile(path.resolve("frontend/index.html"));
});

// 👉 API
app.post("/generate", upload.single("audio"), async (req, res) => {
  res.json({
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
  });
});

app.listen(3000, () => console.log("Server running"));
