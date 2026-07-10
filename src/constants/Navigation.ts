export interface NavLinkItem {
  title: string;
  path: string;
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
  },
  {
    title: "About Us",
    path: "/about",
  },
];

// export const navLinks = [
//   {
//     title: "Home",
//     path: "/",
//   },
//   {
//     title: "Q&A",
//     path: "/questions",
//   },
//   {
//     title: "Scholar Directory",
//     path: "/scholars",
//   },
//   {
//     title: "Quran",
//     path: "/quran",
//   },
//   {
//     title: "Hadith",
//     path: "/hadith",
//   },
//   {
//     title: "Knowledge",
//     path: "/knowledge",
//     dropdown: true,
//     children: [
//       {
//         title: "Books",
//         path: "/books",
//       },
//       {
//         title: "Articles",
//         path: "/articles",
//       },
//       {
//         title: "Fatwas",
//         path: "/fatwas",
//       },
//     ],
//   },
//   {
//     title: "About Us",
//     path: "/about",
//   },
// ];
