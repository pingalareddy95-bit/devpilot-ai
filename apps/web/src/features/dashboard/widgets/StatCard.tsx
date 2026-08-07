import {
  MessageSquare,
  FolderOpen,
  Globe,
  Clock3,
  TrendingUp,
} from "lucide-react";

import type { DashboardStat } from "../types/dashboard";

interface Props {
  stat: DashboardStat;
}

const iconMap = {
  "AI Chats": MessageSquare,
  Projects: FolderOpen,
  "APIs Built": Globe,
  "Hours Saved": Clock3,
};

const colorMap = {
  "AI Chats": "bg-blue-500/20 text-blue-400",
  Projects: "bg-green-500/20 text-green-400",
  "APIs Built": "bg-purple-500/20 text-purple-400",
  "Hours Saved": "bg-orange-500/20 text-orange-400",
};

const StatCard = ({ stat }: Props) => {
  const Icon =
    iconMap[stat.title as keyof typeof iconMap] ?? MessageSquare;

  const color =
    colorMap[stat.title as keyof typeof colorMap] ??
    "bg-slate-700 text-white";

  return (
    <div
      className="
      rounded-xl
      border
      border-slate-800
      bg-slate-900
      p-4
      shadow-lg
      transition-all
      duration-300
      hover:border-blue-500
      hover:shadow-blue-900/30
      hover:-translate-y-1
    "
    >
      <div className="flex items-center justify-between">

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-lg ${color}`}
        >
          <Icon size={20} />
        </div>

        <div className="flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-1 text-xs text-green-400">
          <TrendingUp size={14} />
          +12%
        </div>

      </div>

      <p className="mt-4 text-sm text-slate-400">
        {stat.title}
      </p>

      <h2 className="mt-1 text-3xl font-bold text-white">
        {stat.value}
      </h2>

      <p className="mt-2 text-xs text-slate-500">
        Compared to yesterday
      </p>
    </div>
  );
};

export default StatCard;