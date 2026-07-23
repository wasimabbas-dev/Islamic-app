// src/pages/Knowledge/Books.tsx
import React, { useState } from "react";
import { Search, Filter, BookOpen, Star, Users } from "lucide-react";

// Mock data - replace with real data later
const mockBooks = [
  {
    id: 1,
    title: "Al-Hidayah",
    author: "Imam Burhan al-Din al-Marghinani",
    category: "Fiqh",
    rating: 4.8,
    readers: 2450,
    description: "A comprehensive manual of Hanafi jurisprudence",
    year: 1197,
  },
  {
    id: 2,
    title: "Fath al-Qadir",
    author: "Imam Kamal ibn al-Humam",
    category: "Fiqh",
    rating: 4.7,
    readers: 1800,
    description: "Detailed commentary on Hanafi fiqh",
    year: 1457,
  },
  {
    id: 3,
    title: "Mishkat al-Masabih",
    author: "Imam Wali al-Din al-Tabrizi",
    category: "Hadith",
    rating: 4.9,
    readers: 3200,
    description: "Collection of authentic hadiths",
    year: 1340,
  },
];

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Fiqh", "Hadith", "Tafsir", "Aqeedah", "History"];

  const filteredBooks = mockBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Islamic Books
          </h1>
          <p className="text-gray-600">
            Explore our collection of classical Islamic literature
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search books by title or author..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400" size={20} />
              <select
                className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
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
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-start gap-4">
                <div className="bg-violet-100 p-3 rounded-lg flex-shrink-0">
                  <BookOpen className="w-8 h-8 text-violet-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                  <span className="inline-block bg-violet-100 text-violet-700 text-xs px-2 py-1 rounded-full mb-2">
                    {book.category}
                  </span>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {book.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        {book.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {book.readers}
                      </span>
                    </div>
                    <span className="text-xs">{book.year}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No books found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
