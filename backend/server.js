import express from "express";
import cors from "cors";
import multer from "multer";
import { fal } from "@fal-ai/client";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

fal.config({
  credentials: process.env.FAL_KEY
});

app.get("/", (req, res) => {
  res.send("VibeCut backend OK");
});

app.get("/test", (req, res) => {
  res.send("API OK");
});

app.post("/generate", upload.single("audio"), async (req, res) => {
  try {
    if (!process.env.FAL_KEY) {
      return res.status(500).json({
        error: "FAL_KEY manquant dans Render Environment"
      });
    }

    const style = req.body.style || "oriental";

    const prompts = {
      oriental:
        "traditional oriental music video, Moroccan medina at night, warm lantern lights, cinematic atmosphere, arabic architecture, mystical mood, soft shadows, no text, no logo, no watermark",
      maghrebin:
        "Maghreb music video, traditional North African street, warm colors, lanterns, authentic cultural atmosphere, cinematic camera, no text, no logo, no watermark",
      desert:
        "Arabic desert music video, golden sunset, wind in sand, camel silhouettes, traditional clothing, emotional cinematic atmosphere, no text, no logo, no watermark",
      royal:
        "luxury arabic palace music video, gold patterns, traditional islamic architecture, elegant lighting, cinematic camera movement, no text, no logo, no watermark",
      cinematic:
        "cinematic oriental music video, dramatic lighting, traditional architecture, warm gold tones, professional film look, no text, no logo, no watermark"
    };

    const prompt = prompts[style] || prompts.oriental;

    const result = await fal.subscribe("fal-ai/hunyuan-video", {
      input: {
        prompt
      },
      logs: true
    });

    const videoUrl =
      result?.data?.video?.url ||
      result?.data?.video_url ||
      result?.data?.url ||
      null;

    if (!videoUrl) {
      return res.status(500).json({
        error: "Aucune vidéo reçue de fal.ai",
        raw: result.data
      });
    }

    res.json({
      videoUrl
    });

  } catch (error) {
    console.error("Erreur fal.ai:", error);

    res.status(500).json({
      error: "Erreur génération fal.ai",
      details: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("VibeCut backend running on port", PORT);
});
