// src/pages/Knowledge/ScholarsList.tsx
import React, { useState } from "react";
import {
  Search,
  GraduationCap,
  MapPin,
  Award,
  Users,
  BookOpen,
} from "lucide-react";

const mockScholars = [
  {
    id: 1,
    name: "Imam Abu Hanifa",
    specialization: "Fiqh & Jurisprudence",
    era: "8th Century",
    location: "Kufa, Iraq",
    contributions: 150,
    students: 200,
    description:
      "Founder of the Hanafi school of thought, one of the greatest jurists in Islamic history.",
  },
  {
    id: 2,
    name: "Imam Muhammad al-Shaybani",
    specialization: "Fiqh & Hadith",
    era: "8th-9th Century",
    location: "Baghdad, Iraq",
    contributions: 120,
    students: 180,
    description:
      "A prominent student of Imam Abu Hanifa, known for his extensive works on Islamic jurisprudence.",
  },
  {
    id: 3,
    name: "Imam Abu Yusuf",
    specialization: "Fiqh & Economics",
    era: "8th Century",
    location: "Baghdad, Iraq",
    contributions: 100,
    students: 150,
    description:
      "Chief Qadi of the Abbasid Caliphate, known for his works on Islamic taxation and finance.",
  },
];

const ScholarsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEra, setSelectedEra] = useState("All");

  const eras = [
    "All",
    "8th Century",
    "8th-9th Century",
    "9th Century",
    "10th Century",
  ];

  const filteredScholars = mockScholars.filter((scholar) => {
    const matchesSearch =
      scholar.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholar.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEra = selectedEra === "All" || scholar.era === selectedEra;
    return matchesSearch && matchesEra;
  });

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Islamic Scholars
          </h1>
          <p className="text-gray-600">
            Learn about the great scholars of the Hanafi school
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
                placeholder="Search scholars by name or specialization..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
              value={selectedEra}
              onChange={(e) => setSelectedEra(e.target.value)}
            >
              {eras.map((era) => (
                <option key={era} value={era}>
                  {era}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Scholars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholars.map((scholar) => (
            <div
              key={scholar.id}
              className="bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="text-center mb-4">
                <div className="bg-violet-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="w-10 h-10 text-violet-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {scholar.name}
                </h3>
                <p className="text-sm text-violet-600">
                  {scholar.specialization}
                </p>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{scholar.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-gray-400" />
                  <span>Era: {scholar.era}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    {scholar.contributions} works
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    {scholar.students} students
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3 border-t border-gray-200 pt-3">
                {scholar.description}
              </p>
              <button className="w-full mt-4 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors">
                View Profile
              </button>
            </div>
          ))}
        </div>

        {filteredScholars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No scholars found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScholarsList;
