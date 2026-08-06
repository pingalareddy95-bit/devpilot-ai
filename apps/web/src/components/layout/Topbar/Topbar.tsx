import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-8 h-16">
      <div className="flex items-center gap-3 rounded-lg bg-slate-900 px-4 py-2">
        <Search size={18} />
        <span className="text-slate-400">Search...</span>
      </div>

      <div className="flex items-center gap-6 text-slate-300">
        <Bell size={20} />
        <UserCircle2 size={28} />
      </div>
    </header>
  );
}