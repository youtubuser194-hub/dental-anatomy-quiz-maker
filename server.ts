import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// AI Quiz Generation Endpoint
app.post("/api/generate-quiz", async (req, res) => {
  try {
    const { topic, difficulty, questionCount = 5, questionType = "Mixed" } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const count = Math.min(Math.max(Number(questionCount) || 5, 3), 15);

    const prompt = `Generate a high-yield dental anatomy quiz with exactly ${count} questions.
Topic: "${topic}"
Target Level / Difficulty: "${difficulty || "Intermediate (Dental Student)"}"
Format Style: "${questionType}"

Make sure questions test core dental concepts such as:
- Tooth morphology (cusps, grooves, roots, pulp chambers, ridges, embrasures)
- Tooth numbering systems (Universal Numbering System #1-32, FDI World Dental Federation notation #11-48, Primary letters A-T)
- Tooth histology and embryology (Enamel, Dentin, Pulp, Cementum, Dentinoenamel Junction, Periodontal Ligament, Alveolar Bone)
- Clinical dental scenarios (caries depth, pulpitis, eruption ages, occlusal relationships)

Each question MUST include:
1. Clear, precise question text.
2. 4 plausible multiple choice options (A, B, C, D).
3. The exact 0-based index of the correct answer (0, 1, 2, or 3).
4. Detailed high-yield anatomical explanation explaining why the correct option is right and why others are wrong.
5. Anatomical focus term (e.g. "Cusp of Carabelli", "Mandibular First Molar", "Periodontal Ligament", "Universal Tooth #14").
6. A quick clinical mnemonic or practical tip.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert Professor of Dental Anatomy, Histology, and Board Exam Prep (INBDE/NBDHE). Provide rigorous, accurate, high-yield questions with clean JSON formatting.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: "Unique identifier like q_1, q_2" },
              question: { type: Type.STRING, description: "The quiz question text" },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Array of exactly 4 choices",
              },
              correctAnswerIndex: { type: Type.INTEGER, description: "Index 0 to 3 of the correct answer" },
              explanation: { type: Type.STRING, description: "In-depth rationale and anatomy details" },
              category: { type: Type.STRING, description: "Main category e.g. Tooth Morphology, Numbering, Histology" },
              anatomicalFocus: { type: Type.STRING, description: "Specific tooth or anatomical structure name" },
              clinicalTip: { type: Type.STRING, description: "Short high-yield mnemonic or board tip" },
            },
            required: ["id", "question", "options", "correctAnswerIndex", "explanation", "category"],
          },
        },
      },
    });

    const text = response.text?.trim() || "[]";
    let questions = JSON.parse(text);

    // Ensure IDs exist
    questions = questions.map((q: any, index: number) => ({
      ...q,
      id: q.id || `gen_${Date.now()}_${index}`,
      options: Array.isArray(q.options) && q.options.length === 4 ? q.options : ["Option A", "Option B", "Option C", "Option D"],
      correctAnswerIndex: typeof q.correctAnswerIndex === "number" && q.correctAnswerIndex >= 0 && q.correctAnswerIndex <= 3 ? q.correctAnswerIndex : 0,
    }));

    res.json({ questions });
  } catch (error: any) {
    console.error("Error generating quiz:", error);
    res.status(500).json({
      error: "Failed to generate quiz with AI",
      details: error.message || "An unexpected error occurred",
    });
  }
});

// AI Explanation & Deep Clinical Tutor Endpoint
app.post("/api/ai-explain", async (req, res) => {
  try {
    const { question, userAnswer, correctAnswer, topic, anatomicalFocus } = req.body;

    const prompt = `A dental student is practicing a quiz question on "${topic || "Dental Anatomy"}".
Question: "${question}"
Student Answer: "${userAnswer}"
Correct Answer: "${correctAnswer}"
Anatomical Focus: "${anatomicalFocus || "Dental Structure"}"

Provide an engaging, highly educational breakdown for a dental student:
1. Key Anatomical Principles: Explain the fundamental anatomy involved.
2. Why "${correctAnswer}" is correct.
3. Analysis of the mistake if the student answered differently.
4. High-Yield Board Exam Mnemonic or Visual Memory Trick.
5. Clinical Relevance in Dental Practice (e.g., cavity prep, root canal location, occlusion).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an encouraging, world-class Dental Anatomy & Board Review AI Tutor. Format response in concise Markdown with bullet points and bold highlights.",
      },
    });

    res.json({ explanation: response.text || "No explanation returned." });
  } catch (error: any) {
    console.error("Error in AI explanation:", error);
    res.status(500).json({ error: "Failed to fetch AI explanation." });
  }
});

// Start Express + Vite Dev or Production Server
async function startServer() {
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
    console.log(`Dental Anatomy Quiz Server running on http://localhost:${PORT}`);
  });
}

startServer();
