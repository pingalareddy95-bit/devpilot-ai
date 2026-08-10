import {
  Bot,
  Send,
  Sparkles,
} from "lucide-react";

import type { ChatMessage } from "../../types/workspace";

interface Props {
  messages: ChatMessage[];
}

const AiAssistant = ({ messages }: Props) => {
  return (
    <div className="flex h-full flex-col">

      <div className="flex h-11 flex-shrink-0 items-center gap-2 border-b border-slate-800 px-4">

        <Sparkles
          size={17}
          className="text-blue-400"
        />

        <h2 className="text-sm font-semibold text-white">
          DevPilot AI
        </h2>

      </div>

      <div className="flex-1 overflow-y-auto p-4">

        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
              <Bot className="text-blue-400" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-white">
              How can I help?
            </h3>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Ask me to explain, generate, refactor or debug your code.
            </p>

          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className="rounded-lg bg-slate-900 p-3"
              >
                <p className="text-xs leading-5 text-slate-300">
                  {message.content}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>

      <div className="border-t border-slate-800 p-3">

        <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2">

          <input
            type="text"
            placeholder="Ask DevPilot AI..."
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />

          <button
            className="rounded-md bg-blue-600 p-1.5 text-white transition hover:bg-blue-500"
          >
            <Send size={15} />
          </button>

        </div>

      </div>

    </div>
  );
};

export default AiAssistant;