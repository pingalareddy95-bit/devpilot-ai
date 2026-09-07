export type MessageRole = "user" | "assistant";

export interface AssistantMessage {
  role: MessageRole;
  content: string;
}

export interface AssistantChatRequest {
  message: string;
  conversation?: AssistantMessage[];
}

export interface AssistantChatResponse {
  message: {
    id: string;
    role: "assistant";
    content: string;
    createdAt: string;
  };
}
