import {
  MessageSquare,
  Plus,
  Trash2,
} from "lucide-react";

import type { Conversation } from "../types/assistant";

interface Props {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelect: (conversationId: string) => void;
  onNewChat: () => void;
  onClear: () => void;
}

const ConversationList = ({
  conversations,
  activeConversationId,
  onSelect,
  onNewChat,
  onClear,
}: Props) => {
  return (
    <aside className="flex h-full w-64 flex-shrink-0 flex-col border-r border-slate-800 bg-slate-950">

      {/* Header */}

      <div className="flex h-14 flex-shrink-0 items-center justify-between border-b border-slate-800 px-3">

        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Conversations
        </span>

        <button
          type="button"
          onClick={onNewChat}
          className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-800 hover:text-white"
          title="New conversation"
        >
          <Plus size={16} />
        </button>

      </div>

      {/* Conversations */}

      <div className="min-h-0 flex-1 overflow-y-auto p-2">

        {conversations.length === 0 ? (
          <div className="px-3 py-8 text-center text-xs text-slate-600">
            No conversations yet.
          </div>
        ) : (
          <div className="space-y-1">

            {conversations.map((conversation) => {
              const active =
                conversation.id ===
                activeConversationId;

              return (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() =>
                    onSelect(conversation.id)
                  }
                  className={`
                    group
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-3
                    text-left
                    transition
                    ${
                      active
                        ? "bg-blue-600/10 text-white"
                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                    }
                  `}
                >

                  <MessageSquare
                    size={15}
                    className={
                      active
                        ? "flex-shrink-0 text-blue-400"
                        : "flex-shrink-0 text-slate-600"
                    }
                  />

                  <span className="min-w-0 flex-1 truncate text-xs">
                    {conversation.title}
                  </span>

                </button>
              );
            })}

          </div>
        )}

      </div>

      {/* Footer */}

      <div className="border-t border-slate-800 p-3">

        <button
          type="button"
          onClick={onClear}
          disabled={!activeConversationId}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-800 px-3 py-2 text-xs text-slate-500 transition hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Trash2 size={14} />
          Clear Conversation
        </button>

      </div>

    </aside>
  );
};

export default ConversationList;