import Sidebar from "../../../components/layout/Sidebar/Sidebar";
import Topbar from "../../../components/layout/Topbar/Topbar";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 p-10">
          <h1 className="text-4xl font-bold">
            Welcome to DevPilot AI 👋
          </h1>

          <p className="mt-3 text-slate-400">
            Your AI-powered developer workspace.
          </p>
        </main>
      </div>
    </div>
  );
}