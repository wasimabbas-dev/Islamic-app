// src/components/knowledge/PopularArticles.tsx
import React from "react";
import { Calendar, Clock, Eye, ChevronRight } from "lucide-react";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  views: number;
}

const articles: Article[] = [
  {
    id: 1,
    title: "The Importance of Intention in Islamic Jurisprudence",
    excerpt:
      "Understanding the role of niyyah in validating acts of worship...",
    category: "Fiqh",
    author: "Dr. Muhammad Ahmed",
    date: "2024-01-15",
    readTime: "5 min",
    views: 1200,
  },
  {
    id: 2,
    title: "Contemporary Issues in Islamic Finance",
    excerpt:
      "Exploring modern financial challenges through Islamic principles...",
    category: "Economics",
    author: "Prof. Ali Hassan",
    date: "2024-01-12",
    readTime: "7 min",
    views: 950,
  },
  {
    id: 3,
    title: "Understanding the Principles of Ijtihad",
    excerpt: "A comprehensive guide to independent reasoning in Islamic law...",
    category: "Usul al-Fiqh",
    author: "Shaykh Umar Khan",
    date: "2024-01-10",
    readTime: "6 min",
    views: 875,
  },
];

const PopularArticles = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Popular Articles
            </h2>
            <p className="text-gray-600">
              Recently published and trending content
            </p>
          </div>
          <button className="text-violet-600 font-medium hover:text-violet-700 transition-colors">
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="bg-violet-100 text-violet-700 text-xs px-3 py-1 rounded-full">
                  {article.category}
                </span>
                <span className="text-sm text-gray-500">{article.date}</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2 hover:text-violet-600 transition-colors cursor-pointer">
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {article.views}
                  </span>
                </div>
                <button className="text-violet-600 hover:text-violet-700 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularArticles;
