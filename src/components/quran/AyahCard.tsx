// src/components/quran/AyahCard.tsx
import React, { useState } from "react";
import type { Ayah } from "../../data/mockQuran";
import { Copy, Bookmark, Share2 } from "lucide-react";

interface AyahCardProps {
  ayah: Ayah;
  fontSize: number;
  showTranslation: boolean;
}

const AyahCard: React.FC<AyahCardProps> = ({
  ayah,
  fontSize,
  showTranslation,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ayah.text);
    // You can add a toast notification here
  };

  return (
    <div className="group relative p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mt-1">
          <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            {ayah.numberInSurah}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <p
            className="text-right font-arabic leading-loose text-gray-900 dark:text-white"
            style={{ fontSize: `${fontSize}px` }}
          >
            {ayah.text}
          </p>

          {showTranslation && (
            <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-3">
              {ayah.translation}
            </p>
          )}
        </div>
      </div>

      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title="Copy"
        >
          <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title="Bookmark"
        >
          <Bookmark
            className={`w-4 h-4 ${isBookmarked ? "fill-emerald-500 text-emerald-500" : "text-gray-500 dark:text-gray-400"}`}
          />
        </button>
        <button
          className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title="Share"
        >
          <Share2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default AyahCard;
