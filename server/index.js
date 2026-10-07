import express from "express";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import { app } from "./app.js";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
if (existsSync(dist)) app.use(express.static(dist));
app.listen(3001, "127.0.0.1", () =>
  console.log("API: http://localhost:3001 • React dev: http://localhost:5173"),
);
