import express from "express";
import cors from "cors";
import multer from "multer";
import RunwayML from "@runwayml/sdk";

const app = express();
const upload = multer({ dest: "uploads/" });

const runway = new RunwayML({
  apiKey: process.env.RUNWAYML_API_SECRET
});

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
    const style = req.body.style || "oriental";

    const prompts = {
      oriental: "traditional oriental music video, Moroccan medina at night, warm lantern lights, cinematic atmosphere, arabic architecture, mystical mood, no text",
      maghrebin: "Maghreb music video, traditional North African street, warm colors, lanterns, authentic atmosphere, cinematic camera, no text",
      desert: "Arabic desert music video, golden sunset, wind in sand, camel silhouettes, emotional cinematic atmosphere, no text",
      royal: "luxury arabic palace music video, gold patterns, traditional islamic architecture, elegant lighting, no text",
      cinematic: "cinematic oriental music video, dramatic lighting, traditional architecture, warm gold tones, professional film look, no text"
    };

    const promptText = prompts[style] || prompts.oriental;

    const task = await runway.textToVideo
      .create({
        model: "gen4.5",
        promptText: promptText,
        ratio: "1280:720",
        duration: 5
      })
      .waitForTaskOutput({
        timeout: 300000
      });

    res.json({
      videoUrl: task.output?.[0]
    });

  } catch (error) {
    console.error("Erreur Runway:", error);

    res.status(500).json({
      error: "Erreur génération Runway",
      details: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("VibeCut backend running on port", PORT);
});
