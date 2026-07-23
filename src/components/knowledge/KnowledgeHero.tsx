// src/components/knowledge/KnowledgeHero.tsx
import React from "react";
import { Search, BookOpen, Users, GraduationCap } from "lucide-react";

const KnowledgeHero = () => {
  return (
    <section className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Islamic Knowledge Hub
        </h1>
        <p className="text-xl md:text-2xl text-violet-100 mb-8 max-w-3xl mx-auto">
          Explore the depths of Islamic knowledge based on the Hanafi school of
          thought
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-2 flex items-center">
          <Search className="text-gray-400 ml-3" size={20} />
          <input
            type="text"
            placeholder="Search for books, fatwas, articles..."
            className="flex-1 px-4 py-3 outline-none text-gray-800"
          />
          <button className="bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition-colors">
            Search
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <BookOpen className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">500+</div>
            <div className="text-sm text-violet-200">Books</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <GraduationCap className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">100+</div>
            <div className="text-sm text-violet-200">Scholars</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <Users className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">1000+</div>
            <div className="text-sm text-violet-200">Fatwas</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <BookOpen className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">200+</div>
            <div className="text-sm text-violet-200">Articles</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeHero;
