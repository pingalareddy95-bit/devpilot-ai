import type {
  AssistantResponse,
  ChatMessage,
} from "../types/assistant";

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

const generateMockResponse = (content: string): string => {
  const message = content.toLowerCase();

  if (message.includes("react")) {
    return `React is a JavaScript library for building user interfaces.

For example, React Hooks allow functional components to use state and other React features.

Common Hooks include:
• useState
• useEffect
• useContext
• useMemo
• useCallback

If you share your React code, I can also explain or refactor it.`;
  }

  if (message.includes("node")) {
    return `Node.js is a JavaScript runtime built on Chrome's V8 engine.

It is commonly used for:
• REST APIs
• Microservices
• Real-time applications
• Backend services
• CLI tools

With Express.js, you can build APIs using routes, middleware, controllers, and services.`;
  }

  if (
    message.includes("error") ||
    message.includes("bug") ||
    message.includes("debug")
  ) {
    return `I can help debug the problem.

Please provide:
1. The error message
2. The relevant code
3. What you expected to happen
4. What actually happened

I'll analyze the issue and suggest a fix.`;
  }

  if (
    message.includes("api") ||
    message.includes("rest")
  ) {
    return `A REST API exposes resources through HTTP endpoints.

Typical operations are:

GET     → Retrieve data
POST    → Create data
PUT     → Replace data
PATCH   → Update data
DELETE  → Remove data

A clean Node.js API can be organized as:

Route → Controller → Service → Repository → Database`;
  }

  if (
    message.includes("sql") ||
    message.includes("database")
  ) {
    return `I can help you work with SQL and databases.

Common operations include:

• SELECT
• INSERT
• UPDATE
• DELETE
• JOIN
• GROUP BY
• ORDER BY
• Subqueries
• Window functions

Share your table structure and requirement and I can generate the query.`;
  }

  return `I understand your request.

I'm currently running in DevPilot's development mode, so this response is generated locally.

Once we connect the AI backend, this service will send your message to the actual AI model and return the generated response.

For now, you can ask me about React, Node.js, APIs, SQL, debugging, or other development topics.`;
};

export const sendAssistantMessage = async (
  content: string,
): Promise<AssistantResponse> => {
  await delay(800);

  const message: ChatMessage = {
    id: `assistant-${Date.now()}`,
    role: "assistant",
    content: generateMockResponse(content),
    createdAt: new Date().toISOString(),
  };

  return {
    message,
  };
};