import {
  Terminal as TerminalIcon,
  Trash2,
} from "lucide-react";

import type { TerminalLine } from "../../types/workspace";

interface Props {
  lines: TerminalLine[];
}

const Terminal = ({ lines }: Props) => {
  return (
    <div className="flex h-full flex-col bg-[#020617]">

      <div className="flex h-10 flex-shrink-0 items-center justify-between border-b border-slate-800 px-4">

        <div className="flex items-center gap-2">

          <TerminalIcon
            size={16}
            className="text-green-400"
          />

          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Terminal
          </span>

        </div>

        <button className="text-slate-500 transition hover:text-white">
          <Trash2 size={15} />
        </button>

      </div>

      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs">

        {lines.length === 0 ? (
          <div className="text-slate-600">
            DevPilot terminal ready...
          </div>
        ) : (
          lines.map((line) => (
            <div
              key={line.id}
              className={
                line.type === "error"
                  ? "text-red-400"
                  : line.type === "command"
                    ? "text-green-400"
                    : "text-slate-400"
              }
            >
              {line.value}
            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default Terminal;