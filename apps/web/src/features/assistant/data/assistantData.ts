import type { Conversation } from "../types/assistant";

export const initialConversations: Conversation[] = [
  {
    id: "conversation-1",
    title: "Explain React Hooks",
    createdAt: "2026-08-10T10:00:00.000Z",
    updatedAt: "2026-08-10T10:10:00.000Z",

    messages: [
      {
        id: "message-1",
        role: "user",
        content: "Can you explain React Hooks?",
        createdAt: "2026-08-10T10:00:00.000Z",
      },
      {
        id: "message-2",
        role: "assistant",
        content:
          "React Hooks are functions that allow functional components to use React features such as state, lifecycle behavior, context, and memoization. Common Hooks include useState, useEffect, useContext, useMemo, and useCallback.",
        createdAt: "2026-08-10T10:01:00.000Z",
      },
    ],
  },

  {
    id: "conversation-2",
    title: "Fix Express Middleware",
    createdAt: "2026-08-09T14:00:00.000Z",
    updatedAt: "2026-08-09T14:15:00.000Z",

    messages: [
      {
        id: "message-3",
        role: "user",
        content: "How do I fix Express middleware execution order?",
        createdAt: "2026-08-09T14:00:00.000Z",
      },
      {
        id: "message-4",
        role: "assistant",
        content:
          "Express executes middleware in the order it is registered. Make sure authentication, validation, business logic, and error-handling middleware are registered in the correct sequence.",
        createdAt: "2026-08-09T14:01:00.000Z",
      },
    ],
  },

  {
    id: "conversation-3",
    title: "JWT Authentication",
    createdAt: "2026-08-08T09:00:00.000Z",
    updatedAt: "2026-08-08T09:20:00.000Z",

    messages: [
      {
        id: "message-5",
        role: "user",
        content: "Explain JWT authentication in Node.js.",
        createdAt: "2026-08-08T09:00:00.000Z",
      },
      {
        id: "message-6",
        role: "assistant",
        content:
          "JWT authentication typically involves issuing a signed token after successful login and validating that token on protected API requests. The server should validate the signature, expiration, issuer, audience, and relevant claims before allowing access.",
        createdAt: "2026-08-08T09:01:00.000Z",
      },
    ],
  },
];