import {
  LayoutDashboard,
  MessageSquare,
  Code2,
  Bug,
  Database,
  GraduationCap,
  Settings,
} from "lucide-react";

const menu = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: MessageSquare, label: "Assistant" },
  { icon: Code2, label: "Workspace" },
  { icon: Bug, label: "Debugger" },
  { icon: Database, label: "Database" },
  { icon: GraduationCap, label: "Learning" },
  { icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 h-screen p-6">
      <h1 className="text-2xl font-bold text-blue-500 mb-10">
        DevPilot AI
      </h1>

      <nav className="space-y-3">
        {menu.map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-3 w-full rounded-lg p-3 text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}