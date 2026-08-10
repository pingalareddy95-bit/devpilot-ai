import { useDashboard } from "../hooks/useDashboard";

import WelcomeBanner from "../widgets/WelcomeBanner";
import StatsGrid from "../widgets/StatsGrid";
import RecentProjects from "../widgets/RecentProjects";
import RecentChats from "../widgets/RecentChats";
import QuickActions from "../widgets/QuickActions";
import LearningWidget from "../widgets/LearningWidget";
import DailyTip from "../widgets/DailyTip";

const DashboardPage = () => {
  const { data, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="flex min-h-full items-center justify-center bg-[#050816] p-6 text-white">
        Loading Dashboard...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-full items-center justify-center bg-[#050816] p-6 text-red-400">
        Failed to load dashboard.
      </div>
    );
  }

  return (
    <div className="bg-[#050816] p-5">

      <div className="space-y-5">

        {/* Welcome */}

        <WelcomeBanner />

        {/* Statistics */}

        <StatsGrid stats={data.stats} />

        {/* Main Dashboard */}

        <div className="grid grid-cols-12 gap-5">

          {/* Left */}

          <div className="col-span-12 space-y-5 xl:col-span-8">

            <RecentProjects
              projects={data.recentProjects}
            />

            <RecentChats
              chats={data.recentChats}
            />

          </div>

          {/* Right */}

          <div className="col-span-12 space-y-5 xl:col-span-4">

            <QuickActions
              actions={data.quickActions}
            />

            <LearningWidget />

            <DailyTip
              tip={data.dailyTip}
            />

          </div>

        </div>

      </div>

    </div>
  );
};

export default DashboardPage;