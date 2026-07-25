import { useState, useEffect } from 'react'
import type { Scholar, Specialization } from '../../types/Scholars'
import { scholarService } from '../../services/scholarService'
import SearchAndFilter from './SearchAndFilter'
import ScholarGrid from '../grid/ScholarGrid'
import ScholarProfileModal from './ScholarProfileModal'

function Scholars() {
  const [scholars, setScholars] = useState<Scholar[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialization, setSelectedSpecialization] = useState<Specialization>('All')
  const [selectedScholar, setSelectedScholar] = useState<Scholar | null>(null)

  useEffect(() => {
    const fetchScholars = async () => {
      try {
        console.log('🔄 Fetching scholars...');
        setLoading(true);
        
        const data = await scholarService.getApprovedScholars();
        console.log('✅ Loaded scholars:', data);
        
        setScholars(data);
        setError(null);
      } catch (err) {
        console.error('❌ Error:', err);
        setError('Failed to load scholars. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchScholars();
  }, []);

  // Helper function to get specialization as array
  const getSpecializations = (scholar: Scholar): string[] => {
    if (Array.isArray(scholar.specialization)) {
      return scholar.specialization;
    }
    if (typeof scholar.specialization === 'string' && scholar.specialization) {
      return (scholar.specialization as string).split(',').map(s => s.trim()).filter(Boolean);
    }
    return [];
  };

  // Helper function to get display text for specialization
  const getSpecializationText = (scholar: Scholar): string => {
    if (Array.isArray(scholar.specialization)) {
      return scholar.specialization.join(', ');
    }
    return scholar.specialization || '';
  };

  const filteredScholars = scholars.filter((scholar) => {
    const specializationArray = getSpecializations(scholar);
    const specializationText = getSpecializationText(scholar);
    
    const matchesSearch = 
      scholar.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      specializationText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholar.qualification.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSpecialization = 
      selectedSpecialization === 'All' || 
      specializationArray.includes(selectedSpecialization)

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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
            <p className="ml-4 text-gray-600">Loading scholars...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <p className="text-red-600 text-center">{error}</p>
          </div>
        )}

        {/* Scholars List */}
        {!loading && !error && (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-sm text-gray-500">
                Showing {filteredScholars.length} scholar{filteredScholars.length !== 1 ? 's' : ''}
                {scholars.length > 0 && ` of ${scholars.length} total`}
              </p>
            </div>

            {/* No Results */}
            {filteredScholars.length === 0 && scholars.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                <p className="text-gray-500 text-lg">
                  No approved scholars found in the directory yet.
                </p>
                <p className="text-gray-400 mt-2">
                  Scholars will appear here once approved by an admin.
                </p>
              </div>
            )}

            {/* No Search Results */}
            {filteredScholars.length === 0 && scholars.length > 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">
                  No scholars match your search criteria.
                </p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSpecialization('All');
                  }}
                  className="mt-4 text-violet-600 hover:text-violet-700 font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Scholar Grid */}
            {filteredScholars.length > 0 && (
              <ScholarGrid
                scholars={filteredScholars}
                onViewProfile={setSelectedScholar}
              />
            )}
          </>
        )}
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