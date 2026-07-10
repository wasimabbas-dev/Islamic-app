const HeroRight = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Background Circle */}
      <div className="absolute h-112.5 w-112.5 rounded-full bg-violet-100 blur-3xl opacity-60"></div>

      {/* Main Card */}
      <div className="relative w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
        <div className="flex aspect-square items-center justify-center rounded-2xl bg-stone-100">
          <p className="text-center text-gray-500">
            Quran Image
            <br />
            (Coming Soon)
          </p>
        </div>

        {/* Prayer Card */}
        <div className="absolute -bottom-8 -left-8 rounded-2xl bg-white p-5 shadow-lg">
          <p className="text-sm text-gray-500">Next Prayer</p>

          <h3 className="text-xl font-bold text-slate-900">Asr</h3>

          <p className="text-violet-600">4:18 PM</p>
        </div>
      </div>
    </div>
  );
};

export default HeroRight;
