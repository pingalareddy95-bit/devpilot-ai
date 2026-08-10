import {
  Bot,
  User,
} from "lucide-react";

import type { ChatMessage as ChatMessageType } from "../types/assistant";

interface Props {
  message: ChatMessageType;
}

const ChatMessage = ({ message }: Props) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* AI Avatar */}

      {!isUser && (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600/15 text-blue-400">
          <Bot size={17} />
        </div>
      )}

      {/* Message */}

      <div
        className={`
          max-w-[75%]
          rounded-2xl
          px-4
          py-3
          text-sm
          leading-6
          whitespace-pre-wrap
          ${
            isUser
              ? "rounded-br-md bg-blue-600 text-white"
              : "rounded-bl-md border border-slate-800 bg-slate-900 text-slate-300"
          }
        `}
      >
        {message.content}
      </div>

      {/* User Avatar */}

      {isUser && (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-300">
          <User size={17} />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;