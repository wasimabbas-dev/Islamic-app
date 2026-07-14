// src/components/quran/SurahList.tsx
import React from "react";
import { BookOpen, ChevronRight } from "lucide-react";
// import { Surah } from "../../data/mockQuran";
import type { Surah } from '../../data/mockQuran';  // ✅ This should work
interface SurahListProps {
  surahs: Surah[];
  onSurahSelect: (surah: Surah) => void;
}

const SurahList: React.FC<SurahListProps> = ({ surahs, onSurahSelect }) => {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {surahs.map((surah) => (
        <button
          key={surah.number}
          onClick={() => onSurahSelect(surah)}
          className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 text-left border border-transparent hover:border-emerald-200 dark:hover:border-emerald-700"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                <span className="text-emerald-600 dark:text-emerald-400 font-arabic text-lg">
                  {surah.number}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {surah.englishName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {surah.englishNameTranslation}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
          </div>

          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              {surah.revelationType} • {surah.numberOfAyahs} verses
            </span>
            <span className="text-lg font-arabic text-gray-700 dark:text-gray-300">
              {surah.name}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default SurahList;
