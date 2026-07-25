import { useState, useEffect } from 'react'
import { MapPin, Clock } from 'lucide-react'
import quranHero from '../../assets/quran-hero.jpg'

// ─── TypeScript Interfaces ───────────────────────────────────────

interface Coordinates {
  latitude: number
  longitude: number
}

interface PrayerTimings {
  Fajr: string
  Dhuhr: string
  Asr: string
  Maghrib: string
  Isha: string
}

interface NextPrayer {
  name: string
  time: string
  remaining: string
}

// ─── Constants ────────────────────────────────────────────────────

const DEFAULT_COORDINATES: Coordinates = {
  latitude: 31.5204,
  longitude: 74.3587
}

const PRAYER_NAMES = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']

// ─── Helper Functions ────────────────────────────────────────────

function formatTimeRemaining(ms: number): string {
  const hours = Math.floor(ms / (1000 * 60 * 60))
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((ms % (1000 * 60)) / 1000)
  
  return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`
}

function getNextPrayer(timings: PrayerTimings): NextPrayer | null {
  const now = new Date()
  const currentTime = now.getHours() * 60 + now.getMinutes()
  
  for (const prayer of PRAYER_NAMES) {
    const [hours, minutes] = timings[prayer as keyof PrayerTimings].split(':').map(Number)
    const prayerTime = hours * 60 + minutes
    
    if (prayerTime > currentTime) {
      const prayerDate = new Date(now)
      prayerDate.setHours(hours, minutes, 0, 0)
      const remainingMs = prayerDate.getTime() - now.getTime()
      
      return {
        name: prayer,
        time: timings[prayer as keyof PrayerTimings],
        remaining: formatTimeRemaining(remainingMs)
      }
    }
  }
  
  // If all prayers have passed, next is Fajr tomorrow
  const fajrTime = timings.Fajr
  const [fajrHours, fajrMinutes] = fajrTime.split(':').map(Number)
  const fajrDate = new Date(now)
  fajrDate.setDate(fajrDate.getDate() + 1)
  fajrDate.setHours(fajrHours, fajrMinutes, 0, 0)
  const remainingMs = fajrDate.getTime() - now.getTime()
  
  return {
    name: 'Fajr',
    time: fajrTime,
    remaining: formatTimeRemaining(remainingMs)
  }
}

// ─── Main Component ──────────────────────────────────────────────

function HeroRight() {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)
  const [timings, setTimings] = useState<PrayerTimings | null>(null)
  const [nextPrayer, setNextPrayer] = useState<NextPrayer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const cityName = 'Lahore, Pakistan'

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        () => {
          // Fallback to Lahore coordinates
          setCoordinates(DEFAULT_COORDINATES)
        }
      )
    } else {
      setCoordinates(DEFAULT_COORDINATES)
    }
  }, [])

  // Fetch prayer times when coordinates are available
  useEffect(() => {
    if (!coordinates) return

    const fetchTimings = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&method=1`
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch prayer times')
        }
        
        const data = await response.json()
        const timingsData: PrayerTimings = {
          Fajr: data.data.timings.Fajr,
          Dhuhr: data.data.timings.Dhuhr,
          Asr: data.data.timings.Asr,
          Maghrib: data.data.timings.Maghrib,
          Isha: data.data.timings.Isha
        }
        
        setTimings(timingsData)
        setError(null)
      } catch (err) {
        setError('Unable to load prayer times')
        console.error('Prayer times fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTimings()
  }, [coordinates])

  // Calculate next prayer and update countdown
  useEffect(() => {
    if (!timings) return

    const updateNextPrayer = () => {
      const next = getNextPrayer(timings)
      setNextPrayer(next)
    }

    // Initial calculation
    updateNextPrayer()

    // Update countdown every second
    const interval = setInterval(updateNextPrayer, 1000)

    return () => clearInterval(interval)
  }, [timings])

  return (
    <div className="relative flex items-center justify-center">
      {/* Main Card */}
      <div className="relative w-full max-w-md rounded-3xl border border-gray-200 bg-white p-4 shadow-xl">
        {/* Quran Image */}
        <img
          src={quranHero}
          alt="The Holy Quran"
          className="w-full h-105 object-cover rounded-2xl shadow-md"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            const fallback = document.createElement('div')
            fallback.className = 'w-full h-[420px] rounded-2xl bg-stone-100 flex items-center justify-center'
            fallback.innerHTML = '<p class="text-gray-500 text-sm">Quran Image<br/>(Coming Soon)</p>'
            target.parentNode?.insertBefore(fallback, target)
          }}
        />

        {/* Floating Prayer Card */}
        <div className="absolute -bottom-6 -left-6 z-10 bg-white rounded-2xl border border-gray-100 p-5 shadow-2xl min-w-55">
          {loading ? (
            /* Loading Skeleton */
            <div className="space-y-3 animate-pulse">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded-full" />
                <div className="w-24 h-3 bg-gray-200 rounded" />
              </div>
              <div className="w-16 h-8 bg-gray-200 rounded" />
              <div className="w-20 h-6 bg-gray-200 rounded" />
              <div className="w-full h-2 bg-gray-200 rounded-full" />
            </div>
          ) : error ? (
            /* Error State */
            <div className="text-center py-2">
              <p className="text-xs text-gray-500">{error}</p>
            </div>
          ) : nextPrayer ? (
            /* Prayer Data */
            <>
              {/* Header */}
              <div className="flex items-center gap-1.5 mb-3">
                <MapPin className="w-3.5 h-3.5 text-violet-600" />
                <span className="text-xs font-medium text-gray-600 truncate">
                  {cityName}
                </span>
              </div>

              {/* Next Prayer Label */}
              <p className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-1">
                Next Prayer
              </p>

              {/* Prayer Name */}
              <h3 className="text-2xl font-bold text-slate-900 mb-1">
                {nextPrayer.name}
              </h3>

              {/* Prayer Time */}
              <p className="text-lg font-semibold text-violet-600 mb-3">
                {nextPrayer.time}
              </p>

              {/* Countdown Timer */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <p className="text-xs font-medium text-gray-500">
                    Remaining: {nextPrayer.remaining}
                  </p>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-violet-600 rounded-full transition-all duration-1000"
                    style={{ width: '60%' }}
                  />
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default HeroRight