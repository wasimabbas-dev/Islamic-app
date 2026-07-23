// src/components/knowledge/FeaturedBooks.tsx
import React from "react";
import { BookOpen, Star, Users } from "lucide-react";

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  rating: number;
  readers: number;
  image: string;
}

const books: Book[] = [
  {
    id: 1,
    title: "Al-Hidayah",
    author: "Imam Burhan al-Din al-Marghinani",
    category: "Fiqh",
    rating: 4.8,
    readers: 2450,
    image: "/api/placeholder/120/160",
  },
  {
    id: 2,
    title: "Fath al-Qadir",
    author: "Imam Kamal ibn al-Humam",
    category: "Fiqh",
    rating: 4.7,
    readers: 1800,
    image: "/api/placeholder/120/160",
  },
  {
    id: 3,
    title: "Mishkat al-Masabih",
    author: "Imam Wali al-Din al-Tabrizi",
    category: "Hadith",
    rating: 4.9,
    readers: 3200,
    image: "/api/placeholder/120/160",
  },
];

const FeaturedBooks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Featured Books
            </h2>
            <p className="text-gray-600">
              Essential reads from classical Islamic literature
            </p>
          </div>
          <button className="text-violet-600 font-medium hover:text-violet-700 transition-colors">
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex gap-4">
                  <div className="w-24 h-32 bg-violet-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-violet-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                    <span className="inline-block bg-violet-100 text-violet-700 text-xs px-2 py-1 rounded-full mb-2">
                      {book.category}
                    </span>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        {book.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {book.readers}
                      </span>
                    </div>
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

export default FeaturedBooks;
