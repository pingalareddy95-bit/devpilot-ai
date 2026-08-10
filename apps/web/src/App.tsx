import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";

import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import WorkspacePage from "@/features/workspace/pages/WorkspacePage";
import AssistantPage from "@/features/assistant/pages/AssistantPage";

const PlaceholderPage = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex min-h-full items-center justify-center p-8">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">

        <h1 className="text-3xl font-bold text-white">
          {title}
        </h1>

        <p className="mt-3 text-slate-400">
          {description}
        </p>

        <div className="mt-6 inline-flex rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
          Coming soon
        </div>

      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>

      <Routes>

        {/* ====================================================== */}
        {/* APPLICATION LAYOUT */}
        {/* ====================================================== */}

        <Route element={<AppLayout />}>

          {/* Dashboard */}

          <Route
            path="/"
            element={<DashboardPage />}
          />

          {/* Workspace */}

          <Route
            path="/workspace"
            element={<WorkspacePage />}
          />

          {/* Assistant */}

          <Route
            path="/assistant"
            element={<AssistantPage />}
          />

          {/* Debugger */}

          <Route
            path="/debugger"
            element={
              <PlaceholderPage
                title="Debugger"
                description="AI-powered debugging tools will be available here."
              />
            }
          />

          {/* Database */}

          <Route
            path="/database"
            element={
              <PlaceholderPage
                title="Database"
                description="SQL playground and database tools will be available here."
              />
            }
          />

          {/* Learning */}

          <Route
            path="/learning"
            element={
              <PlaceholderPage
                title="Learning"
                description="Developer learning modules will be available here."
              />
            }
          />

          {/* Settings */}

          <Route
            path="/settings"
            element={
              <PlaceholderPage
                title="Settings"
                description="Application settings will be available here."
              />
            }
          />

        </Route>

        {/* ====================================================== */}
        {/* FALLBACK */}
        {/* ====================================================== */}

        <Route
          path="*"
          element={
            <PlaceholderPage
              title="404"
              description="The page you're looking for doesn't exist."
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
};

export default App;