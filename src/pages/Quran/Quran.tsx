// src/pages/Quran/Quran.tsx
import React, { useState, useCallback } from "react";
import {
  SurahList,
  QuranReader,
  ReaderToolbar,
  SearchBar,
  Loading,
} from "../../types/Index";
import {
  mockSurahs,
  mockAyahsForSurah1,
  generateMockAyahs,
  type Surah,
  type Ayah,
} from "../../data/mockQuran";
import { BookOpen } from "lucide-react";

const Quran: React.FC = () => {
  const [surahs] = useState<Surah[]>(mockSurahs);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [fontSize, setFontSize] = useState<number>(20);
  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  const [translationLanguage, setTranslationLanguage] =
    useState<string>("en.asad");
  const [viewMode, setViewMode] = useState<"list" | "reader">("list");

  const AYAHS_PER_PAGE = 10;

  const handleSurahSelect = useCallback((surah: Surah) => {
    setLoading(true);
    setSelectedSurah(surah);

    // Simulate loading
    setTimeout(() => {
      let ayahsData: Ayah[];

      // Use real ayahs for Surah Al-Fatiha, generate mock for others
      if (surah.number === 1) {
        ayahsData = mockAyahsForSurah1;
      } else {
        ayahsData = generateMockAyahs(surah.number, surah.numberOfAyahs);
      }

      setAyahs(ayahsData);
      setTotalPages(Math.ceil(ayahsData.length / AYAHS_PER_PAGE));
      setCurrentPage(1);
      setViewMode("reader");
      setLoading(false);
    }, 800);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchTerm(query);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
  };

  const handleTranslationToggle = () => {
    setShowTranslation(!showTranslation);
  };

  const handleLanguageChange = (language: string) => {
    setTranslationLanguage(language);
  };

  const goBack = () => {
    setViewMode("list");
    setSelectedSurah(null);
    setAyahs([]);
    setSearchTerm("");
  };

  // Filter surahs based on search
  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.name.includes(searchTerm) ||
      surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.englishNameTranslation
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50/50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === "list" ? (
          <>
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-900/30 mb-4">
                <BookOpen className="w-8 h-8 text-violet-600 dark:text-violet-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                The Holy Quran
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Select a surah to begin your journey
              </p>
            </div>

            <div className="mb-6">
              <SearchBar onSearch={handleSearch} />
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {filteredSurahs.length} surahs found
              </div>
            </div>

            <SurahList
              surahs={filteredSurahs}
              onSurahSelect={handleSurahSelect}
            />
          </>
        ) : (
          <>
            <ReaderToolbar
              fontSize={fontSize}
              onFontSizeChange={handleFontSizeChange}
              showTranslation={showTranslation}
              onTranslationToggle={handleTranslationToggle}
              translationLanguage={translationLanguage}
              onLanguageChange={handleLanguageChange}
              onBack={goBack}
            />

            <QuranReader
              ayahs={ayahs}
              surahName={selectedSurah?.name || ""}
              surahEnglishName={selectedSurah?.englishName || ""}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              fontSize={fontSize}
              showTranslation={showTranslation}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Quran;
