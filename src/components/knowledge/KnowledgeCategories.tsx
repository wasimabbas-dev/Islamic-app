// src/components/knowledge/KnowledgeCategories.tsx
import React from "react";
import {
  BookOpen,
  FileText,
  Scale,
  Users,
  Calendar,
  Globe,
} from "lucide-react";

interface Category {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  count: number;
}

const categories: Category[] = [
  {
    id: 1,
    title: "Fiqh (Jurisprudence)",
    icon: <Scale className="w-8 h-8" />,
    description: "Detailed rulings based on Hanafi school",
    count: 150,
  },
  {
    id: 2,
    title: "Tafsir (Exegesis)",
    icon: <BookOpen className="w-8 h-8" />,
    description: "Quranic explanations and interpretations",
    count: 85,
  },
  {
    id: 3,
    title: "Hadith Sciences",
    icon: <FileText className="w-8 h-8" />,
    description: "Prophetic traditions and their authenticity",
    count: 120,
  },
  {
    id: 4,
    title: "Islamic History",
    icon: <Calendar className="w-8 h-8" />,
    description: "Historical events and biographies",
    count: 95,
  },
  {
    id: 5,
    title: "Contemporary Issues",
    icon: <Globe className="w-8 h-8" />,
    description: "Modern challenges and Islamic solutions",
    count: 60,
  },
  {
    id: 6,
    title: "Scholars & Personalities",
    icon: <Users className="w-8 h-8" />,
    description: "Biographies and contributions",
    count: 75,
  },
];

const KnowledgeCategories = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore Knowledge Categories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dive into various Islamic sciences and discover authentic knowledge
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className="text-violet-600 group-hover:text-violet-700 transition-colors">
                  {category.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {category.description}
                  </p>
                  <span className="text-xs text-violet-600 font-medium">
                    {category.count} resources
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowledgeCategories;
