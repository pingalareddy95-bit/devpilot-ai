import type { DashboardStat } from "../types/dashboard";
import StatCard from "./StatCard";

interface Props {
  stats: DashboardStat[];
}

const StatsGrid = ({ stats }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <StatCard key={item.title} stat={item} />
      ))}
    </div>
  );
};

export default StatsGrid;