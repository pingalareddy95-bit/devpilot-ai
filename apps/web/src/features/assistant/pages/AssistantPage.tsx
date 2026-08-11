import { useAssistant } from "../hooks/useAssistant";

import ChatHeader from "../components/ChatHeader";
import ChatWelcome from "../components/ChatWelcome";
import ChatMessageList from "../components/ChatMessageList";
import ChatInput from "../components/ChatInput";
import ConversationList from "../components/ConversationList";

const AssistantPage = () => {
  const {
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
  } = useAssistant();

  // ============================================================
  // SUGGESTION
  // ============================================================

  const handleSuggestion = (prompt: string) => {
    void sendMessage(prompt);
  };

  return (
    <div className="flex h-full min-h-0 overflow-hidden bg-[#050816]">
      {/* ====================================================== */}
      {/* CONVERSATION SIDEBAR */}
      {/* ====================================================== */}

      <ConversationList
        conversations={conversations}

        activeConversationId={activeConversationId}

        onSelect={selectConversation}

        onNewChat={newChat}

        onRename={renameChat}

        onClear={clearChat}

        onDelete={deleteChat}
      />

      {/* ====================================================== */}
      {/* CHAT AREA */}
      {/* ====================================================== */}

      <section className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* ==================================================== */}
        {/* HEADER */}
        {/* ==================================================== */}

        <ChatHeader
          onNewChat={newChat}
          onClear={() => {
            if (activeConversationId) {
              clearChat(activeConversationId);
            }
          }}
          conversation={activeConversation}
        />

        {/* ==================================================== */}
        {/* MESSAGES */}
        {/* ==================================================== */}

        <div className="min-h-0 flex-1 overflow-hidden">
          {activeConversation && activeConversation.messages.length > 0 ? (
            <ChatMessageList
              messages={activeConversation.messages}
              isLoading={isLoading}
            />
          ) : (
            <div className="h-full overflow-y-auto">
              <ChatWelcome onSuggestion={handleSuggestion} />

              {isLoading && (
                <div className="px-6 pb-6">
                  <div className="mx-auto max-w-4xl">
                    <ChatMessageList messages={[]} isLoading />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ==================================================== */}
        {/* ERROR */}
        {/* ==================================================== */}

        {error && (
          <div className="border-t border-red-500/20 bg-red-500/5 px-5 py-2">
            <p className="mx-auto max-w-4xl text-xs text-red-400">{error}</p>
          </div>
        )}

        {/* ==================================================== */}
        {/* INPUT */}
        {/* ==================================================== */}

        <ChatInput
          onSend={sendMessage}

          disabled={isLoading || !activeConversationId}
        />
      </section>
    </div>
  );
};

export default AssistantPage;
