import { useState, useEffect } from 'react'
import {
  CheckCircle2,
  XCircle,
  GraduationCap,
  BookOpen,
  Clock,
  Award,
  Mail,
  Calendar,
  LogIn,
  Phone,
  FileText,
  AlertCircle,
  RefreshCw
} from 'lucide-react'

// ─── TypeScript Interfaces ───────────────────────────────────────

interface ScholarApplication {
  id: string
  userId: string
  bio: string | null
  qualification: string | null
  experience: string | null
  specialization: string | null
  sanadUrl: string | null
  additionalDocs: string | null
  phoneNumber: string | null
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  adminNotes: string | null
  reviewedAt: string | null
  createdAt: string
  user: {
    id: string
    email: string
    name: string
    role: string
    createdAt: string
  }
  scholarLoginAttempts: Array<{
    id: string
    attemptedAt: string
    ipAddress: string
    userAgent: string
  }>
  loginAttemptCount: number
}

// ─── Main Component ──────────────────────────────────────────────

function ScholarApprovals() {
  const [applications, setApplications] = useState<ScholarApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [selectedScholar, setSelectedScholar] = useState<ScholarApplication | null>(null)
  const [adminNotes, setAdminNotes] = useState('')
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

  // Get auth token - check BOTH localStorage and sessionStorage
  const getAuthToken = () => {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  };

  // Also get current user
  const getCurrentUser = () => {
    const userStr = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  };

  // Fetch pending scholars from backend
  const fetchScholars = async () => {
    setLoading(true)
    setError('')

    try {
      const token = getAuthToken()
      if (!token) {
        setError('Authentication required. Please login as admin.')
        setLoading(false)
        return
      }

      const response = await fetch(`${API_BASE_URL}/admin/scholars/pending`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch scholars')
      }

      setApplications(data.data.scholars)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load scholar applications')
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch on component mount and auto-refresh every 30 seconds
  useEffect(() => {
    fetchScholars()
    const interval = setInterval(fetchScholars, 30000)
    return () => clearInterval(interval)
  }, [])

  // Approve scholar
  const handleApprove = async (scholarId: string) => {
    setProcessingId(scholarId)
    setError('')

    try {
      const token = getAuthToken()
      const response = await fetch(`${API_BASE_URL}/admin/scholars/${scholarId}/approve`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adminNotes: adminNotes || 'Approved after credential verification.'
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to approve scholar')
      }

      setSuccessMessage(`${selectedScholar?.user.name || 'Scholar'} has been approved successfully!`)
      setShowDetailsModal(false)
      setSelectedScholar(null)
      setAdminNotes('')
      fetchScholars() // Refresh the list

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to approve scholar')
    } finally {
      setProcessingId(null)
    }
  }

  // Reject scholar
  const handleReject = async (scholarId: string) => {
    if (!adminNotes) {
      setError('Please provide a reason for rejection')
      return
    }

    setProcessingId(scholarId)
    setError('')

    try {
      const token = getAuthToken()
      const response = await fetch(`${API_BASE_URL}/admin/scholars/${scholarId}/reject`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adminNotes,
          deleteAccount: false // Set to true to delete instead of downgrade
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to reject scholar')
      }

      setSuccessMessage(`Scholar application has been rejected.`)
      setShowDetailsModal(false)
      setSelectedScholar(null)
      setAdminNotes('')
      fetchScholars()

      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reject scholar')
    } finally {
      setProcessingId(null)
    }
  }

  // View scholar details
  const viewScholarDetails = (scholar: ScholarApplication) => {
    setSelectedScholar(scholar)
    setAdminNotes('')
    setShowDetailsModal(true)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Stats
  const pendingCount = applications.filter(a => a.status === 'PENDING').length
  const totalLoginAttempts = applications.reduce((sum, a) => sum + a.loginAttemptCount, 0)

  // ─── Loading State ─────────────────────────────────────────────
  if (loading && applications.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading scholar applications...</p>
        </div>
      </div>
    )
  }

  // ─── Render ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-violet-600" />
              </div>
              <h1 className="text-4xl font-bold text-slate-900">
                Scholar Approvals
              </h1>
            </div>
            <button
              onClick={fetchScholars}
              className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
          <p className="text-lg leading-8 text-gray-600 max-w-3xl">
            Review and manage pending scholar applications. Verify credentials, sanad certificates,
            and qualifications before approving scholars to contribute to the platform.
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            <p className="text-green-700">{successMessage}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Pending</p>
                <p className="text-3xl font-bold text-slate-900">{pendingCount}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Login Attempts</p>
                <p className="text-3xl font-bold text-slate-900">{totalLoginAttempts}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                <LogIn className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Applications</p>
                <p className="text-3xl font-bold text-slate-900">{applications.length}</p>
              </div>
              <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-violet-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Pending Applications */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            Pending Applications
          </h2>
          <p className="text-sm text-gray-500">
            {pendingCount} application{pendingCount !== 1 ? 's' : ''} awaiting review
          </p>
        </div>

        {pendingCount > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {applications
              .filter(app => app.status === 'PENDING')
              .map((application) => (
                <ScholarCard
                  key={application.id}
                  application={application}
                  onViewDetails={viewScholarDetails}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  isProcessing={processingId === application.id}
                />
              ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              All Caught Up!
            </h3>
            <p className="text-gray-600">
              There are no pending scholar applications to review at this time.
            </p>
          </div>
        )}
      </div>

      {/* Scholar Details Modal */}
      {showDetailsModal && selectedScholar && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">
                  Review Scholar Application
                </h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl"
                >
                  <XCircle className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Scholar Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-violet-600">
                    {selectedScholar.user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{selectedScholar.user.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-600">{selectedScholar.user.email}</p>
                  </div>
                  {selectedScholar.phoneNumber && (
                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-600">{selectedScholar.phoneNumber}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Qualifications */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-violet-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Qualification</p>
                    <p className="font-medium text-gray-900">{selectedScholar.qualification || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-violet-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Specialization</p>
                    <p className="font-medium text-gray-900">{selectedScholar.specialization || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-violet-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-medium text-gray-900">{selectedScholar.experience || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Bio */}
              {selectedScholar.bio && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Biography</h4>
                  <p className="text-gray-600 bg-gray-50 rounded-2xl p-4">{selectedScholar.bio}</p>
                </div>
              )}

              {/* Sanad/Certificate */}
              {selectedScholar.sanadUrl && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Documents</h4>
                  <a
                    href={selectedScholar.sanadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-violet-600 hover:underline"
                  >
                    <FileText className="w-5 h-5" />
                    View Sanad/Certificate
                  </a>
                </div>
              )}

              {/* Login Attempts */}
              {selectedScholar.scholarLoginAttempts.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <LogIn className="w-5 h-5 text-orange-500" />
                    Login Attempts ({selectedScholar.loginAttemptCount})
                  </h4>
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 space-y-2">
                    {selectedScholar.scholarLoginAttempts.map((attempt, idx) => (
                      <div key={attempt.id} className={`flex justify-between items-center ${idx !== 0 ? 'pt-2 border-t border-orange-200' : ''
                        }`}>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Login attempted</p>
                          <p className="text-xs text-gray-500">
                            IP: {attempt.ipAddress}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600">
                          {formatDate(attempt.attemptedAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Applied Date */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Applied on {formatDate(selectedScholar.createdAt)}</span>
              </div>

              {/* Admin Notes */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Admin Notes</h4>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes about this application..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-50 text-gray-900"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-3xl flex gap-3 justify-end">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReject(selectedScholar.id)}
                disabled={processingId === selectedScholar.id}
                className="px-6 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                {processingId === selectedScholar.id ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
                Reject
              </button>
              <button
                onClick={() => handleApprove(selectedScholar.id)}
                disabled={processingId === selectedScholar.id}
                className="px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                {processingId === selectedScholar.id ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Scholar Card Sub-Component ──────────────────────────────────

interface ScholarCardProps {
  application: ScholarApplication
  onViewDetails: (scholar: ScholarApplication) => void
  onApprove: (id: string) => void
  onReject: (id: string) => void
  isProcessing: boolean
}

function ScholarCard({ application, onViewDetails, onApprove, onReject, isProcessing }: ScholarCardProps) {
  return (
    <div className={`bg-white rounded-3xl border shadow-sm hover:shadow-lg transition-shadow overflow-hidden ${application.loginAttemptCount > 0
        ? 'border-orange-300 bg-orange-50/30'
        : 'border-gray-200'
      }`}>
      {/* Card Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center shrink-0">
              <span className="text-xl font-bold text-violet-600">
                {application.user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                {application.user.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                <p className="text-sm text-gray-500">{application.user.email}</p>
              </div>
            </div>
          </div>

          {/* Status & Login Attempts */}
          <div className="flex flex-col items-end gap-1">
            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              Pending
            </span>
            {application.loginAttemptCount > 0 && (
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium flex items-center gap-1.5">
                <LogIn className="w-3 h-3" />
                {application.loginAttemptCount} login attempt{application.loginAttemptCount > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {/* Quick Info */}
        <div className="flex flex-wrap gap-2 mb-4">
          {application.specialization && (
            <span className="px-3 py-1 bg-violet-100 text-violet-600 rounded-full text-xs font-medium">
              {application.specialization}
            </span>
          )}
          {application.qualification && (
            <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-xs font-medium truncate max-w-[200px]">
              {application.qualification}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <GraduationCap className="w-4 h-4 text-gray-400" />
            <span>{application.experience || 'Experience not specified'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{new Date(application.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6 flex gap-3">
        <button
          onClick={() => onViewDetails(application)}
          className="flex-1 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 
                   text-white rounded-2xl px-5 py-2.5 font-medium transition-colors"
        >
          Review Details
        </button>
        <button
          onClick={() => onApprove(application.id)}
          disabled={isProcessing}
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 
                   text-white rounded-2xl px-4 py-2.5 font-medium transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckCircle2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onReject(application.id)}
          disabled={isProcessing}
          className="flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 
                   text-gray-700 rounded-2xl px-4 py-2.5 font-medium transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <XCircle className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default ScholarApprovals