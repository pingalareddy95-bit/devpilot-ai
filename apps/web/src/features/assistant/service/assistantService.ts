import type { AssistantResponse, ChatMessage } from "../types/assistant";

// ============================================================
// API CONFIGURATION
// ============================================================

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:4000";

// ============================================================
// SEND MESSAGE TO DEV PILOT API
// ============================================================

export const sendAssistantMessage = async (
  content: string,
  conversation: ChatMessage[] = [],
): Promise<AssistantResponse> => {
  const conversationHistory = conversation
    .filter(
      (message) => message.role === "user" || message.role === "assistant",
    )
    .map((message) => ({
      role: message.role,
      content: message.content,
    }));

  const response = await fetch(`${API_BASE_URL}/api/assistant/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: content,
      conversation: conversationHistory,
    }),
  });

  // ==========================================================
  // HANDLE HTTP ERRORS
  // ==========================================================

  if (!response.ok) {
    let errorMessage = "Unable to generate AI response.";

    try {
      const errorData = (await response.json()) as {
        error?: string;
      };

      if (errorData.error) {
        errorMessage = errorData.error;
      }
    } catch {
      // Ignore JSON parsing errors
    }

    throw new Error(errorMessage);
  }

  // ==========================================================
  // PARSE API RESPONSE
  // ==========================================================

  const data = (await response.json()) as AssistantResponse;

  // ==========================================================
  // VALIDATE RESPONSE
  // ==========================================================

  if (!data || !data.message || typeof data.message.content !== "string") {
    throw new Error("Invalid response received from DevPilot API.");
  }

  // ==========================================================
  // NORMALIZE ASSISTANT MESSAGE
  // ==========================================================

  const message: ChatMessage = {
    id: data.message.id ?? `assistant-${Date.now()}`,
    role: "assistant",
    content: data.message.content,
    createdAt: data.message.createdAt ?? new Date().toISOString(),
  };

  // ==========================================================
  // RETURN
  // ==========================================================

  return {
    message,
  };
};
