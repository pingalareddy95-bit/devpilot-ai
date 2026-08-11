import {
  Bot,
  Check,
  Clipboard,
  Download,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

import type { Conversation } from "../types/assistant";

interface Props {
  onNewChat: () => void;
  onClear: () => void;
  conversation: Conversation | null;
}

const ChatHeader = ({
  onNewChat,
  onClear,
  conversation,
}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // ============================================================
  // CLOSE MENU WHEN CLICKING OUTSIDE
  // ============================================================

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  // ============================================================
  // COPY CONVERSATION
  // ============================================================

  const handleCopyConversation = async () => {
    if (
      !conversation ||
      conversation.messages.length === 0
    ) {
      return;
    }

    const text = conversation.messages
      .map((message) => {
        const role =
          message.role === "user"
            ? "You"
            : message.role === "assistant"
              ? "DevPilot AI"
              : "System";

        return `${role}:\n${message.content}`;
      })
      .join("\n\n");

    try {
      await navigator.clipboard.writeText(text);

      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    } catch (error) {
      console.error(
        "Unable to copy conversation:",
        error,
      );
    }
  };

  // ============================================================
  // EXPORT CONVERSATION
  // ============================================================

  const handleExportConversation = () => {
    if (
      !conversation ||
      conversation.messages.length === 0
    ) {
      return;
    }

    const text = conversation.messages
      .map((message) => {
        const role =
          message.role === "user"
            ? "You"
            : message.role === "assistant"
              ? "DevPilot AI"
              : "System";

        return `${role}:\n${message.content}`;
      })
      .join("\n\n");

    const blob = new Blob(
      [
        `DevPilot AI Conversation\n`,
        `================================\n\n`,
        `Conversation: ${conversation.title}\n`,
        `Created: ${conversation.createdAt}\n\n`,
        `${text}\n`,
      ],
      {
        type: "text/plain;charset=utf-8",
      },
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `${conversation.title
      .replace(/[^a-z0-9]/gi, "-")
      .toLowerCase() || "devpilot-conversation"}.txt`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setIsMenuOpen(false);
  };

  // ============================================================
  // CLEAR MESSAGES
  // ============================================================

  const handleClearMessages = () => {
    if (
      !conversation ||
      conversation.messages.length === 0
    ) {
      setIsMenuOpen(false);
      return;
    }

    onClear();

    setIsMenuOpen(false);
  };

  return (
    <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-slate-800 bg-[#050816] px-4">

      {/* ====================================================== */}
      {/* LEFT SIDE */}
      {/* ====================================================== */}

      <div className="flex items-center gap-3">

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/15 text-blue-400">
          <Bot size={17} />
        </div>

        <div>
          <h1 className="text-sm font-semibold text-white">
            DevPilot AI
          </h1>

          <div className="flex items-center gap-1.5">

            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

            <span className="text-[11px] text-slate-500">
              AI Assistant
            </span>

          </div>
        </div>

      </div>

      {/* ====================================================== */}
      {/* RIGHT SIDE */}
      {/* ====================================================== */}

      <div className="flex items-center gap-2">

        {/* New Chat */}

        <button
          type="button"
          onClick={onNewChat}
          className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
        >
          <Plus size={15} />

          <span>
            New Chat
          </span>
        </button>

        {/* ================================================== */}
        {/* MORE MENU */}
        {/* ================================================== */}

        <div
          ref={menuRef}
          className="relative"
        >

          <button
            type="button"
            onClick={() =>
              setIsMenuOpen(
                (current) => !current,
              )
            }
            aria-label="Conversation options"
            aria-expanded={isMenuOpen}
            className={`
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              transition
              ${
                isMenuOpen
                  ? "bg-slate-800 text-white"
                  : "text-slate-500 hover:bg-slate-800 hover:text-white"
              }
            `}
          >
            <MoreHorizontal size={18} />
          </button>

          {/* ================================================= */}
          {/* DROPDOWN */}
          {/* ================================================= */}

          {isMenuOpen && (
            <div className="absolute right-0 top-10 z-50 w-56 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 p-1.5 shadow-2xl shadow-black/40">

              {/* Copy */}

              <button
                type="button"
                onClick={handleCopyConversation}
                disabled={
                  !conversation ||
                  conversation.messages.length === 0
                }
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isCopied ? (
                  <Check
                    size={16}
                    className="text-green-400"
                  />
                ) : (
                  <Clipboard size={16} />
                )}

                <span>
                  {isCopied
                    ? "Copied"
                    : "Copy Conversation"}
                </span>
              </button>

              {/* Export */}

              <button
                type="button"
                onClick={handleExportConversation}
                disabled={
                  !conversation ||
                  conversation.messages.length === 0
                }
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Download size={16} />

                <span>
                  Export Conversation
                </span>
              </button>

              {/* Divider */}

              <div className="my-1 border-t border-slate-800" />

              {/* Clear */}

              <button
                type="button"
                onClick={handleClearMessages}
                disabled={
                  !conversation ||
                  conversation.messages.length === 0
                }
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Trash2 size={16} />

                <span>
                  Clear Messages
                </span>
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
};

export default ChatHeader;