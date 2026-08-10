import {
  LayoutDashboard,
  MessageSquare,
  Code2,
  Bug,
  Database,
  GraduationCap,
  Settings,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

interface MenuItem {
  icon: typeof LayoutDashboard;
  label: string;
  path: string;
}

const menu: MenuItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/",
  },
  {
    icon: MessageSquare,
    label: "Assistant",
    path: "/assistant",
  },
  {
    icon: Code2,
    label: "Workspace",
    path: "/workspace",
  },
  {
    icon: Bug,
    label: "Debugger",
    path: "/debugger",
  },
  {
    icon: Database,
    label: "Database",
    path: "/database",
  },
  {
    icon: GraduationCap,
    label: "Learning",
    path: "/learning",
  },
  {
    icon: Settings,
    label: "Settings",
    path: "/settings",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className="
        flex
        h-screen
        w-64
        flex-shrink-0
        flex-col
        overflow-hidden
        border-r
        border-slate-800
        bg-slate-950
      "
    >
      {/* ========================================================= */}
      {/* LOGO */}
      {/* ========================================================= */}

      <div className="flex h-16 flex-shrink-0 items-center border-b border-slate-800 px-5">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 shadow-lg shadow-blue-600/20">
            <Sparkles size={19} className="text-white" />
          </div>

          <div className="text-left">
            <h1 className="text-lg font-bold tracking-tight text-white">
              DevPilot
            </h1>

            <p className="text-[10px] font-medium uppercase tracking-wider text-blue-400">
              AI Developer
            </p>
          </div>
        </button>
      </div>

      {/* ========================================================= */}
      {/* NAVIGATION */}
      {/* ========================================================= */}

      <nav className="flex-1 overflow-y-auto px-3 py-5">

        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          Main Menu
        </p>

        <div className="space-y-1">

          {menu.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => navigate(item.path)}
                className={`
                  group
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-2.5
                  text-left
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                  ${
                    active
                      ? "bg-blue-600/15 text-blue-400 shadow-sm"
                      : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
                  }
                `}
              >
                {/* Icon */}

                <div
                  className={`
                    flex
                    h-8
                    w-8
                    flex-shrink-0
                    items-center
                    justify-center
                    rounded-md
                    transition-all
                    ${
                      active
                        ? "bg-blue-600 text-white"
                        : "bg-slate-900 text-slate-500 group-hover:bg-slate-800 group-hover:text-slate-200"
                    }
                  `}
                >
                  <Icon size={17} />
                </div>

                {/* Label */}

                <span className="flex-1 truncate">
                  {item.label}
                </span>

                {/* Active indicator */}

                <ChevronRight
                  size={15}
                  className={`
                    transition-all
                    ${
                      active
                        ? "translate-x-0 text-blue-400 opacity-100"
                        : "-translate-x-1 text-slate-600 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    }
                  `}
                />

              </button>
            );
          })}

        </div>
      </nav>

      {/* ========================================================= */}
      {/* BOTTOM STATUS */}
      {/* ========================================================= */}

      <div className="flex-shrink-0 border-t border-slate-800 p-3">

        <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">

          <div className="flex items-center gap-2">

            <span className="h-2 w-2 rounded-full bg-green-400 shadow-sm shadow-green-400/50" />

            <span className="text-xs font-medium text-slate-300">
              AI Engine Online
            </span>

          </div>

          <p className="mt-1 pl-4 text-[10px] text-slate-500">
            DevPilot AI ready
          </p>

        </div>

      </div>
    </aside>
  );
}