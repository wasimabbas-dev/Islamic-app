import { Users, MessageCircle, Star } from 'lucide-react'
import type { Scholar } from '../../types/Scholars'

interface ScholarCardProps {
  scholar: Scholar
  onViewProfile: (scholar: Scholar) => void
}

function ScholarCard({ scholar, onViewProfile }: ScholarCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg 
                    transition-shadow p-6 space-y-5">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        <img
          src={scholar.imageUrl}
          alt={scholar.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-violet-100"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-slate-900 truncate">
            {scholar.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {scholar.qualification}
          </p>
        </div>
      </div>

      {/* Specialization Badges */}
      <div className="flex flex-wrap gap-2">
        {scholar.specialization.map((spec) => (
          <span
            key={spec}
            className="px-3 py-1 bg-violet-100 text-violet-600 rounded-full text-sm font-medium"
          >
            {spec}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 text-gray-600 mb-1">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-700">
              {(scholar.followers / 1000).toFixed(1)}k
            </span>
          </div>
          <p className="text-xs text-gray-500">Followers</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 text-gray-600 mb-1">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-700">
              {scholar.questionsAnswered.toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-gray-500">Answered</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 text-gray-600 mb-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">
              {scholar.rating}
            </span>
          </div>
          <p className="text-xs text-gray-500">Rating</p>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => onViewProfile(scholar)}
        className="w-full py-3 bg-violet-600 text-white rounded-2xl font-medium
                   hover:bg-violet-700 transition-colors shadow-sm"
      >
        View Profile
      </button>
    </div>
  )
}

export default ScholarCard