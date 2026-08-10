import {
  Bot,
  MoreHorizontal,
  Plus,
} from "lucide-react";

interface Props {
  onNewChat: () => void;
}

const ChatHeader = ({ onNewChat }: Props) => {
  return (
    <header className="flex h-14 flex-shrink-0 items-center justify-between border-b border-slate-800 bg-slate-950 px-5">

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

      <div className="flex items-center gap-2">

        <button
          type="button"
          onClick={onNewChat}
          className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
        >
          <Plus size={15} />
          New Chat
        </button>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-800 hover:text-white"
        >
          <MoreHorizontal size={18} />
        </button>

      </div>

    </header>
  );
};

export default ChatHeader;