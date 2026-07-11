import { useState } from 'react'
import { mockScholars } from '../../data/mockScholars'
import type { Scholar, Specialization } from '../../types/Scholars'
import SearchAndFilter from './SearchAndFilter'
import ScholarGrid from '../grid/ScholarGrid'
import ScholarProfileModal from './ScholarProfileModal'

function Scholars() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialization, setSelectedSpecialization] = useState<Specialization>('All')
  const [selectedScholar, setSelectedScholar] = useState<Scholar | null>(null)

  const filteredScholars = mockScholars.filter((scholar) => {
    const matchesSearch = 
      scholar.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholar.specialization.some(spec => 
        spec.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      scholar.qualification.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSpecialization = 
      selectedSpecialization === 'All' || 
      scholar.specialization.includes(selectedSpecialization)

    return matchesSearch && matchesSpecialization
  })

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Scholar Directory
          </h1>
          <p className="text-lg leading-8 text-gray-600">
            Connect with authentic Hanafi scholars. Browse profiles, explore specializations, 
            and find answers from qualified experts in Islamic jurisprudence.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedSpecialization={selectedSpecialization}
            onSpecializationChange={setSelectedSpecialization}
          />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-500">
            Showing {filteredScholars.length} scholar{filteredScholars.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Scholar Grid */}
        <ScholarGrid
          scholars={filteredScholars}
          onViewProfile={setSelectedScholar}
        />
      </div>

      {/* Profile Modal */}
      {selectedScholar && (
        <ScholarProfileModal
          scholar={selectedScholar}
          onClose={() => setSelectedScholar(null)}
        />
      )}
    </div>
  )
}

export default Scholars;