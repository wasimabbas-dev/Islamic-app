import { X, GraduationCap, Clock, Tag } from 'lucide-react'
import type { Scholar } from '../../types/Scholars'

interface ScholarProfileModalProps {
  scholar: Scholar
  onClose: () => void
}

function ScholarProfileModal({ scholar, onClose }: ScholarProfileModalProps) {
  // Helper to handle specialization
  const getSpecializations = (): string[] => {
    if (!scholar.specialization) return [];
    if (Array.isArray(scholar.specialization)) {
      return scholar.specialization.filter(Boolean);
    }
    return scholar.specialization.split(',').map(s => s.trim()).filter(Boolean);
  };

  const specializations = getSpecializations();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={scholar.imageUrl}
              alt={scholar.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-violet-100"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(scholar.name)}&background=7c3aed&color=fff&size=64`;
              }}
            />
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {scholar.name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {scholar.qualification}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Specialization Badges */}
          {specializations.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {specializations.map((spec) => (
                <span
                  key={spec}
                  className="px-3 py-1 bg-violet-100 text-violet-600 rounded-full text-sm font-medium"
                >
                  {spec}
                </span>
              ))}
            </div>
          )}

          {/* Biography */}
          {scholar.bio && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Biography
              </h3>
              <p className="text-lg leading-8 text-gray-600">
                {scholar.bio}
              </p>
            </div>
          )}

          {/* Education */}
          {scholar.education && scholar.education.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-violet-600" />
                Education
              </h3>
              <div className="space-y-3">
                {scholar.education.map((edu, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-stone-50 rounded-2xl"
                  >
                    <div className="w-2 h-2 bg-violet-600 rounded-full mt-2.5 shrink-0" />
                    <p className="text-gray-700">
                      {edu}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Answers */}
          {scholar.recentAnswers && scholar.recentAnswers.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Recent Answers
              </h3>
              <div className="space-y-4">
                {scholar.recentAnswers.map((answer) => (
                  <div
                    key={answer.id}
                    className="bg-white rounded-2xl border border-gray-200 p-5 
                               hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Tag className="w-4 h-4 text-violet-600" />
                      <span className="px-2.5 py-1 bg-violet-100 text-violet-600 rounded-full text-xs font-medium">
                        {answer.category}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {answer.date}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">
                      {answer.title}
                    </h4>
                    <p className="text-gray-600 leading-7">
                      {answer.preview}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ScholarProfileModal