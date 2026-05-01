import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("VibeCut backend OK");
});

app.get("/test", (req, res) => {
  res.send("API OK");
});

app.post("/generate", upload.single("audio"), async (req, res) => {
  try {
    console.log("Audio reçu:", req.file?.originalname);
    console.log("Style:", req.body.style);

    res.json({
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur serveur"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("VibeCut backend running on port", PORT);
});
