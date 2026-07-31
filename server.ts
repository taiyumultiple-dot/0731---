import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "教育 AI 工具箱 API" });
  });

  // AI Prompt Execution / Teaching Assistant Endpoint
  app.post("/api/gemini/generate", async (req, res) => {
    try {
      const { prompt, systemInstruction, model } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(400).json({
          error: "GEMINI_API_KEY 未設定，請在 Settings > Secrets 設定密鑰。",
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const selectedModel = model || "gemini-3.6-flash";

      const response = await ai.models.generateContent({
        model: selectedModel,
        contents: prompt,
        config: systemInstruction
          ? { systemInstruction: systemInstruction }
          : undefined,
      });

      return res.json({ result: response.text });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      return res.status(500).json({
        error: err.message || "生成回應時發生錯誤，請稍後再試。",
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[教育 AI 工具箱] 伺服器已啟動: http://localhost:${PORT}`);
  });
}

startServer();
