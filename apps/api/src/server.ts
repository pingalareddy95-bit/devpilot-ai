import express from "express";
import cors from "cors";

import { env } from "./config/env.js";
import assistantRoutes from "./routes/assistantRoutes.js";

const app = express();

app.use(
  cors({
    origin: env.webOrigin,
  }),
);

app.use(express.json({ limit: "1mb" }));

// ============================================================
// HEALTH CHECK
// ============================================================

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "devpilot-api",
  });
});

// ============================================================
// ASSISTANT ROUTES
// ============================================================

app.use("/api/assistant", assistantRoutes);

// ============================================================
// SERVER
// ============================================================

const server = app.listen(
  env.port,
  "127.0.0.1",
  () => {
    console.log(
      `DevPilot API running on http://127.0.0.1:${env.port}`,
    );
  },
);

server.on("error", (error) => {
  console.error("DevPilot API server error:", error);
});

server.on("listening", () => {
  const address = server.address();

  console.log("DevPilot API listening:", address);
});