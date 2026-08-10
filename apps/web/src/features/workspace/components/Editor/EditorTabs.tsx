import { X } from "lucide-react";
import type { EditorTab } from "../../types/workspace";

interface Props {
  tabs: EditorTab[];
}

const EditorTabs = ({ tabs }: Props) => {
  return (
    <div className="flex h-11 flex-shrink-0 overflow-x-auto border-b border-slate-800 bg-slate-950">

      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          className={`group flex min-w-[150px] items-center gap-2 border-r border-slate-800 px-4 text-sm transition ${
            index === 0
              ? "border-t-2 border-t-blue-500 bg-slate-900 text-white"
              : "text-slate-400 hover:bg-slate-900 hover:text-white"
          }`}
        >

          <span className="truncate">
            {tab.name}
          </span>

          {tab.isDirty && (
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          )}

          <X
            size={14}
            className="ml-auto opacity-0 transition group-hover:opacity-100"
          />

        </button>
      ))}

    </div>
  );
};

export default EditorTabs;