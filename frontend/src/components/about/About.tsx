import { 
  Shield, 
  Target, 
  Eye, 
  CheckCircle2, 
  BookOpen, 
  Users, 
  ScrollText,
  Search,
  UserCheck,
  Library,
  Globe
} from 'lucide-react'

// ─── TypeScript Interfaces ───────────────────────────────────────

interface Pillar {
  step: number
  title: string
  description: string
  icon: React.ReactNode
}

interface Reference {
  title: string
  author: string
  description: string
}

// ─── Constants ────────────────────────────────────────────────────

const pillars: Pillar[] = [
  {
    step: 1,
    title: 'Question Submitted',
    description: 'Users submit their questions with full context and details through our structured submission form.',
    icon: <Search className="w-6 h-6" />
  },
  {
    step: 2,
    title: 'Assigned to Verified Scholar',
    description: 'Questions are routed to qualified, certified Hanafi scholars who specialize in the relevant field.',
    icon: <UserCheck className="w-6 h-6" />
  },
  {
    step: 3,
    title: 'Cross-Referenced with Hanafi Texts',
    description: 'Answers are thoroughly verified against authoritative Hanafi fiqh texts and classical sources.',
    icon: <Library className="w-6 h-6" />
  },
  {
    step: 4,
    title: 'Published & Accessible',
    description: 'Verified answers are published for the community with full references and scholarly endorsements.',
    icon: <Globe className="w-6 h-6" />
  }
]

const references: Reference[] = [
  {
    title: 'Fatawa Alamgiri',
    author: 'Compiled by 500 Scholars',
    description: 'Also known as Al-Fatawa al-Hindiyyah, this monumental work was commissioned by Emperor Aurangzeb and covers the entire spectrum of Hanafi jurisprudence.'
  },
  {
    title: 'Radd al-Muhtar',
    author: 'Ibn Abidin',
    description: 'The most authoritative commentary on Al-Durr al-Mukhtar, widely regarded as the definitive reference for late Hanafi jurisprudence and fatwa.'
  },
  {
    title: 'Al-Hidayah',
    author: 'Burhan al-Din al-Marghinani',
    description: 'A classical manual of Hanafi law that has been the standard textbook for centuries, covering all major areas of Islamic jurisprudence.'
  },
  {
    title: 'Nur al-Idah',
    author: 'Hasan Shurunbulali',
    description: 'A foundational text on Hanafi worship and personal law, studied widely across Islamic institutions for its clarity and precision.'
  }
]

// ─── Main Component ──────────────────────────────────────────────

function About() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* ─── Hero Header Section ─── */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-violet-600" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-6">
              About Darul Huda
            </h1>
            <p className="text-lg leading-8 text-gray-600">
              A trusted digital platform dedicated to providing authentic, scholar-verified Islamic 
              rulings based on the Quran, authentic Hadith, and the rich tradition of Hanafi Fiqh. 
              Our mission is to bridge the gap between qualified Islamic scholarship and the global 
              Muslim community seeking reliable religious guidance.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Core Mission & Vision Section ─── */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission Card */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 md:p-10">
            <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-violet-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Our Mission
            </h2>
            <p className="text-lg leading-8 text-gray-600">
              To connect the Muslim community with qualified, certified Hanafi scholars, 
              eliminating misinformation and providing a trustworthy knowledge base. We ensure 
              every answer is backed by authentic sources and scholarly consensus, making 
              reliable Islamic guidance accessible to all.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 md:p-10">
            <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-violet-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Our Vision
            </h2>
            <p className="text-lg leading-8 text-gray-600">
              To standardize digital Islamic legal workflows with absolute academic rigor, 
              creating a global platform where authenticated resources are easily accessible. 
              We envision a world where every Muslim can access verified Hanafi fiqh guidance 
              with confidence and clarity.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Our Pillars / Verification Method Section ─── */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-violet-600" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Our Verification Method
            </h2>
            <p className="text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
              Unlike social networks or unmoderated forums, only authorized and manually verified 
              scholars can publish fatwas or answers on our platform. Every response follows a 
              rigorous verification process to ensure authenticity and academic integrity.
            </p>
          </div>

          {/* Process Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.step}
                className="relative bg-stone-50 rounded-3xl border border-gray-200 p-6 text-center"
              >
                <div className="w-10 h-10 bg-violet-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {pillar.step}
                </div>
                <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <div className="text-violet-600">
                    {pillar.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-gray-600 leading-6">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trust & Quality Assurance Section ─── */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="shrink-0">
              <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-violet-600" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Why You Can Trust Our Content
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-violet-600 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">
                      Verified Scholar Network
                    </h3>
                    <p className="text-sm text-gray-600">
                      Every scholar on our platform undergoes a thorough verification process, 
                      including credential checks and peer reviews from senior Hanafi muftis.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-violet-600 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">
                      Multi-Layer Review Process
                    </h3>
                    <p className="text-sm text-gray-600">
                      Answers go through multiple stages of review: initial drafting, peer review, 
                      cross-referencing with classical texts, and final approval by senior scholars.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-violet-600 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">
                      Transparent References
                    </h3>
                    <p className="text-sm text-gray-600">
                      All answers include clear references to classical Hanafi texts, allowing users 
                      to verify the sources and understand the scholarly basis for each ruling.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Authentic Source Standards Section ─── */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ScrollText className="w-8 h-8 text-violet-600" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Authentic Source Standards
            </h2>
            <p className="text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
              Our scholars reference the most authoritative classical texts of the Hanafi school, 
              ensuring every fatwa and answer is grounded in centuries of scholarly tradition.
            </p>
          </div>

          {/* Reference Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {references.map((reference) => (
              <div
                key={reference.title}
                className="bg-stone-50 rounded-3xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-violet-100 rounded-2xl flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-violet-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">
                        {reference.title}
                      </h3>
                      <span className="px-3 py-1 bg-violet-100 text-violet-600 rounded-full text-xs font-medium">
                        Primary Source
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      By {reference.author}
                    </p>
                    <p className="text-sm text-gray-600 leading-6">
                      {reference.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Text References */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="px-4 py-1.5 bg-violet-100 text-violet-600 font-medium rounded-full text-sm">
              Fatawa Alamgiri
            </span>
            <span className="px-4 py-1.5 bg-violet-100 text-violet-600 font-medium rounded-full text-sm">
              Radd al-Muhtar
            </span>
            <span className="px-4 py-1.5 bg-violet-100 text-violet-600 font-medium rounded-full text-sm">
              Al-Hidayah
            </span>
            <span className="px-4 py-1.5 bg-violet-100 text-violet-600 font-medium rounded-full text-sm">
              Nur al-Idah
            </span>
            <span className="px-4 py-1.5 bg-violet-100 text-violet-600 font-medium rounded-full text-sm">
              Al-Durr al-Mukhtar
            </span>
            <span className="px-4 py-1.5 bg-violet-100 text-violet-600 font-medium rounded-full text-sm">
              Sharh al-Wiqayah
            </span>
            <span className="px-4 py-1.5 bg-violet-100 text-violet-600 font-medium rounded-full text-sm">
              Al-Ashbah wal-Nazair
            </span>
          </div>
        </div>
      </section>

      {/* ─── Footer Message Section ─── */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-violet-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Committed to Authenticity
          </h2>
          <p className="text-lg leading-8 text-gray-600">
            Darul Huda is more than a platform—it's a commitment to preserving the 
            integrity of Islamic scholarship in the digital age. Every answer, every fatwa, 
            and every reference is carefully curated to maintain the highest standards of 
            Hanafi jurisprudence.
          </p>
        </div>
      </section>
    </div>
  )
}

export default About