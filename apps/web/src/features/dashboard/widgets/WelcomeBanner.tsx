const WelcomeBanner = () => {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <div className="rounded-xl border border-slate-700 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 p-6 shadow-lg">

      <h1 className="text-4xl font-bold text-white">
        {greeting}
      </h1>

      <p className="mt-2 text-xl text-slate-300">
        Welcome back to DevPilot AI
      </p>

      <p className="mt-2 text-slate-400">
        Let's build something amazing today.
      </p>

    </div>
  );
};

export default WelcomeBanner;