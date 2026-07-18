import { useState } from 'react'
import { 
  Search, 
  Bookmark, 
  Copy, 
  Share2, 
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  BookMarked,
  MessageCircle,
  AlertCircle
} from 'lucide-react'

// ─── TypeScript Interfaces ───────────────────────────────────────

type AuthenticityGrade = 'Sahih' | 'Hasan' | 'Da\'if' | 'Hasan Sahih'

interface Hadith {
  id: string
  collectionId: string
  collectionName: string
  hadithNumber: string
  grade: AuthenticityGrade
  arabicText: string
  translation: string
  explanation: string
  narrator: string
  chapter: string
}

interface Collection {
  id: string
  name: string
  count: number
}

// ─── Constants ────────────────────────────────────────────────────

const gradeColors: Record<AuthenticityGrade, string> = {
  'Sahih': 'bg-emerald-100 text-emerald-700',
  'Hasan': 'bg-blue-100 text-blue-700',
  'Da\'if': 'bg-red-100 text-red-700',
  'Hasan Sahih': 'bg-violet-100 text-violet-700'
}

const gradeIcons: Record<AuthenticityGrade, string> = {
  'Sahih': '✓',
  'Hasan': '◉',
  'Da\'if': '⚠',
  'Hasan Sahih': '◆'
}

// ─── Mock Data ────────────────────────────────────────────────────

const collections: Collection[] = [
  { id: 'bukhari', name: 'Sahih al-Bukhari', count: 7563 },
  { id: 'muslim', name: 'Sahih Muslim', count: 3033 },
  { id: 'abudawud', name: 'Sunan Abi Dawud', count: 5274 },
  { id: 'tirmidhi', name: 'Jami\' at-Tirmidhi', count: 3956 },
  { id: 'nasai', name: 'Sunan an-Nasa\'i', count: 5761 },
  { id: 'ibnmajah', name: 'Sunan Ibn Majah', count: 4341 }
]

const mockHadiths: Hadith[] = [
  {
    id: 'h1',
    collectionId: 'bukhari',
    collectionName: 'Sahih al-Bukhari',
    hadithNumber: '1',
    grade: 'Sahih',
    arabicText: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ فَهِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ، وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا أَوِ امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ',
    translation: 'Actions are judged by intentions, and every person will get what they intended. So whoever emigrated for the sake of Allah and His Messenger, their emigration is for Allah and His Messenger. And whoever emigrated for worldly gain or to marry a woman, their emigration is for whatever they emigrated for.',
    explanation: 'This hadith is one of the most comprehensive principles of Islam. It establishes that the validity and reward of actions depend on the intention behind them. Imam al-Bukhari began his Sahih with this hadith to emphasize the importance of sincerity in seeking knowledge.',
    narrator: 'Umar ibn al-Khattab',
    chapter: 'The Book of Revelation'
  },
  {
    id: 'h2',
    collectionId: 'muslim',
    collectionName: 'Sahih Muslim',
    hadithNumber: '1007',
    grade: 'Sahih',
    arabicText: 'مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنْيَا، نَفَّسَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ، وَمَنْ يَسَّرَ عَلَى مُعْسِرٍ، يَسَّرَ اللَّهُ عَلَيْهِ فِي الدُّنْيَا وَالْآخِرَةِ',
    translation: 'Whoever relieves a believer\'s distress from the distresses of this world, Allah will relieve their distress from the distresses of the Day of Judgment. And whoever makes things easy for someone in difficulty, Allah will make things easy for them in this world and the Hereafter.',
    explanation: 'This hadith encourages Muslims to help one another and emphasizes the reciprocal nature of divine mercy. The Hanafi scholars have extensively discussed this hadith in the context of social responsibility and mutual cooperation in the community.',
    narrator: 'Abu Hurairah',
    chapter: 'The Book of Remembrance'
  },
  {
    id: 'h3',
    collectionId: 'tirmidhi',
    collectionName: 'Jami\' at-Tirmidhi',
    hadithNumber: '2518',
    grade: 'Hasan Sahih',
    arabicText: 'الْحَلَالُ بَيِّنٌ، وَالْحَرَامُ بَيِّنٌ، وَبَيْنَهُمَا أُمُورٌ مُشْتَبِهَاتٌ لَا يَعْلَمُهُنَّ كَثِيرٌ مِنَ النَّاسِ، فَمَنِ اتَّقَى الشُّبُهَاتِ اسْتَبْرَأَ لِدِينِهِ وَعِرْضِهِ، وَمَنْ وَقَعَ فِي الشُّبُهَاتِ وَقَعَ فِي الْحَرَامِ',
    translation: 'The halal is clear and the haram is clear, and between them are doubtful matters that many people do not know. Whoever avoids the doubtful matters has protected their religion and honor. And whoever falls into the doubtful matters will fall into the haram.',
    explanation: 'This foundational hadith establishes the principle of wara\' (caution in religious matters). Hanafi jurists use this as a basis for the concept of makruh tahrimi and makruh tanzihi, distinguishing between different levels of discouragement in Islamic law.',
    narrator: 'An-Nu\'man ibn Bashir',
    chapter: 'The Book of Transactions'
  },
  {
    id: 'h4',
    collectionId: 'abudawud',
    collectionName: 'Sunan Abi Dawud',
    hadithNumber: '3593',
    grade: 'Hasan',
    arabicText: 'إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتْقِنَهُ',
    translation: 'Indeed, Allah loves that when one of you does a task, they do it with perfection and excellence.',
    explanation: 'This hadith establishes the Islamic principle of itqan (excellence and quality in work). Hanafi scholars have applied this principle to various fields including craftsmanship, trade, and religious duties, emphasizing that quality and diligence are forms of worship.',
    narrator: 'Aisha bint Abi Bakr',
    chapter: 'The Book of Judicial Decisions'
  }
]

// ─── Helper Functions ────────────────────────────────────────────

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
}

// ─── Sub-Components ──────────────────────────────────────────────

function HadithCard({ 
  hadith, 
  isBookmarked, 
  onToggleBookmark,
  expandedId,
  onToggleExpand
}: { 
  hadith: Hadith
  isBookmarked: boolean
  onToggleBookmark: (id: string) => void
  expandedId: string | null
  onToggleExpand: (id: string) => void
}) {
  const isExpanded = expandedId === hadith.id
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const textToCopy = `${hadith.arabicText}\n\n${hadith.translation}\n\n— ${hadith.collectionName}, Hadith ${hadith.hadithNumber}`
    await copyToClipboard(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm 
                    hover:shadow-lg transition-shadow overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {hadith.collectionName}
              </h3>
              <p className="text-sm text-gray-500">
                Hadith #{hadith.hadithNumber} • {hadith.narrator}
              </p>
            </div>
          </div>
          
          <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${gradeColors[hadith.grade]}`}>
            {gradeIcons[hadith.grade]} {hadith.grade}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <MessageCircle className="w-3.5 h-3.5 text-gray-400" />
          <p className="text-sm text-gray-500">{hadith.chapter}</p>
        </div>
      </div>

      {/* Arabic Text */}
      <div className="p-6 bg-stone-50 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Arabic Text
          </span>
          <BookMarked className="w-4 h-4 text-gray-400" />
        </div>
        <p className="text-3xl leading-loose text-slate-900 text-right font-arabic" dir="rtl">
          {hadith.arabicText}
        </p>
      </div>

      {/* Translation */}
      <div className="p-6 border-b border-gray-100">
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          English Translation
        </h4>
        <p className="text-lg leading-8 text-gray-600">
          {hadith.translation}
        </p>
      </div>

      {/* Explanation - Collapsible */}
      <div className="border-b border-gray-100">
        <button
          onClick={() => onToggleExpand(hadith.id)}
          className="w-full p-6 flex items-center justify-between hover:bg-stone-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-medium text-gray-700">
              Explanation & Commentary
            </span>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>
        
        {isExpanded && (
          <div className="px-6 pb-6">
            <div className="p-4 bg-violet-50 rounded-2xl border border-violet-200">
              <p className="text-sm leading-7 text-gray-700">
                {hadith.explanation}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="p-4 flex items-center gap-2 bg-white">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-gray-200 
                   text-sm text-gray-600 hover:bg-gray-50 hover:border-violet-200 
                   transition-all flex-1 justify-center"
        >
          {copied ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-600">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
        
        <button
          onClick={() => onToggleBookmark(hadith.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl border 
                   text-sm transition-all flex-1 justify-center
                   ${isBookmarked 
                     ? 'bg-violet-50 border-violet-200 text-violet-600' 
                     : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-violet-200'
                   }`}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-violet-600' : ''}`} />
          <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
        </button>
        
        <button className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-gray-200 
                         text-sm text-gray-600 hover:bg-gray-50 hover:border-violet-200 
                         transition-all flex-1 justify-center">
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────

function Hadith() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCollection, setSelectedCollection] = useState<string>('all')
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set())
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id)
  }

  // Filter hadiths based on search and collection
  const filteredHadiths = mockHadiths.filter(hadith => {
    const matchesSearch = 
      hadith.arabicText.includes(searchTerm) ||
      hadith.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hadith.explanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hadith.narrator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hadith.collectionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hadith.chapter.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCollection = 
      selectedCollection === 'all' || 
      hadith.collectionId === selectedCollection

    return matchesSearch && matchesCollection
  })

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Hadith Explorer
          </h1>
          <p className="text-lg leading-8 text-gray-600 max-w-3xl">
            Explore authentic Hadith collections with translations, explanations, 
            and scholarly commentary from the Hanafi tradition.
          </p>
        </div>

        {/* Search Module */}
        <div className="mb-10">
          <div className="relative max-w-3xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Hadith by topic, narrator, or keyword..."
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-200 
                       text-gray-700 placeholder-gray-400 focus:outline-none 
                       focus:border-violet-200 focus:ring-2 focus:ring-violet-100 shadow-sm"
            />
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar - Collection Browser */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg font-bold text-slate-900">
                  Collections
                </h2>
              </div>
              
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCollection('all')}
                  className={`w-full text-left px-4 py-3 rounded-2xl transition-all
                    ${selectedCollection === 'all'
                      ? 'bg-violet-100 text-violet-600 font-medium'
                      : 'text-gray-700 hover:bg-stone-50 hover:text-violet-600'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">All Collections</span>
                    <span className="text-xs text-gray-500">{mockHadiths.length}</span>
                  </div>
                </button>
                
                {collections.map((collection) => (
                  <button
                    key={collection.id}
                    onClick={() => setSelectedCollection(collection.id)}
                    className={`w-full text-left px-4 py-3 rounded-2xl transition-all
                      ${selectedCollection === collection.id
                        ? 'bg-violet-100 text-violet-600 font-medium'
                        : 'text-gray-700 hover:bg-stone-50 hover:text-violet-600'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{collection.name}</span>
                      <span className="text-xs text-gray-500">{collection.count}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Bookmarked Section */}
              {bookmarkedIds.size > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Bookmark className="w-4 h-4 text-violet-600 fill-violet-600" />
                    <h3 className="text-sm font-medium text-gray-700">
                      Bookmarked ({bookmarkedIds.size})
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500">
                    You have {bookmarkedIds.size} hadith{bookmarkedIds.size !== 1 ? 's' : ''} saved
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Hadith Feed */}
          <div className="lg:col-span-3">
            {/* Results Count */}
            {searchTerm && (
              <div className="mb-6">
                <p className="text-sm text-gray-500">
                  Found {filteredHadiths.length} hadith{filteredHadiths.length !== 1 ? 's' : ''} 
                  {searchTerm && ` matching "${searchTerm}"`}
                </p>
              </div>
            )}

            {/* Hadith Cards */}
            {filteredHadiths.length > 0 ? (
              <div className="space-y-6">
                {filteredHadiths.map((hadith) => (
                  <HadithCard
                    key={hadith.id}
                    hadith={hadith}
                    isBookmarked={bookmarkedIds.has(hadith.id)}
                    onToggleBookmark={toggleBookmark}
                    expandedId={expandedId}
                    onToggleExpand={toggleExpand}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-12 text-center">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  No Hadith Found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or collection filter to find what you're looking for.
                </p>
              </div>
            )}

            {/* Bottom Info */}
            {filteredHadiths.length > 0 && (
              <div className="mt-8 p-6 bg-white rounded-3xl border border-gray-200 shadow-sm">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      About These Hadith
                    </h3>
                    <p className="text-sm text-gray-600 leading-6">
                      All Hadith are presented with their original Arabic text and authentic English translations. 
                      The explanations provided are based on classical Hanafi commentaries. 
                      Please refer to qualified scholars for detailed rulings and applications.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hadith