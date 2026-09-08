import { useEffect, useRef, useState } from "react";

import {
  MessageSquare,
  Plus,
  MoreVertical,
  Pencil,
  Trash2,
  Eraser,
} from "lucide-react";

import type { Conversation } from "../types/assistant";

interface Props {
  conversations: Conversation[];
  activeConversationId: string | null;

  onSelect: (conversationId: string) => void;
  onNewChat: () => void;

  onRename: (conversationId: string) => void;
  onClear: (conversationId: string) => void;
  onDelete: (conversationId: string) => void;
}

const ConversationList = ({
  conversations,
  activeConversationId,
  onSelect,
  onNewChat,
  onRename,
  onClear,
  onDelete,
}: Props) => {
  const [openMenuId, setOpenMenuId] =
    useState<string | null>(null);

  const menuContainerRef =
    useRef<HTMLDivElement | null>(null);

  // ============================================================
  // CLOSE MENU WHEN CLICKING OUTSIDE
  // ============================================================

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent,
    ) => {
      if (
        !menuContainerRef.current?.contains(
          event.target as Node,
        )
      ) {
        setOpenMenuId(null);
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
  // TOGGLE CONVERSATION MENU
  // ============================================================

  const handleMenuToggle = (
    conversationId: string,
  ) => {
    setOpenMenuId((currentId) =>
      currentId === conversationId
        ? null
        : conversationId,
    );
  };

  // ============================================================
  // SELECT CONVERSATION
  // ============================================================

  const handleSelect = (
    conversationId: string,
  ) => {
    setOpenMenuId(null);
    onSelect(conversationId);
  };

  // ============================================================
  // NEW CONVERSATION
  // ============================================================

  const handleNewChat = () => {
    setOpenMenuId(null);
    onNewChat();
  };

  // ============================================================
  // RENAME
  // ============================================================

  const handleRename = (
    conversationId: string,
  ) => {
    setOpenMenuId(null);
    onRename(conversationId);
  };

  // ============================================================
  // CLEAR
  // ============================================================

  const handleClear = (
    conversationId: string,
  ) => {
    setOpenMenuId(null);
    onClear(conversationId);
  };

  // ============================================================
  // DELETE
  // ============================================================

  const handleDelete = (
    conversationId: string,
  ) => {
    setOpenMenuId(null);
    onDelete(conversationId);
  };

  return (
    <aside className="flex h-full min-h-0 w-72 flex-shrink-0 flex-col border-r border-slate-800 bg-slate-950">

      {/* ========================================================= */}
      {/* HEADER */}
      {/* ========================================================= */}

      <div className="flex h-14 flex-shrink-0 items-center justify-between border-b border-slate-800 px-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Conversations
        </span>

        <button
          type="button"
          onClick={handleNewChat}
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-md
            text-slate-500
            transition
            hover:bg-slate-800
            hover:text-white
          "
          title="New conversation"
          aria-label="New conversation"
        >
          <Plus size={17} />
        </button>
      </div>

      {/* ========================================================= */}
      {/* CONVERSATION LIST */}
      {/* ========================================================= */}

      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        {conversations.length === 0 ? (
          <div className="px-3 py-8 text-center">
            <MessageSquare
              size={22}
              className="mx-auto mb-3 text-slate-700"
            />

            <p className="text-xs text-slate-600">
              No conversations yet.
            </p>

            <button
              type="button"
              onClick={handleNewChat}
              className="
                mt-3
                text-xs
                text-blue-400
                transition
                hover:text-blue-300
              "
            >
              Start a new chat
            </button>
          </div>
        ) : (
          <div
            ref={menuContainerRef}
            className="space-y-1"
          >
            {conversations.map(
              (conversation) => {
                const active =
                  conversation.id ===
                  activeConversationId;

                const menuOpen =
                  openMenuId ===
                  conversation.id;

                return (
                  <div
                    key={conversation.id}
                    className={`
                      group
                      relative
                      flex
                      items-center
                      rounded-lg
                      transition
                      ${
                        menuOpen
                          ? "z-50"
                          : "z-0"
                      }
                      ${
                        active
                          ? "bg-blue-600/10"
                          : "hover:bg-slate-900"
                      }
                    `}
                  >
                    {/* ================================================= */}
                    {/* CONVERSATION */}
                    {/* ================================================= */}

                    <button
                      type="button"
                      onClick={() =>
                        handleSelect(
                          conversation.id,
                        )
                      }
                      className={`
                        flex
                        min-w-0
                        flex-1
                        items-center
                        gap-3
                        rounded-lg
                        px-3
                        py-3
                        pr-10
                        text-left
                        transition
                        ${
                          active
                            ? "text-white"
                            : "text-slate-400 hover:text-slate-200"
                        }
                      `}
                    >
                      <MessageSquare
                        size={15}
                        className={`
                          flex-shrink-0
                          ${
                            active
                              ? "text-blue-400"
                              : "text-slate-600"
                          }
                        `}
                      />

                      <span className="min-w-0 flex-1 truncate text-xs">
                        {conversation.title}
                      </span>
                    </button>

                    {/* ================================================= */}
                    {/* THREE DOT MENU */}
                    {/* ================================================= */}

                    <div className="absolute right-1 top-1/2 -translate-y-1/2">
                      <button
                        type="button"
                        onMouseDown={(event) => {
                          event.stopPropagation();
                        }}
                        onClick={(event) => {
                          event.stopPropagation();

                          handleMenuToggle(
                            conversation.id,
                          );
                        }}
                        className={`
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-md
                          text-slate-600
                          transition
                          hover:bg-slate-800
                          hover:text-white
                          ${
                            menuOpen
                              ? "bg-slate-800 text-white opacity-100"
                              : "opacity-0 group-hover:opacity-100"
                          }
                        `}
                        title="Conversation actions"
                        aria-label={`Actions for ${conversation.title}`}
                        aria-expanded={
                          menuOpen
                        }
                      >
                        <MoreVertical
                          size={16}
                        />
                      </button>

                      {/* ================================================= */}
                      {/* ACTION MENU */}
                      {/* ================================================= */}

                      {menuOpen && (
                        <div
                          onMouseDown={(event) => {
                            event.stopPropagation();
                          }}
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                          className="
                            absolute
                            right-0
                            top-8
                            z-50
                            w-44
                            overflow-hidden
                            rounded-lg
                            border
                            border-slate-700
                            bg-slate-900
                            p-1
                            shadow-xl
                            shadow-black/40
                          "
                        >
                          {/* Rename */}

                          <button
                            type="button"
                            onMouseDown={(event) => {
                              event.stopPropagation();
                            }}
                            onClick={(event) => {
                              event.stopPropagation();

                              handleRename(
                                conversation.id,
                              );
                            }}
                            className="
                              flex
                              w-full
                              items-center
                              gap-3
                              rounded-md
                              px-3
                              py-2
                              text-left
                              text-xs
                              text-slate-300
                              transition
                              hover:bg-slate-800
                              hover:text-white
                            "
                          >
                            <Pencil
                              size={14}
                              className="text-slate-500"
                            />

                            <span>
                              Rename
                            </span>
                          </button>

                          {/* Clear */}

                          <button
                            type="button"
                            onMouseDown={(event) => {
                              event.stopPropagation();
                            }}
                            onClick={(event) => {
                              event.stopPropagation();

                              handleClear(
                                conversation.id,
                              );
                            }}
                            className="
                              flex
                              w-full
                              items-center
                              gap-3
                              rounded-md
                              px-3
                              py-2
                              text-left
                              text-xs
                              text-slate-300
                              transition
                              hover:bg-slate-800
                              hover:text-white
                            "
                          >
                            <Eraser
                              size={14}
                              className="text-slate-500"
                            />

                            <span>
                              Clear messages
                            </span>
                          </button>

                          {/* Delete */}

                          <button
                            type="button"
                            onMouseDown={(event) => {
                              event.stopPropagation();
                            }}
                            onClick={(event) => {
                              event.stopPropagation();

                              handleDelete(
                                conversation.id,
                              );
                            }}
                            className="
                              flex
                              w-full
                              items-center
                              gap-3
                              rounded-md
                              px-3
                              py-2
                              text-left
                              text-xs
                              text-red-400
                              transition
                              hover:bg-red-500/10
                              hover:text-red-300
                            "
                          >
                            <Trash2 size={14} />

                            <span>
                              Delete conversation
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              },
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default ConversationList;