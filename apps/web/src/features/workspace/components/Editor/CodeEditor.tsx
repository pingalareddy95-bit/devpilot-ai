import { Code2 } from "lucide-react";
import type { EditorTab } from "../../types/workspace";

interface Props {
  tab?: EditorTab;
}

const CodeEditor = ({ tab }: Props) => {
  if (!tab) {
    return (
      <div className="flex h-full items-center justify-center bg-[#0b1120] text-slate-500">
        Select a file to start editing
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-[#0b1120]">

      <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-2 text-xs text-slate-400">
        <Code2 size={14} className="text-blue-400" />
        {tab.path}
      </div>

      <div className="flex-1 overflow-auto p-5">

        <pre className="font-mono text-sm leading-7 text-slate-300">
          <code>
{`import React from "react";

function App() {
  return (
    <div>
      <h1>
        Welcome to DevPilot AI
      </h1>
    </div>
  );
}

export default App;`}
          </code>
        </pre>

      </div>

    </div>
  );
};

export default CodeEditor;