import {
  Bug,
  Code2,
  Database,
  Globe,
  Sparkles,
} from "lucide-react";

interface Props {
  onSuggestion: (text: string) => void;
}

const suggestions = [
  {
    icon: Code2,
    title: "Explain Code",
    description: "Explain a React component",
    prompt: "Explain React Hooks with a simple example.",
  },
  {
    icon: Bug,
    title: "Debug Error",
    description: "Help fix a coding problem",
    prompt: "Help me debug an Express.js middleware error.",
  },
  {
    icon: Globe,
    title: "Generate API",
    description: "Create a REST API",
    prompt: "Generate a Node.js Express REST API.",
  },
  {
    icon: Database,
    title: "SQL Builder",
    description: "Generate a SQL query",
    prompt: "Create a SQL query to find the top 5 highest paid employees.",
  },
];

const ChatWelcome = ({ onSuggestion }: Props) => {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 pb-8 pt-10 text-center">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-400">
        <Sparkles size={27} />
      </div>

      <h2 className="mt-5 text-2xl font-bold text-white">
        How can I help you today?
      </h2>

      <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
        Ask DevPilot AI about code, debugging, APIs, databases,
        architecture, or any development problem.
      </p>

      <div className="mt-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">

        {suggestions.map((suggestion) => {
          const Icon = suggestion.icon;

          return (
            <button
              key={suggestion.title}
              type="button"
              onClick={() => onSuggestion(suggestion.prompt)}
              className="group rounded-xl border border-slate-800 bg-slate-900/70 p-4 text-left transition hover:border-blue-500/50 hover:bg-slate-900"
            >
              <div className="flex items-start gap-3">

                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-slate-800 text-blue-400 transition group-hover:bg-blue-600/10">
                  <Icon size={18} />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-white">
                    {suggestion.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {suggestion.description}
                  </p>
                </div>

              </div>
            </button>
          );
        })}

      </div>

    </div>
  );
};

export default ChatWelcome;