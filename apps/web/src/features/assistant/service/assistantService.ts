import type {
  AssistantResponse,
  ChatMessage,
} from "../types/assistant";

const delay = (
  milliseconds: number,
) =>
  new Promise<void>((resolve) => {
    setTimeout(
      resolve,
      milliseconds,
    );
  });

const generateMockResponse = (
  content: string,
): string => {
  const message =
    content.toLowerCase();

  // ============================================================
  // REACT
  // ============================================================

  if (message.includes("react")) {
    return `React is a JavaScript library for building user interfaces.

React Hooks allow functional components to use React features such as state, effects, context, and memoization.

Common Hooks include:

• useState
• useEffect
• useContext
• useMemo
• useCallback

If you share your React code, I can also explain, optimize, or refactor it.`;
  }

  // ============================================================
  // NODE.JS
  // ============================================================

  if (
    message.includes("node") ||
    message.includes("nodejs")
  ) {
    return `Node.js is a JavaScript runtime built on Chrome's V8 engine.

It is commonly used for:

• REST APIs
• Microservices
• Real-time applications
• Backend services
• CLI tools

With Express.js, a typical backend can be organized as:

Route → Controller → Service → Repository → Database`;
  }

  // ============================================================
  // DEBUGGING
  // ============================================================

  if (
    message.includes("error") ||
    message.includes("bug") ||
    message.includes("debug") ||
    message.includes("exception")
  ) {
    return `I can help debug the problem.

Please provide:

1. The error message
2. The relevant code
3. What you expected to happen
4. What actually happened

I'll analyze the issue and suggest a fix.`;
  }

  // ============================================================
  // API
  // ============================================================

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

  // ============================================================
  // SQL / DATABASE
  // ============================================================

  if (
    message.includes("sql") ||
    message.includes("database") ||
    message.includes("mysql") ||
    message.includes("postgres")
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

  // ============================================================
  // TYPESCRIPT
  // ============================================================

  if (
    message.includes("typescript") ||
    message.includes("type")
  ) {
    return `TypeScript adds static typing to JavaScript.

Common TypeScript features include:

• Interfaces
• Types
• Generics
• Union types
• Utility types
• Enums
• Type narrowing

For React applications, TypeScript helps catch many errors during development before the application reaches production.`;
  }

  // ============================================================
  // AWS
  // ============================================================

  if (
    message.includes("aws") ||
    message.includes("lambda") ||
    message.includes("s3") ||
    message.includes("ec2")
  ) {
    return `AWS provides cloud services for building and running applications.

Common developer services include:

• EC2 → Virtual servers
• S3 → Object storage
• Lambda → Serverless functions
• RDS → Managed relational databases
• DynamoDB → NoSQL database
• CloudWatch → Monitoring and logs

For a modern backend, these services can be combined to build scalable cloud applications.`;
  }

  // ============================================================
  // DEFAULT
  // ============================================================

  return `I understand your request.

I'm currently running in DevPilot's development mode, so this response is generated locally.

The next step will be connecting this service to the real DevPilot AI backend.

For now, you can ask me about:

• React
• Node.js
• TypeScript
• APIs
• SQL
• AWS
• Debugging

You can also paste code and we'll eventually use the AI backend to analyze it.`;
};

// ============================================================
// SEND ASSISTANT MESSAGE
// ============================================================

export const sendAssistantMessage =
  async (
    content: string,
  ): Promise<AssistantResponse> => {
    await delay(800);

    const message: ChatMessage = {
      id: `assistant-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 7)}`,

      role: "assistant",

      content:
        generateMockResponse(
          content,
        ),

      createdAt:
        new Date().toISOString(),
    };

    return {
      message,
    };
  };