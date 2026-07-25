// src/components/quran/QuranReader.tsx
import React from 'react';
import { type Ayah } from '../../data/mockQuran';
import AyahCard from './AyahCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface QuranReaderProps {
  ayahs: Ayah[];
  surahName: string;
  surahEnglishName: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  fontSize: number;
  showTranslation: boolean;
  showTransliteration?: boolean;
  showTafsir?: boolean;
  bookmarks?: number[];
  onToggleBookmark?: (ayahNumber: number) => void;
  onShareAyah?: (ayah: Ayah) => void;
  theme?: 'light' | 'dark' | 'sepia';
  readingMode?: 'standard' | 'tajweed' | 'simple';
  currentAyahIndex?: number;
  onAyahClick?: (index: number) => void;
}

const QuranReader: React.FC<QuranReaderProps> = ({
  ayahs,
  surahName,
  surahEnglishName,
  currentPage,
  totalPages,
  onPageChange,
  fontSize,
  showTranslation,
  showTransliteration = false,
  showTafsir = false,
  bookmarks = [],
  onToggleBookmark,
  onShareAyah,
  theme = 'light',
  readingMode = 'standard',
  currentAyahIndex = 0,
  onAyahClick
}) => {
  const AYAHS_PER_PAGE = 10;
  const startIndex = (currentPage - 1) * AYAHS_PER_PAGE;
  const currentAyahs = ayahs.slice(startIndex, startIndex + AYAHS_PER_PAGE);

  // Theme styles
  const getThemeStyles = () => {
    switch (theme) {
      case 'sepia':
        return 'bg-[#f4ecd8]';
      case 'dark':
        return 'bg-gray-900';
      default:
        return 'bg-white dark:bg-gray-800';
    }
  };

  const getTextColor = () => {
    switch (theme) {
      case 'sepia':
        return 'text-[#5b4b3a]';
      case 'dark':
        return 'text-gray-200';
      default:
        return 'text-gray-900';
    }
  };

  return (
    <div className={`${getThemeStyles()} rounded-2xl shadow-xl p-6 md:p-8 transition-colors duration-300`}>
      {/* Surah Header */}
      <div className={`text-center border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} pb-6 mb-6`}>
        <h2 className={`text-3xl font-arabic ${getTextColor()} mb-2`}>
          {surahName}
        </h2>
        <p className={`${theme === 'sepia' ? 'text-[#7a6b5a]' : 'text-gray-600 dark:text-gray-400'}`}>
          {surahEnglishName} • {ayahs.length} verses
        </p>
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
          Page {currentPage} of {totalPages}
        </div>
      </div>

      {/* Ayahs */}
      <div className="space-y-4">
        {currentAyahs.map((ayah, index) => {
          const globalIndex = startIndex + index;
          return (
            <AyahCard
              key={ayah.number}
              ayah={ayah}
              fontSize={fontSize}
              showTranslation={showTranslation}
              showTransliteration={showTransliteration}
              showTafsir={showTafsir}
              isBookmarked={bookmarks.includes(ayah.number)}
              onToggleBookmark={onToggleBookmark}
              onShareAyah={onShareAyah}
              isActive={globalIndex === currentAyahIndex}
              onAyahClick={() => onAyahClick?.(globalIndex)}
              theme={theme}
              readingMode={readingMode}
            />
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={`flex items-center justify-between mt-8 pt-6 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center px-4 py-2 text-sm font-medium ${
              theme === 'dark' 
                ? 'text-gray-300 bg-gray-700 hover:bg-gray-600' 
                : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
            } rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>
          
          <span className={`text-sm ${theme === 'sepia' ? 'text-[#7a6b5a]' : 'text-gray-600 dark:text-gray-400'}`}>
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center px-4 py-2 text-sm font-medium ${
              theme === 'dark' 
                ? 'text-gray-300 bg-gray-700 hover:bg-gray-600' 
                : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
            } rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default QuranReader;