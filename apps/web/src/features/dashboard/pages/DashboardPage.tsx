import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Topbar from "@/components/layout/Topbar/Topbar";

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
      <div className="flex h-screen items-center justify-center bg-[#050816] text-white">
        Loading Dashboard...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#050816] text-red-400">
        Failed to load dashboard.
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#050816]">

      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">

        <Topbar />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-5">

          <div className="space-y-5">

            <WelcomeBanner />

            <StatsGrid stats={data.stats} />

            <div className="grid grid-cols-12 gap-5">

              <div className="col-span-12 xl:col-span-8 space-y-5">

                <RecentProjects projects={data.recentProjects} />

                <RecentChats chats={data.recentChats} />

              </div>

              <div className="col-span-12 xl:col-span-4 space-y-5">

                <QuickActions actions={data.quickActions} />

                <LearningWidget />

                <DailyTip tip={data.dailyTip} />

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default DashboardPage;