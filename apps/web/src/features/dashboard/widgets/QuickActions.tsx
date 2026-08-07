import {
  Bot,
  Code2,
  Bug,
  Database,
  Globe,
  FileText,
} from "lucide-react";

import type { QuickAction } from "../types/dashboard";

interface Props {
  actions: QuickAction[];
}

const iconMap = {
  Bot,
  Code: Code2,
  Bug,
  Database,
  Globe,
  FileText,
};

const QuickActions = ({ actions }: Props) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 shadow-lg">

      <div className="border-b border-slate-800 px-5 py-4">

        <h2 className="text-lg font-semibold text-white">
          ⚡ Quick Actions
        </h2>

      </div>

      <div className="grid grid-cols-2 gap-3 p-4">

        {actions.map((action) => {

          const Icon =
            iconMap[action.icon as keyof typeof iconMap] ?? Bot;

          return (

            <button
              key={action.id}
              className="
              rounded-lg
              border
              border-slate-700
              bg-slate-800
              p-4
              text-left
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-blue-500
              hover:bg-slate-700
              hover:shadow-lg
            "
            >

              <Icon
                size={22}
                className="mb-3 text-blue-400"
              />

              <h3 className="font-semibold text-white">
                {action.title}
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                {action.description}
              </p>

            </button>

          );

        })}

      </div>

    </div>
  );
};

export default QuickActions;