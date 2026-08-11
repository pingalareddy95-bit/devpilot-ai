import "dotenv/config";

const port = Number(process.env.PORT ?? 4000);

export const env = {
  port,

  nodeEnv:
    process.env.NODE_ENV ?? "development",

  aiProvider:
    process.env.AI_PROVIDER ?? "ollama",

  ollamaBaseUrl:
    process.env.OLLAMA_BASE_URL ??
    "http://127.0.0.1:11434",

  ollamaModel:
    process.env.OLLAMA_MODEL ??
    "qwen2.5-coder:3b",

  openaiApiKey:
    process.env.OPENAI_API_KEY ?? "",

  openaiModel:
    process.env.OPENAI_MODEL ?? "gpt-5",

  webOrigin:
    process.env.WEB_ORIGIN ??
    "http://localhost:5173",
};