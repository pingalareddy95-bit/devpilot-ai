import { useWorkspace } from "../hooks/useWorkspace";

import Explorer from "../components/Explorer/Explorer";
import EditorTabs from "../components/Editor/EditorTabs";
import CodeEditor from "../components/Editor/CodeEditor";
import AiAssistant from "../components/AiAssistant/AiAssistant";
import Terminal from "../components/Terminal/Terminal";

const WorkspacePage = () => {
  const { data, loading } = useWorkspace();

  if (loading || !data) {
    return (
      <div className="flex h-full items-center justify-center bg-[#050816] text-white">
        Loading Workspace...
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#050816]">

      {/* ====================================================== */}
      {/* WORKSPACE TOOLBAR */}
      {/* ====================================================== */}

      <div className="flex h-12 flex-shrink-0 items-center justify-between border-b border-slate-800 bg-slate-950 px-4">

        <div className="flex items-center gap-3">

          <span className="text-sm font-semibold text-white">
            DevPilot Workspace
          </span>

          <span className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-400">
            main
          </span>

        </div>

        <div className="flex items-center gap-2">

          <button
            type="button"
            className="rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            Run
          </button>

          <button
            type="button"
            className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-500"
          >
            AI Generate
          </button>

        </div>

      </div>

      {/* ====================================================== */}
      {/* WORKSPACE CONTENT */}
      {/* ====================================================== */}

      <div className="flex min-h-0 flex-1">

        {/* ================================================== */}
        {/* EXPLORER */}
        {/* ================================================== */}

        <aside className="w-60 flex-shrink-0 border-r border-slate-800 bg-slate-950">

          <Explorer
            files={data.explorer}
          />

        </aside>

        {/* ================================================== */}
        {/* EDITOR AREA */}
        {/* ================================================== */}

        <section className="flex min-w-0 flex-1 flex-col">

          <EditorTabs
            tabs={data.openTabs}
          />

          {/* Code editor */}

          <div className="min-h-0 flex-1">

            <CodeEditor
              tab={data.activeTab}
            />

          </div>

          {/* Terminal */}

          <div className="h-48 flex-shrink-0 border-t border-slate-800">

            <Terminal
              lines={data.terminal}
            />

          </div>

        </section>

        {/* ================================================== */}
        {/* AI ASSISTANT */}
        {/* ================================================== */}

        <aside className="w-80 flex-shrink-0 border-l border-slate-800 bg-slate-950">

          <AiAssistant
            messages={data.chat}
          />

        </aside>

      </div>

    </div>
  );
};

export default WorkspacePage;