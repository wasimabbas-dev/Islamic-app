import type { Scholar } from '../types/Scholars'

export const mockScholars: Scholar[] = [
  {
    id: '1',
    name: 'Mufti Abdullah Ahmed',
    qualification: 'PhD Islamic Jurisprudence, Al-Azhar University',
    specialization: ['Fiqh', 'Ibadaat'],
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    followers: 12500,
    questionsAnswered: 3240,
    rating: 4.9,
    bio: 'Senior scholar specializing in Hanafi Fiqh with over 25 years of teaching experience. Authored numerous books on Islamic jurisprudence and serves as the head mufti at Darul Uloom Islamic Center.',
    education: [
      'PhD Islamic Jurisprudence, Al-Azhar University (2005)',
      'Masters in Islamic Studies, Darul Uloom Karachi (1998)',
      'Ifta Course, Jamia Binoria (1995)'
    ],
    recentAnswers: [
      {
        id: 'a1',
        category: 'Ibadaat',
        title: 'Rulings on combining prayers during travel according to Hanafi school',
        preview: 'The Hanafi school maintains strict conditions for combining prayers during travel, requiring proper intention and valid reasons...',
        date: '2026-01-15'
      },
      {
        id: 'a2',
        category: 'Fiqh',
        title: 'Zakat calculation on mixed investment portfolios',
        preview: 'When calculating Zakat on investments containing both halal and haram elements, the Hanafi methodology requires...',
        date: '2026-01-10'
      }
    ]
  },
  {
    id: '2',
    name: 'Dr. Aisha Rahman',
    qualification: 'PhD Islamic Law, University of Madinah',
    specialization: ['Fiqh', 'Muamalat'],
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    followers: 8900,
    questionsAnswered: 2150,
    rating: 4.8,
    bio: 'Renowned female scholar focusing on financial transactions and business ethics in Islamic law. Regular speaker at international conferences on Islamic finance.',
    education: [
      'PhD Islamic Law, University of Madinah (2010)',
      'MA Islamic Finance, Markfield Institute (2006)',
      'BA Shariah, International Islamic University Islamabad (2003)'
    ],
    recentAnswers: [
      {
        id: 'a3',
        category: 'Muamalat',
        title: 'Guidelines for halal mortgage alternatives',
        preview: 'Several Shariah-compliant alternatives to conventional mortgages exist, including Murabaha and Ijara structures...',
        date: '2026-01-12'
      }
    ]
  },
  {
    id: '3',
    name: 'Sheikh Ibrahim Al-Hanafi',
    qualification: 'Senior Mufti, Jamia Naeemia Lahore',
    specialization: ['Ibadaat', 'Fiqh'],
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    followers: 15600,
    questionsAnswered: 4100,
    rating: 4.95,
    bio: 'Esteemed mufti with expertise in worship rulings and contemporary issues. Head of Dar-ul-Ifta at Jamia Naeemia with students worldwide.',
    education: [
      'Ifta Specialization, Jamia Naeemia Lahore (1990)',
      'Alimiyyah Degree, Darul Uloom Deoband (1985)',
      'Hifz & Qiraat, Local Madrasa (1980)'
    ],
    recentAnswers: [
      {
        id: 'a4',
        category: 'Ibadaat',
        title: 'Complete guide to Taraweeh prayers: Hanafi rulings',
        preview: 'The Hanafi school recommends 20 rakats for Taraweeh prayer, performed in sets of two with specific conditions...',
        date: '2026-01-08'
      },
      {
        id: 'a5',
        category: 'Fiqh',
        title: 'Inheritance distribution when some heirs reside abroad',
        preview: 'Modern complications in inheritance distribution when heirs are in different countries require special consideration...',
        date: '2026-01-05'
      }
    ]
  },
  {
    id: '4',
    name: 'Professor Muhammad Yousuf',
    qualification: 'Professor of Islamic Jurisprudence, IIUI',
    specialization: ['Muamalat'],
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop',
    followers: 7200,
    questionsAnswered: 1890,
    rating: 4.7,
    bio: 'Academic expert in Islamic commercial law with numerous publications. Advisor to Islamic banks and financial institutions.',
    education: [
      'Post-Doc Islamic Finance, Harvard Law School (2015)',
      'PhD Islamic Studies, IIUI (2008)',
      'LLB Shariah & Law, International Islamic University Malaysia (2003)'
    ],
    recentAnswers: [
      {
        id: 'a6',
        category: 'Muamalat',
        title: 'Shariah compliance criteria for cryptocurrency trading',
        preview: 'Analysis of major cryptocurrencies through the lens of Hanafi fiqh, examining requirements for valid currency...',
        date: '2026-01-18'
      }
    ]
  }
]