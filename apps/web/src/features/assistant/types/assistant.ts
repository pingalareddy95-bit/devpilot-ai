export type MessageRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface AssistantState {
  conversations: Conversation[];
  activeConversationId: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface SendMessagePayload {
  conversationId: string;
  content: string;
}

export interface AssistantResponse {
  message: ChatMessage;
}