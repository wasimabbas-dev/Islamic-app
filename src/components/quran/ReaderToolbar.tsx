// src/components/quran/ReaderToolbar.tsx
import React from "react";
import { Type, Languages, BookOpen, ChevronDown } from "lucide-react";

interface ReaderToolbarProps {
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  showTranslation: boolean;
  onTranslationToggle: () => void;
  translationLanguage: string;
  onLanguageChange: (language: string) => void;
  onBack: () => void;
}

const ReaderToolbar: React.FC<ReaderToolbarProps> = ({
  fontSize,
  onFontSizeChange,
  showTranslation,
  onTranslationToggle,
  translationLanguage,
  onLanguageChange,
  onBack,
}) => {
  const languages = [
    { code: "en.asad", name: "English (Asad)" },
    { code: "en.sahih", name: "English (Sahih)" },
    { code: "en.yusufali", name: "English (Yusuf Ali)" },
    { code: "ur.jalandhry", name: "Urdu" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6 sticky top-0 z-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
        >
          <BookOpen className="w-5 h-5 mr-2" />
          <span className="font-medium">Back to Surahs</span>
        </button>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Font Size */}
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <div className="flex items-center gap-1">
              <button
                onClick={() => onFontSizeChange(Math.max(14, fontSize - 2))}
                className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                A-
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-300 min-w-[3rem] text-center">
                {fontSize}px
              </span>
              <button
                onClick={() => onFontSizeChange(Math.min(32, fontSize + 2))}
                className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                A+
              </button>
            </div>
          </div>

          {/* Translation Toggle */}
          <button
            onClick={onTranslationToggle}
            className={`flex items-center px-3 py-1.5 rounded-lg transition-colors ${
              showTranslation
                ? "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            }`}
          >
            <Languages className="w-4 h-4 mr-1.5" />
            <span className="text-sm font-medium">
              {showTranslation ? "Translation On" : "Translation Off"}
            </span>
          </button>

          {/* Language Selector */}
          <div className="relative">
            <select
              value={translationLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="appearance-none bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReaderToolbar;
