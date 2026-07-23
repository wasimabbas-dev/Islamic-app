// src/components/knowledge/FeaturedFatwas.tsx
import React from "react";
import { Scale, User, Calendar, ArrowRight } from "lucide-react";

interface Fatwa {
  id: number;
  question: string;
  answer: string;
  scholar: string;
  category: string;
  date: string;
}

const fatwas: Fatwa[] = [
  {
    id: 1,
    question: "What is the ruling on cryptocurrency in Islam?",
    answer: "Based on the Hanafi school, cryptocurrency is considered...",
    scholar: "Mufti Muhammad Taqi Usmani",
    category: "Finance",
    date: "2024-01-14",
  },
  {
    id: 2,
    question: "How to perform Salah for a traveler?",
    answer: "According to Hanafi jurisprudence, a traveler can shorten...",
    scholar: "Mufti Shafiqur Rahman",
    category: "Worship",
    date: "2024-01-13",
  },
  {
    id: 3,
    question: "The ruling on insurance in Islam",
    answer: "Conventional insurance is considered impermissible...",
    scholar: "Mufti Abdul Wahid",
    category: "Business",
    date: "2024-01-12",
  },
];

const FeaturedFatwas = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Featured Fatwas
            </h2>
            <p className="text-gray-600">
              Authentic Islamic rulings from qualified scholars
            </p>
          </div>
          <button className="text-violet-600 font-medium hover:text-violet-700 transition-colors">
            View All →
          </button>
        </div>

        <div className="space-y-4">
          {fatwas.map((fatwa) => (
            <div
              key={fatwa.id}
              className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200"
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
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {fatwa.answer}
                  </p>
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {fatwa.scholar}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {fatwa.date}
                      </span>
                    </div>
                    <button className="text-violet-600 hover:text-violet-700 text-sm font-medium flex items-center gap-1">
                      Read Full Fatwa
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedFatwas;
