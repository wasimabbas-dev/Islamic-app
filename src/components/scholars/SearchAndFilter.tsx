import { Search } from 'lucide-react'
import type { Specialization } from '../../types/Scholars'

interface SearchAndFilterProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  selectedSpecialization: Specialization
  onSpecializationChange: (specialization: Specialization) => void
}

const specializations: Specialization[] = ['All', 'Fiqh', 'Muamalat', 'Ibadaat']

function SearchAndFilter({ 
  searchTerm, 
  onSearchChange, 
  selectedSpecialization, 
  onSpecializationChange 
}: SearchAndFilterProps) {
  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search scholars by name or specialization..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-200 
                     text-gray-700 placeholder-gray-400 focus:outline-none focus:border-violet-200
                     focus:ring-2 focus:ring-violet-100 transition-all"
        />
      </div>
      
      <div className="flex flex-wrap gap-3">
        {specializations.map((spec) => (
          <button
            key={spec}
            onClick={() => onSpecializationChange(spec)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all
              ${selectedSpecialization === spec
                ? 'bg-violet-600 text-white shadow-sm'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-violet-200 hover:text-violet-600'
              }`}
          >
            {spec}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SearchAndFilter