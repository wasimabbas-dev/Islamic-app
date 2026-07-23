// src/pages/Knowledge/Fatwas.tsx
import React, { useState } from "react";
import {
  Search,
  Scale,
  User,
  Calendar,
  ArrowRight,
  Filter,
} from "lucide-react";

const mockFatwas = [
  {
    id: 1,
    question: "What is the ruling on cryptocurrency in Islam?",
    answer:
      "Based on the Hanafi school, cryptocurrency is considered impermissible due to uncertainty and speculation...",
    scholar: "Mufti Muhammad Taqi Usmani",
    category: "Finance",
    date: "2024-01-14",
    views: 450,
  },
  {
    id: 2,
    question: "How to perform Salah for a traveler?",
    answer:
      "According to Hanafi jurisprudence, a traveler can shorten the four-rakat prayers to two rakat...",
    scholar: "Mufti Shafiqur Rahman",
    category: "Worship",
    date: "2024-01-13",
    views: 320,
  },
  {
    id: 3,
    question: "The ruling on insurance in Islam",
    answer:
      "Conventional insurance is considered impermissible due to the elements of interest and gambling...",
    scholar: "Mufti Abdul Wahid",
    category: "Business",
    date: "2024-01-12",
    views: 280,
  },
];

const Fatwas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Finance",
    "Worship",
    "Business",
    "Family",
    "Society",
  ];

  const filteredFatwas = mockFatwas.filter((fatwa) => {
    const matchesSearch =
      fatwa.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fatwa.scholar.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || fatwa.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Islamic Fatwas
          </h1>
          <p className="text-gray-600">
            Authentic Islamic rulings from qualified scholars
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
                placeholder="Search fatwas by question or scholar..."
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

        {/* Fatwas List */}
        <div className="space-y-4">
          {filteredFatwas.map((fatwa) => (
            <div
              key={fatwa.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-start gap-4">
                <div className="bg-violet-100 p-3 rounded-lg flex-shrink-0">
                  <Scale className="w-6 h-6 text-violet-600" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {fatwa.question}
                    </h3>
                    <span className="bg-violet-100 text-violet-700 text-xs px-3 py-1 rounded-full">
                      {fatwa.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{fatwa.answer}</p>
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {fatwa.scholar}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {fatwa.date}
                      </span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                        {fatwa.views} views
                      </span>
                    </div>
                    <button className="text-violet-600 hover:text-violet-700 text-sm font-medium flex items-center gap-1 mt-2 md:mt-0">
                      Read Full Fatwa
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFatwas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No fatwas found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fatwas;
