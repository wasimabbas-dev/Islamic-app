// src/constants/Navigation.ts
export interface NavLinkItem {
  title: string;
  path: string;
  dropdown?: boolean;
  children?: NavLinkItem[];
}

export const navLinks: NavLinkItem[] = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Q&A",
    path: "/qa",
  },
  {
    title: "Scholar Directory",
    path: "/scholars",
  },
  {
    title: "Quran",
    path: "/quran",
  },
  {
    title: "Hadith",
    path: "/hadith",
  },
  {
    title: "Knowledge",
    path: "/knowledge",
    dropdown: true,
    children: [
      {
        title: "📚 Books",
        path: "/knowledge/books",
      },
      {
        title: "📝 Articles",
        path: "/knowledge/articles",
      },
      {
        title: "⚖️ Fatwas",
        path: "/knowledge/fatwas",
      },
      {
        title: "👨‍🏫 Scholars",
        path: "/knowledge/scholars",
      },
    ],
  },
  {
    title: "About Us",
    path: "/about",
  },
  {
    title: "Admin",
    path: "/admin"
  }
];
