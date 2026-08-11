import type {
  AssistantChatResponse,
} from "../types/assistant.js";

import { env } from "../config/env.js";

interface OllamaChatResponse {
  message?: {
    role?: string;
    content?: string;
  };

  done?: boolean;

  error?: string;
}

const buildSystemPrompt = (): string => {
  return `
You are DevPilot AI, an expert software development assistant.

Your responsibilities:

- Explain programming concepts clearly.
- Write correct production-quality code.
- Debug programming errors.
- Review and refactor code.
- Help with React, TypeScript, JavaScript, Node.js, and Express.
- Help with REST APIs and backend architecture.
- Help with SQL and databases.
- Explain errors and suggest practical fixes.

Important rules:

1. Answer the exact question asked.
2. Do not confuse similarly named concepts.
3. For React questions, carefully distinguish:
   - useMemo
   - useCallback
   - React.memo
4. useMemo memoizes a computed VALUE.
5. useCallback memoizes a FUNCTION reference.
6. React.memo memoizes a COMPONENT based on its props.
7. If the user asks for code, provide working code.
8. Prefer concise explanations with useful examples.
9. When correcting code, explain why the change is required.
10. Do not invent APIs or libraries.
11. If the question is ambiguous, ask a short clarification question.
12. Use Markdown for code examples and structured explanations.

You are running locally through Ollama.
`;
};

const generateWithOllama = async (
  content: string,
): Promise<string> => {
  const response = await fetch(
    `${env.ollamaBaseUrl}/api/chat`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        model: env.ollamaModel,

        messages: [
          {
            role: "system",
            content: buildSystemPrompt(),
          },
          {
            role: "user",
            content,
          },
        ],

        stream: false,
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Ollama request failed: ${response.status} ${errorText}`,
    );
  }

  const data =
    (await response.json()) as OllamaChatResponse;

  if (data.error) {
    throw new Error(data.error);
  }

  const assistantContent =
    data.message?.content?.trim();

  if (!assistantContent) {
    throw new Error(
      "Ollama returned an empty response.",
    );
  }

  return assistantContent;
};

export const generateAssistantResponse = async (
  content: string,
): Promise<AssistantChatResponse> => {
  if (env.aiProvider !== "ollama") {
    throw new Error(
      `Unsupported AI provider: ${env.aiProvider}`,
    );
  }

  const assistantContent =
    await generateWithOllama(content);

  return {
    message: {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: assistantContent,
      createdAt:
        new Date().toISOString(),
    },
  };
};