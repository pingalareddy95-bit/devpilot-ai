import { Lightbulb } from "lucide-react";

interface Props {
  tip: string;
}

const DailyTip = ({ tip }: Props) => {
  return (
    <div className="rounded-xl border-l-4 border-yellow-400 bg-yellow-500/10 p-5 shadow-lg">

      <div className="flex items-center gap-3">

        <div className="rounded-lg bg-yellow-500/20 p-2">

          <Lightbulb
            size={20}
            className="text-yellow-400"
          />

        </div>

        <h2 className="font-semibold text-white">
          Daily Tip
        </h2>

      </div>

      <p className="mt-4 text-sm leading-7 text-slate-300">
        {tip}
      </p>

    </div>
  );
};

export default DailyTip;