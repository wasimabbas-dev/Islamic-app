// src/pages/Knowledge/Articles.tsx
import React, { useState } from "react";
import { Search, Calendar, Clock, Eye, ChevronRight, Tag } from "lucide-react";

const mockArticles = [
  {
    id: 1,
    title: "The Importance of Intention in Islamic Jurisprudence",
    excerpt:
      "Understanding the role of niyyah in validating acts of worship and its implications in daily life...",
    category: "Fiqh",
    author: "Dr. Muhammad Ahmed",
    date: "2024-01-15",
    readTime: "5 min",
    views: 1200,
    tags: ["Intention", "Worship", "Jurisprudence"],
  },
  {
    id: 2,
    title: "Contemporary Issues in Islamic Finance",
    excerpt:
      "Exploring modern financial challenges through Islamic principles and solutions...",
    category: "Economics",
    author: "Prof. Ali Hassan",
    date: "2024-01-12",
    readTime: "7 min",
    views: 950,
    tags: ["Finance", "Economics", "Modern"],
  },
  {
    id: 3,
    title: "Understanding the Principles of Ijtihad",
    excerpt:
      "A comprehensive guide to independent reasoning in Islamic law and its application today...",
    category: "Usul al-Fiqh",
    author: "Shaykh Umar Khan",
    date: "2024-01-10",
    readTime: "6 min",
    views: 875,
    tags: ["Ijtihad", "Islamic Law", "Reasoning"],
  },
];

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Fiqh",
    "Economics",
    "Usul al-Fiqh",
    "History",
    "Spirituality",
  ];

  const filteredArticles = mockArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Islamic Articles
          </h1>
          <p className="text-gray-600">
            Insightful articles on various Islamic topics
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-gray-50 rounded-xl p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Articles List */}
        <div className="space-y-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="bg-violet-100 text-violet-700 text-xs px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {article.date}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-xl mb-2 hover:text-violet-600 transition-colors cursor-pointer">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{article.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="text-gray-600">By {article.author}</span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <Eye className="w-4 h-4" />
                      {article.views} views
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="text-violet-600 hover:text-violet-700 transition-colors self-start md:self-center">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No articles found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;
