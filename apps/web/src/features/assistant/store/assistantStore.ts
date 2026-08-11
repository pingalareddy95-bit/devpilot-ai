import { create } from "zustand";

import type { ChatMessage, Conversation } from "../types/assistant";

import { initialConversations } from "../data/assistantData";

interface AssistantStore {
  conversations: Conversation[];

  activeConversationId: string | null;

  isLoading: boolean;

  error: string | null;

  setActiveConversation: (conversationId: string) => void;

  addUserMessage: (conversationId: string, content: string) => ChatMessage;

  addAssistantMessage: (conversationId: string, message: ChatMessage) => void;

  createConversation: () => string;

  renameConversation: (conversationId: string, title: string) => void;

  clearConversation: (conversationId: string) => void;

  deleteConversation: (conversationId: string) => void;

  setLoading: (loading: boolean) => void;

  setError: (error: string | null) => void;
}

const createId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const useAssistantStore = create<AssistantStore>((set) => ({
  // ==========================================================
  // INITIAL STATE
  // ==========================================================

  conversations: initialConversations,

  activeConversationId: initialConversations[0]?.id ?? null,

  isLoading: false,

  error: null,

  // ==========================================================
  // SELECT CONVERSATION
  // ==========================================================

  setActiveConversation: (conversationId) => {
    set({
      activeConversationId: conversationId,

      error: null,
    });
  },

  // ==========================================================
  // ADD USER MESSAGE
  // ==========================================================

  addUserMessage: (conversationId, content) => {
    const message: ChatMessage = {
      id: createId("user"),

      role: "user",

      content,

      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      conversations: state.conversations.map((conversation) => {
        if (conversation.id !== conversationId) {
          return conversation;
        }

        return {
          ...conversation,

          title:
            conversation.messages.length === 0
              ? content.slice(0, 40)
              : conversation.title,

          messages: [...conversation.messages, message],

          updatedAt: new Date().toISOString(),
        };
      }),
    }));

    return message;
  },

  // ==========================================================
  // ADD ASSISTANT MESSAGE
  // ==========================================================

  addAssistantMessage: (conversationId, message) => {
    set((state) => ({
      conversations: state.conversations.map((conversation) => {
        if (conversation.id !== conversationId) {
          return conversation;
        }

        return {
          ...conversation,

          messages: [...conversation.messages, message],

          updatedAt: new Date().toISOString(),
        };
      }),
    }));
  },

  // ==========================================================
  // CREATE NEW CONVERSATION
  // ==========================================================

  createConversation: () => {
    const id = createId("conversation");

    const now = new Date().toISOString();

    const conversation: Conversation = {
      id,

      title: "New Conversation",

      messages: [],

      createdAt: now,

      updatedAt: now,
    };

    set((state) => ({
      conversations: [conversation, ...state.conversations],

      activeConversationId: id,

      error: null,
    }));

    return id;
  },

  // ==========================================================
  // RENAME CONVERSATION
  // ==========================================================

  renameConversation: (conversationId, title) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    set((state) => ({
      conversations: state.conversations.map((conversation) => {
        if (conversation.id !== conversationId) {
          return conversation;
        }

        return {
          ...conversation,

          title: trimmedTitle,

          updatedAt: new Date().toISOString(),
        };
      }),
    }));
  },

  // ==========================================================
  // CLEAR CONVERSATION MESSAGES
  // ==========================================================

  clearConversation: (conversationId) => {
    set((state) => ({
      conversations: state.conversations.map((conversation) => {
        if (conversation.id !== conversationId) {
          return conversation;
        }

        return {
          ...conversation,

          messages: [],

          updatedAt: new Date().toISOString(),
        };
      }),
    }));
  },

  // ==========================================================
  // DELETE CONVERSATION
  // ==========================================================

  deleteConversation: (conversationId) => {
    set((state) => {
      const remaining = state.conversations.filter(
        (conversation) => conversation.id !== conversationId,
      );

      const wasActive = state.activeConversationId === conversationId;

      return {
        conversations: remaining,

        activeConversationId: wasActive
          ? (remaining[0]?.id ?? null)
          : state.activeConversationId,

        error: null,
      };
    });
  },

  // ==========================================================
  // LOADING
  // ==========================================================

  setLoading: (loading) => {
    set({
      isLoading: loading,
    });
  },

  // ==========================================================
  // ERROR
  // ==========================================================

  setError: (error) => {
    set({
      error,
    });
  },
}));
