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
    clearChat,
  } = useAssistant();

  const handleSuggestion = (prompt: string) => {
    void sendMessage(prompt);
  };

  return (
    <div className="flex h-full min-h-0 w-full overflow-hidden bg-[#050816]">

      {/* ====================================================== */}
      {/* CONVERSATION SIDEBAR */}
      {/* ====================================================== */}

      <ConversationList
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelect={selectConversation}
        onNewChat={newChat}
        onClear={clearChat}
      />

      {/* ====================================================== */}
      {/* CHAT AREA */}
      {/* ====================================================== */}

      <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">

        {/* ================================================== */}
        {/* CHAT HEADER */}
        {/* ================================================== */}

        <div className="flex-shrink-0">
          <ChatHeader onNewChat={newChat} />
        </div>

        {/* ================================================== */}
        {/* MESSAGE AREA */}
        {/* ================================================== */}

        <div className="min-h-0 flex-1 overflow-hidden">

          {activeConversation &&
          activeConversation.messages.length > 0 ? (

            /*
             * IMPORTANT:
             * This container owns the vertical scrollbar.
             */
            <div className="h-full min-h-0 overflow-y-auto overflow-x-hidden">

              <ChatMessageList
                messages={activeConversation.messages}
                isLoading={isLoading}
              />

            </div>

          ) : (

            /*
             * Empty conversation / welcome screen
             */
            <div className="h-full min-h-0 overflow-y-auto overflow-x-hidden">

              <ChatWelcome
                onSuggestion={handleSuggestion}
              />

              {isLoading && (
                <div className="px-6 pb-6">
                  <div className="mx-auto max-w-4xl">

                    <ChatMessageList
                      messages={[]}
                      isLoading
                    />

                  </div>
                </div>
              )}

            </div>

          )}

        </div>

        {/* ================================================== */}
        {/* ERROR */}
        {/* ================================================== */}

        {error && (
          <div className="flex-shrink-0 border-t border-red-500/20 bg-red-500/5 px-5 py-2">

            <p className="mx-auto max-w-4xl text-xs text-red-400">
              {error}
            </p>

          </div>
        )}

        {/* ================================================== */}
        {/* CHAT INPUT */}
        {/* ================================================== */}

        <div className="flex-shrink-0">
          <ChatInput
            onSend={sendMessage}
            disabled={isLoading || !activeConversationId}
          />
        </div>

      </section>

    </div>
  );
};

export default AssistantPage;