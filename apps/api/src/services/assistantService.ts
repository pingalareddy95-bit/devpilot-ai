import type {
  AssistantChatResponse,
  AssistantMessage,
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
- Explain programming concepts clearly and accurately.
- Write correct, production-quality code.
- Debug programming errors.
- Review and refactor code.
- Help with React, TypeScript, JavaScript, Node.js, and Express.
- Help with REST APIs and backend architecture.
- Help with SQL and databases.
- Explain errors and suggest practical fixes.
- Help developers prepare for technical interviews.

Important rules:

1. Answer the exact question asked.

2. Use the previous conversation context when answering follow-up questions.

3. Do not repeat information unnecessarily.

4. Do not confuse similarly named concepts.

5. For React questions, carefully distinguish:
   - useMemo
   - useCallback
   - React.memo

6. useMemo memoizes a computed VALUE.

7. useCallback memoizes a FUNCTION reference.

8. React.memo memoizes a COMPONENT based on its PROPS.

9. If the user asks for code, provide working code.

10. Prefer practical examples when they improve understanding.

11. When correcting code, explain why the change is required.

12. Do not invent APIs, libraries, functions, or framework behavior.

13. If you are unsure about a technical detail, say so instead of presenting incorrect information as fact.

14. For coding questions, prefer modern JavaScript and TypeScript practices unless the user asks for an older approach.

15. Keep explanations concise but complete.

16. Use Markdown for code examples and structured explanations.

17. Preserve the user's existing terminology and context when answering follow-up questions.

18. If the question is ambiguous and cannot be answered reliably from the conversation context, ask a short clarification question.

You are running locally through Ollama.
`;
};

const generateWithOllama = async (
  content: string,
  conversation: AssistantMessage[] = [],
): Promise<string> => {
  const messages: AssistantMessage[] = [
    ...conversation,
    {
      role: "user",
      content,
    },
  ];

  const response = await fetch(`${env.ollamaBaseUrl}/api/chat`, {
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
        ...messages,
      ],
      stream: false,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(`Ollama request failed: ${response.status} ${errorText}`);
  }

  const data = (await response.json()) as OllamaChatResponse;

  if (data.error) {
    throw new Error(data.error);
  }

  const assistantContent = data.message?.content?.trim();

  if (!assistantContent) {
    throw new Error("Ollama returned an empty response.");
  }

  return assistantContent;
};

export const generateAssistantResponse = async (
  content: string,
  conversation: AssistantMessage[] = [],
): Promise<AssistantChatResponse> => {
  if (env.aiProvider !== "ollama") {
    throw new Error(`Unsupported AI provider: ${env.aiProvider}`);
  }

  const assistantContent = await generateWithOllama(content, conversation);

  return {
    message: {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: assistantContent,
      createdAt: new Date().toISOString(),
    },
  };
};
