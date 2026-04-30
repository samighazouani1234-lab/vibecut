import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());

app.get("/", (req, res) => {
  res.send("VibeCut backend OK");
});

app.post("/generate", upload.single("audio"), (req, res) => {
  setTimeout(() => {
    res.json({
      videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    });
  }, 2000);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`VibeCut backend running on port ${PORT}`);
});
