// src/data/mockQuran.ts

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
}

export interface Ayah {
  number: number;
  text: string;
  translation: string;
  numberInSurah: number;
  juz: number;
  page: number;
  sajda: boolean;
}

// List of all 114 Surahs (shortened for demo, add all if needed)
export const mockSurahs: Surah[] = [
  {
    number: 1,
    name: "الفاتحة",
    englishName: "Al-Fatiha",
    englishNameTranslation: "The Opening",
    revelationType: "Meccan",
    numberOfAyahs: 7,
  },
  {
    number: 2,
    name: "البقرة",
    englishName: "Al-Baqarah",
    englishNameTranslation: "The Cow",
    revelationType: "Medinan",
    numberOfAyahs: 286,
  },
  {
    number: 3,
    name: "آل عمران",
    englishName: "Aal-Imran",
    englishNameTranslation: "The Family of Imran",
    revelationType: "Medinan",
    numberOfAyahs: 200,
  },
  {
    number: 4,
    name: "النساء",
    englishName: "An-Nisa",
    englishNameTranslation: "The Women",
    revelationType: "Medinan",
    numberOfAyahs: 176,
  },
  {
    number: 5,
    name: "المائدة",
    englishName: "Al-Ma'idah",
    englishNameTranslation: "The Table Spread",
    revelationType: "Medinan",
    numberOfAyahs: 120,
  },
  {
    number: 6,
    name: "الأنعام",
    englishName: "Al-An'am",
    englishNameTranslation: "The Cattle",
    revelationType: "Meccan",
    numberOfAyahs: 165,
  },
  {
    number: 7,
    name: "الأعراف",
    englishName: "Al-A'raf",
    englishNameTranslation: "The Heights",
    revelationType: "Meccan",
    numberOfAyahs: 206,
  },
  {
    number: 8,
    name: "الأنفال",
    englishName: "Al-Anfal",
    englishNameTranslation: "The Spoils of War",
    revelationType: "Medinan",
    numberOfAyahs: 75,
  },
  {
    number: 9,
    name: "التوبة",
    englishName: "At-Tawbah",
    englishNameTranslation: "The Repentance",
    revelationType: "Medinan",
    numberOfAyahs: 129,
  },
  {
    number: 10,
    name: "يونس",
    englishName: "Yunus",
    englishNameTranslation: "Jonah",
    revelationType: "Meccan",
    numberOfAyahs: 109,
  },
  // Add more surahs as needed, or generate them
];

// Mock Ayahs for Surah Al-Fatiha (Surah 1)
export const mockAyahsForSurah1: Ayah[] = [
  {
    number: 1,
    text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    translation: "In the name of Allah, the Most Gracious, the Most Merciful.",
    numberInSurah: 1,
    juz: 1,
    page: 1,
    sajda: false,
  },
  {
    number: 2,
    text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    translation: "All praise is due to Allah, Lord of the worlds.",
    numberInSurah: 2,
    juz: 1,
    page: 1,
    sajda: false,
  },
  {
    number: 3,
    text: "الرَّحْمَٰنِ الرَّحِيمِ",
    translation: "The Most Gracious, the Most Merciful.",
    numberInSurah: 3,
    juz: 1,
    page: 1,
    sajda: false,
  },
  {
    number: 4,
    text: "مَالِكِ يَوْمِ الدِّينِ",
    translation: "Master of the Day of Judgment.",
    numberInSurah: 4,
    juz: 1,
    page: 1,
    sajda: false,
  },
  {
    number: 5,
    text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    translation: "You alone we worship, and You alone we ask for help.",
    numberInSurah: 5,
    juz: 1,
    page: 1,
    sajda: false,
  },
  {
    number: 6,
    text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    translation: "Guide us to the straight path.",
    numberInSurah: 6,
    juz: 1,
    page: 1,
    sajda: false,
  },
  {
    number: 7,
    text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    translation:
      "The path of those upon whom You have bestowed favor, not of those who have evoked Your anger or of those who are astray.",
    numberInSurah: 7,
    juz: 1,
    page: 1,
    sajda: false,
  },
];

// Function to generate mock ayahs for any surah
export const generateMockAyahs = (
  surahNumber: number,
  count: number,
): Ayah[] => {
  const ayahs: Ayah[] = [];
  for (let i = 1; i <= Math.min(count, 20); i++) {
    ayahs.push({
      number: i,
      text: `آيَةُ ${i} مِنْ سُورَةِ ${surahNumber}`,
      translation: `Verse ${i} of Surah ${surahNumber}: This is a translation for demonstration.`,
      numberInSurah: i,
      juz: Math.ceil(i / 20),
      page: Math.ceil(i / 15),
      sajda: false,
    });
  }
  return ayahs;
};
