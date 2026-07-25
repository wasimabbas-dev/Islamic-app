import { useState } from 'react'
import { 
  Search, 
  Upload, 
  Clock, 
  CheckCircle2, 
  Circle, 
  HelpCircle,
  AlertCircle,
  Info
} from 'lucide-react'

// ─── TypeScript Interfaces ───────────────────────────────────────

type QuestionCategory = 'Aqidah' | 'Ibadah' | 'Muamalat' | 'Family' | 'Finance' | 'Others'
type QuestionStatus = 'Pending' | 'Assigned' | 'Answered' | 'Verified' | 'Published'

interface Question {
  id: string
  title: string
  category: QuestionCategory
  description: string
  date: string
  status: QuestionStatus
  hasImage?: boolean
}

interface QuestionFormData {
  title: string
  category: QuestionCategory
  description: string
  imageFile: File | null
}

// ─── Constants ────────────────────────────────────────────────────

const categories: QuestionCategory[] = [
  'Aqidah',
  'Ibadah',
  'Muamalat',
  'Family',
  'Finance',
  'Others'
]

const statusFlow: QuestionStatus[] = [
  'Pending',
  'Assigned',
  'Answered',
  'Verified',
  'Published'
]

const statusColors: Record<QuestionStatus, string> = {
  Pending: 'bg-amber-100 text-amber-700',
  Assigned: 'bg-blue-100 text-blue-700',
  Answered: 'bg-violet-100 text-violet-700',
  Verified: 'bg-emerald-100 text-emerald-700',
  Published: 'bg-green-100 text-green-700'
}

const statusDotColors: Record<QuestionStatus, string> = {
  Pending: 'bg-amber-500',
  Assigned: 'bg-blue-500',
  Answered: 'bg-violet-500',
  Verified: 'bg-emerald-500',
  Published: 'bg-green-500'
}

// ─── Initial Mock Data ────────────────────────────────────────────

const initialQuestions: Question[] = [
  {
    id: 'q1',
    title: 'What is the ruling on combining Salah during long-distance travel?',
    category: 'Ibadah',
    description: 'I frequently travel for work and sometimes need to combine my prayers. What are the specific conditions and rulings according to the Hanafi school regarding combining Salah during travel?',
    date: '2026-01-18',
    status: 'Answered'
  },
  {
    id: 'q2',
    title: 'How to properly calculate Zakat on mixed investment portfolio?',
    category: 'Finance',
    description: 'I have investments in stocks, real estate, and a savings account. How should I calculate my Zakat obligation according to Hanafi fiqh when the assets are mixed?',
    date: '2026-01-15',
    status: 'Assigned'
  },
  {
    id: 'q3',
    title: 'Is cryptocurrency trading permissible in Hanafi fiqh?',
    category: 'Muamalat',
    description: 'I want to understand the Shariah perspective on trading cryptocurrencies like Bitcoin. What are the conditions for a currency to be considered valid in Islamic law?',
    date: '2026-01-12',
    status: 'Pending'
  }
]

// ─── Main Component ──────────────────────────────────────────────

function Questions() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions)
  const [formData, setFormData] = useState<QuestionFormData>({
    title: '',
    category: 'Ibadah',
    description: '',
    imageFile: null
  })
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newQuestion: Question = {
      id: `q${Date.now()}`,
      title: formData.title,
      category: formData.category,
      description: formData.description,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      hasImage: !!formData.imageFile
    }

    setQuestions([newQuestion, ...questions])
    
    // Reset form
    setFormData({
      title: '',
      category: 'Ibadah',
      description: '',
      imageFile: null
    })
    setShowForm(false)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, imageFile: e.target.files[0] })
    }
  }

  const getStatusProgress = (currentStatus: QuestionStatus) => {
    const currentIndex = statusFlow.indexOf(currentStatus)
    return statusFlow.map((status, index) => ({
      status,
      completed: index <= currentIndex,
      active: index === currentIndex
    }))
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Questions & Answers
          </h1>
          <p className="text-lg leading-8 text-gray-600 max-w-3xl">
            Ask your Hanafi Fiqh questions and track their progress from submission to publication. 
            Our qualified scholars are here to provide authentic guidance.
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ─── Left Column (Main Content) ─── */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Ask Question Button */}
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="w-full py-4 bg-violet-600 text-white rounded-2xl font-medium
                         hover:bg-violet-700 transition-colors shadow-sm flex items-center 
                         justify-center gap-2"
              >
                <HelpCircle className="w-5 h-5" />
                Ask a New Question
              </button>
            )}

            {/* Ask Question Form Card */}
            {showForm && (
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">
                    Ask a Question
                  </h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Question Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question Title
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., What is the ruling on combining Salah during travel?"
                      className="w-full p-4 bg-white rounded-2xl border border-gray-200 
                               text-gray-700 placeholder-gray-400 focus:outline-none 
                               focus:border-violet-200 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>

                  {/* Category Selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as QuestionCategory })}
                      className="w-full p-4 bg-white rounded-2xl border border-gray-200 
                               text-gray-700 focus:outline-none focus:border-violet-200 
                               focus:ring-2 focus:ring-violet-100"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Question Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Detailed Description
                    </label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={5}
                      placeholder="Provide complete details about your question, including any relevant context..."
                      className="w-full p-4 bg-white rounded-2xl border border-gray-200 
                               text-gray-700 placeholder-gray-400 focus:outline-none 
                               focus:border-violet-200 focus:ring-2 focus:ring-violet-100 resize-none"
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Attach Image (Optional)
                    </label>
                    <label className="block w-full p-8 bg-stone-50 border-2 border-dashed 
                                    border-gray-200 rounded-2xl cursor-pointer hover:border-violet-200 
                                    transition-colors text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        {formData.imageFile 
                          ? `Selected: ${formData.imageFile.name}` 
                          : 'Click or drag to upload an image'
                        }
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Max file size: 5MB
                      </p>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-violet-600 text-white rounded-2xl font-medium
                             hover:bg-violet-700 transition-colors shadow-sm"
                  >
                    Submit Question
                  </button>
                </form>
              </div>
            )}

            {/* My Questions & Track Status */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                My Questions
              </h2>
              
              {questions.length === 0 ? (
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-12 text-center">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg text-gray-600">
                    You haven't asked any questions yet.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Start by asking your first question above.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {questions.map((question) => {
                    const progress = getStatusProgress(question.status)
                    
                    return (
                      <div
                        key={question.id}
                        className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 
                                 hover:shadow-lg transition-shadow"
                      >
                        {/* Question Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                question.category === 'Ibadah' ? 'bg-violet-100 text-violet-600' :
                                question.category === 'Finance' ? 'bg-blue-100 text-blue-600' :
                                question.category === 'Muamalat' ? 'bg-emerald-100 text-emerald-600' :
                                'bg-gray-100 text-gray-600'
                              }`}>
                                {question.category}
                              </span>
                              <span className="text-sm text-gray-500 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {question.date}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900">
                              {question.title}
                            </h3>
                          </div>
                          
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[question.status]}`}>
                            {question.status}
                          </span>
                        </div>

                        {/* Progress Tracker */}
                        <div className="mt-6">
                          <div className="flex items-center justify-between">
                            {progress.map((step, index) => (
                              <div key={step.status} className="flex items-center flex-1">
                                <div className="flex flex-col items-center">
                                  {step.completed ? (
                                    <CheckCircle2 className={`w-5 h-5 ${statusDotColors[step.status]}`} />
                                  ) : step.active ? (
                                    <div className={`w-5 h-5 rounded-full border-2 ${statusDotColors[step.status]} flex items-center justify-center`}>
                                      <div className={`w-2.5 h-2.5 rounded-full ${statusDotColors[step.status]}`} />
                                    </div>
                                  ) : (
                                    <Circle className="w-5 h-5 text-gray-300" />
                                  )}
                                  <span className={`text-xs mt-1 ${step.active ? 'font-medium text-gray-700' : 'text-gray-400'}`}>
                                    {step.status}
                                  </span>
                                </div>
                                {index < progress.length - 1 && (
                                  <div className={`flex-1 h-0.5 mx-2 ${
                                    step.completed ? 'bg-violet-600' : 'bg-gray-200'
                                  }`} />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* ─── Right Column (Sidebar) ─── */}
          <div className="space-y-6">
            
            {/* Search Existing Questions */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Search Existing Questions
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search questions..."
                  className="w-full pl-10 pr-4 py-3 bg-white rounded-2xl border border-gray-200 
                           text-sm text-gray-700 placeholder-gray-400 focus:outline-none 
                           focus:border-violet-200 focus:ring-2 focus:ring-violet-100"
                />
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Search before asking to see if your question has already been answered.
              </p>
            </div>

            {/* Community Guidelines */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-violet-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  Question Guidelines
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-violet-600">1</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Be specific and provide complete context for your question.
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-violet-600">2</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Select the most relevant category for accurate scholarly responses.
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-violet-600">3</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Search existing questions to avoid duplicate submissions.
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-violet-600">4</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Questions are reviewed by qualified Hanafi scholars for accuracy.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Question Lifecycle
                </h4>
                <div className="space-y-2">
                  {statusFlow.map((status) => (
                    <div key={status} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${statusDotColors[status]}`} />
                      <span className="text-sm text-gray-600">{status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Your Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Questions Asked</span>
                  <span className="text-sm font-medium text-gray-700">{questions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Answered</span>
                  <span className="text-sm font-medium text-violet-600">
                    {questions.filter(q => q.status === 'Answered' || q.status === 'Verified' || q.status === 'Published').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pending</span>
                  <span className="text-sm font-medium text-amber-600">
                    {questions.filter(q => q.status === 'Pending' || q.status === 'Assigned').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Questions