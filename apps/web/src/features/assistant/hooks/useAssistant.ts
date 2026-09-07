import { useCallback } from "react";

import { sendAssistantMessage } from "../service/assistantService";

import { useAssistantStore } from "../store/assistantStore";

export const useAssistant = () => {
  const conversations = useAssistantStore((state) => state.conversations);

  const activeConversationId = useAssistantStore(
    (state) => state.activeConversationId,
  );

  const isLoading = useAssistantStore((state) => state.isLoading);

  const error = useAssistantStore((state) => state.error);

  const setActiveConversation = useAssistantStore(
    (state) => state.setActiveConversation,
  );

  const addUserMessage = useAssistantStore((state) => state.addUserMessage);

  const addAssistantMessage = useAssistantStore(
    (state) => state.addAssistantMessage,
  );

  const createConversation = useAssistantStore(
    (state) => state.createConversation,
  );

  const renameConversation = useAssistantStore(
    (state) => state.renameConversation,
  );

  const clearConversation = useAssistantStore(
    (state) => state.clearConversation,
  );

  const deleteConversation = useAssistantStore(
    (state) => state.deleteConversation,
  );

  const setLoading = useAssistantStore((state) => state.setLoading);

  const setError = useAssistantStore((state) => state.setError);

  // ============================================================
  // ACTIVE CONVERSATION
  // ============================================================

  const activeConversation =
    conversations.find(
      (conversation) => conversation.id === activeConversationId,
    ) ?? null;

  // ============================================================
  // SEND MESSAGE
  // ============================================================

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmedContent = content.trim();

      if (!trimmedContent || !activeConversationId) {
        return;
      }

      setError(null);

      /*
       * Capture the current conversation BEFORE adding
       * the new user message.
       *
       * The API receives:
       *   1. previous conversation history
       *   2. current user message separately
       *
       * This prevents the current message from being
       * duplicated in the request.
       */
      const conversationHistory = activeConversation?.messages ?? [];

      addUserMessage(activeConversationId, trimmedContent);

      setLoading(true);

      try {
        const response = await sendAssistantMessage(
          trimmedContent,
          conversationHistory,
        );

        addAssistantMessage(activeConversationId, response.message);
      } catch (err) {
        console.error("Assistant message failed:", err);

        setError("Unable to generate an AI response. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [
      activeConversationId,
      activeConversation,
      addUserMessage,
      addAssistantMessage,
      setLoading,
      setError,
    ],
  );

  // ============================================================
  // NEW CHAT
  // ============================================================

  const newChat = useCallback(() => {
    createConversation();
    setError(null);
  }, [createConversation, setError]);

  // ============================================================
  // SELECT CHAT
  // ============================================================

  const selectConversation = useCallback(
    (conversationId: string) => {
      setActiveConversation(conversationId);

      setError(null);
    },
    [setActiveConversation, setError],
  );

  // ============================================================
  // RENAME CHAT
  // ============================================================

  const renameChat = useCallback(
    (conversationId: string) => {
      const conversation = conversations.find(
        (item) => item.id === conversationId,
      );

      if (!conversation) {
        return;
      }

      const title = window.prompt("Rename conversation", conversation.title);

      if (title === null || !title.trim()) {
        return;
      }

      renameConversation(conversationId, title);
    },
    [conversations, renameConversation],
  );

  // ============================================================
  // CLEAR CHAT
  // ============================================================

  const clearChat = useCallback(
    (conversationId: string) => {
      const conversation = conversations.find(
        (item) => item.id === conversationId,
      );

      if (!conversation) {
        return;
      }

      const confirmed = window.confirm(
        `Clear all messages from "${conversation.title}"?`,
      );

      if (!confirmed) {
        return;
      }

      clearConversation(conversationId);

      setError(null);
    },
    [conversations, clearConversation, setError],
  );

  // ============================================================
  // DELETE CHAT
  // ============================================================

  const deleteChat = useCallback(
    (conversationId: string) => {
      const conversation = conversations.find(
        (item) => item.id === conversationId,
      );

      if (!conversation) {
        return;
      }

      const confirmed = window.confirm(
        `Delete "${conversation.title}" permanently?`,
      );

      if (!confirmed) {
        return;
      }

      deleteConversation(conversationId);

      setError(null);
    },
    [conversations, deleteConversation, setError],
  );

  return {
    conversations,
    activeConversation,
    activeConversationId,
    isLoading,
    error,
    sendMessage,
    newChat,
    selectConversation,
    renameChat,
    clearChat,
    deleteChat,
  };
};
