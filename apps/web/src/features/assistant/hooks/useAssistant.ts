import { useCallback } from "react";

import { sendAssistantMessage } from "../service/assistantService";
import { useAssistantStore } from "../store/assistantStore";

export const useAssistant = () => {
  const conversations = useAssistantStore(
    (state) => state.conversations,
  );

  const activeConversationId = useAssistantStore(
    (state) => state.activeConversationId,
  );

  const isLoading = useAssistantStore(
    (state) => state.isLoading,
  );

  const error = useAssistantStore(
    (state) => state.error,
  );

  const setActiveConversation =
    useAssistantStore(
      (state) => state.setActiveConversation,
    );

  const addUserMessage = useAssistantStore(
    (state) => state.addUserMessage,
  );

  const addAssistantMessage = useAssistantStore(
    (state) => state.addAssistantMessage,
  );

  const createConversation = useAssistantStore(
    (state) => state.createConversation,
  );

  const setLoading = useAssistantStore(
    (state) => state.setLoading,
  );

  const setError = useAssistantStore(
    (state) => state.setError,
  );

  const clearConversation = useAssistantStore(
    (state) => state.clearConversation,
  );

  // ============================================================
  // ACTIVE CONVERSATION
  // ============================================================

  const activeConversation =
    conversations.find(
      (conversation) =>
        conversation.id === activeConversationId,
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

      // Add user message immediately
      addUserMessage(
        activeConversationId,
        trimmedContent,
      );

      setLoading(true);

      try {
        const response =
          await sendAssistantMessage(
            trimmedContent,
          );

        addAssistantMessage(
          activeConversationId,
          response.message,
        );
      } catch (err) {
        console.error(
          "Assistant message failed:",
          err,
        );

        setError(
          "Unable to generate an AI response. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    },
    [
      activeConversationId,
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
  // CLEAR CHAT
  // ============================================================

  const clearChat = useCallback(() => {
    if (!activeConversationId) {
      return;
    }

    clearConversation(activeConversationId);
    setError(null);
  }, [
    activeConversationId,
    clearConversation,
    setError,
  ]);

  return {
    conversations,
    activeConversation,
    activeConversationId,
    isLoading,
    error,

    sendMessage,
    newChat,
    selectConversation,
    clearChat,
  };
};