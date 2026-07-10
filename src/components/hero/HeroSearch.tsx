import { Search } from "lucide-react";

const HeroSearch = () => {
  return (
    <div className="flex overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <input
        type="text"
        placeholder="Search fatwas, Quran, Hadith..."
        className="flex-1 px-5 py-4 outline-none"
      />

      <button className="flex items-center gap-2 bg-violet-600 px-6 text-white transition hover:bg-violet-700">
        <Search size={18} />
        Search
      </button>
    </div>
  );
};

export default HeroSearch;
