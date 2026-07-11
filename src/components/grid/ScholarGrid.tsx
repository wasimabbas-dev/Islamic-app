import type { Scholar } from '../../types/Scholars'
import ScholarCard from '../../components/cards/ScholarCard'

interface ScholarGridProps {
  scholars: Scholar[]
  onViewProfile: (scholar: Scholar) => void
}

function ScholarGrid({ scholars, onViewProfile }: ScholarGridProps) {
  if (scholars.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-gray-600">
          No scholars found matching your criteria.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {scholars.map((scholar) => (
        <ScholarCard
          key={scholar.id}
          scholar={scholar}
          onViewProfile={onViewProfile}
        />
      ))}
    </div>
  )
}

export default ScholarGrid