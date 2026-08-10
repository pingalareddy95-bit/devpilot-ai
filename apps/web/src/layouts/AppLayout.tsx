import { Outlet } from "react-router-dom";

import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Topbar from "@/components/layout/Topbar/Topbar";

const AppLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#050816]">

      {/* ====================================================== */}
      {/* SIDEBAR */}
      {/* ====================================================== */}

      <Sidebar />

      {/* ====================================================== */}
      {/* APPLICATION AREA */}
      {/* ====================================================== */}

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">

        {/* ================================================== */}
        {/* TOPBAR */}
        {/* ================================================== */}

        <div className="flex-shrink-0">
          <Topbar />
        </div>

        {/* ================================================== */}
        {/* PAGE CONTENT */}
        {/* ================================================== */}

        <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AppLayout;