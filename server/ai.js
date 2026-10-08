import { GoogleGenAI } from "@google/genai";

export async function generateReply(message) {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  const model = process.env.GEMINI_MODEL?.trim();
  if (!apiKey) throw new Error("GEMINI_API_KEY belum diisi di server.");
  if (!model) throw new Error("GEMINI_MODEL belum diisi di server.");

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model,
    contents: message,
    config: {
      httpOptions: {
        timeout: 20000,
        retryOptions: { attempts: 1 },
      },
    },
  });

  const reply = response.text?.trim();
  if (!reply) throw new Error("Model tidak mengembalikan teks jawaban.");

  return { reply, source: "ai" };
}
