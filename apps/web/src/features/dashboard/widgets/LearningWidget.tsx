import {
  ArrowRight,
  GraduationCap,
} from "lucide-react";

const LearningWidget = () => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-lg">

      <div className="flex items-center gap-3">

        <GraduationCap className="text-blue-400" />

        <h2 className="text-lg font-semibold text-white">
          Continue Learning
        </h2>

      </div>

      <div className="mt-5">

        <h3 className="font-semibold text-white">
          Advanced React Patterns
        </h3>

        <div className="mt-2 flex items-center justify-between">

          <span className="text-sm text-slate-400">
            Progress
          </span>

          <span className="text-sm text-blue-400">
            70%
          </span>

        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-700">

          <div className="h-full w-[70%] rounded-full bg-blue-500" />

        </div>

        <button
          className="
          mt-5
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-lg
          bg-blue-600
          py-2.5
          font-medium
          text-white
          transition
          hover:bg-blue-500
        "
        >
          Continue Learning

          <ArrowRight size={18} />

        </button>

      </div>

    </div>
  );
};

export default LearningWidget;