// src/components/knowledge/KnowledgeCTA.tsx
import React from "react";
import { BookOpen, GraduationCap, Users, ArrowRight } from "lucide-react";

const KnowledgeCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Resource Access */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Access Resources</h3>
            <p className="text-violet-100 text-sm mb-4">
              Browse our extensive library of Islamic texts and resources
            </p>
            <button className="bg-white text-violet-600 px-6 py-2 rounded-lg font-medium hover:bg-violet-50 transition-colors flex items-center gap-2 mx-auto">
              Explore
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Ask Question */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <GraduationCap className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Ask a Scholar</h3>
            <p className="text-violet-100 text-sm mb-4">
              Submit your questions to qualified Islamic scholars
            </p>
            <button className="bg-white text-violet-600 px-6 py-2 rounded-lg font-medium hover:bg-violet-50 transition-colors flex items-center gap-2 mx-auto">
              Ask Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Join Community */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <Users className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Join Community</h3>
            <p className="text-violet-100 text-sm mb-4">
              Connect with fellow learners and knowledge seekers
            </p>
            <button className="bg-white text-violet-600 px-6 py-2 rounded-lg font-medium hover:bg-violet-50 transition-colors flex items-center gap-2 mx-auto">
              Join Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeCTA;
