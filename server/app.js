import express from "express";
import { generateReply } from "./ai.js";

export const app = express();
app.use(express.json({ limit: "16kb" }));
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.post("/api/chat", async (req, res) => {
  const message = req.body?.message;
  if (typeof message !== "string" || !message.trim() || message.length > 2000) {
    return res.status(400).json({ error: "Isi pesan 1–2000 karakter." });
  }
  try {
    const result = await generateReply(message.trim());
    if (
      typeof result?.reply !== "string" ||
      !result.reply.trim() ||
      !["demo", "ai"].includes(result.source)
    ) {
      throw new Error("Invalid reply contract");
    }
    return res.json(result);
  } catch {
    return res
      .status(502)
      .json({
        error:
          "Jawaban belum tersedia. Periksa konfigurasi server lalu coba lagi.",
      });
  }
});

app.use("/api", (_req, res) =>
  res.status(404).json({ error: "Endpoint tidak ditemukan." }),
);
app.use((err, _req, res, _next) => {
  const status = err.status === 413 ? 413 : err.status === 400 ? 400 : 500;
  res
    .status(status)
    .json({
      error:
        status === 413
          ? "Pesan terlalu besar."
          : status === 400
            ? "Format JSON tidak valid."
            : "Terjadi kesalahan server.",
    });
});
