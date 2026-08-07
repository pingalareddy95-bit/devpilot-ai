import { FolderOpen } from "lucide-react";
import type { RecentProject } from "../types/dashboard";

interface Props {
  projects: RecentProject[];
}

const statusColor = {
  Running: "bg-green-500",
  Completed: "bg-blue-500",
  Stopped: "bg-red-500",
};

const RecentProjects = ({ projects }: Props) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 shadow-lg">

      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

        <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
          <FolderOpen size={20} />
          Recent Projects
        </h2>

        <button className="text-xs uppercase tracking-wide text-blue-400 hover:text-blue-300">
          View All
        </button>

      </div>

      <table className="w-full">

        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
            <th className="px-5 py-3">Project</th>
            <th>Language</th>
            <th>Status</th>
            <th>Updated</th>
          </tr>
        </thead>

        <tbody>

          {projects.map((project) => (
            <tr
              key={project.id}
              className="border-t border-slate-800 hover:bg-slate-800/40 transition"
            >
              <td className="px-5 py-3 font-medium text-white">
                {project.name}
              </td>

              <td className="text-slate-300">
                {project.language}
              </td>

              <td>
                <span
                  className={`inline-flex h-2.5 w-2.5 rounded-full ${
                    statusColor[project.status]
                  }`}
                />
              </td>

              <td className="text-slate-400">
                {project.updated}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default RecentProjects;