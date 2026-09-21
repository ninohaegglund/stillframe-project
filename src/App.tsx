import { useState, useRef, useEffect } from 'react'
import dontLookBehindYouAudio from './assets/dont look behind you.mp3'
import heavenandhellAudio from './assets/heaven&hell.mp3'
import youtubeLogo from './assets/ytlogo.jpg'

const YOUTUBE_URL = 'https://www.youtube.com/@stillframesounds'

type Track = {
  id: number
  title: string
  desc: string
  tags: string[]
  duration: string
  youtubeId: string | null
  img?: string
  audioSrc?: string
}

const youtubeThumbnail = (youtubeId: string) =>
  `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`

const tracks: Track[] = [
  {
    id: 1,
    title: 'somewhere between heaven and hell',
    desc: 'Hovering at the threshold — neither peaceful nor terrifying.',
    tags: ['Dark', 'Horror'],
    duration: '6:42',
    youtubeId: 'QS2Q1UunBtY',
    audioSrc: heavenandhellAudio,
  },
  {
    id: 2,
    title: 'the woods feel different tonight',
    desc: 'Something moved between the trees. You heard it too.',
    tags: ['Horror', 'Dark', 'Silent Hill'],
    duration: '5:18',
    youtubeId: 'hiJaobo5_CM',
    img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=340&fit=crop&auto=format',
  },
  {
    id: 3,
    title: 'a world beyond reality',
    desc: 'Drifting through spaces that have no name in any language.',
    tags: ['Game Inspired', 'Silent Hill'],
    duration: '5:32',
    youtubeId: '5xI5YMJi5nM',
  },
  {
    id: 4,
    title: 'don\'t look behind you',
    desc: 'A figure at the end of the corridor. It wasn\'t there before.',
    tags: ['Horror'],
    duration: '4:54',
    youtubeId: 'olgHdZmqLxw',
    audioSrc: dontLookBehindYouAudio,
  },
  {
    id: 5,
    title: 'running in a dream',
    desc: 'A signal from somewhere that stopped broadcasting long ago.',
    tags: ['Dark'],
    duration: '8:12',
    youtubeId: 'kNup5-ogpyI',
    img: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=600&h=340&fit=crop&auto=format',
  },
  {
    id: 6,
    title: 'a moment of peace',
    desc: 'Ruins that exist only in dreams now.',
    tags: ['Game Inspired', 'Zelda'],
    duration: '5:37',
    youtubeId: 'MpUh3L1pQW4',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=340&fit=crop&auto=format',
  },
  {
    id: 7,
    title: 'the road to silent hill',
    desc: 'Silent Hill Inspired Dark Ambience',
    tags: ['Game Inspired', 'Silent Hill'],
    duration: '6:23',
    youtubeId: 'SZ8to96OV50',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=340&fit=crop&auto=format',
  }
]

type YouTubeVideo = {
  id: number
  title: string
  tag: string
  duration: string
  youtubeId?: string
  url?: string
  img?: string
}

const ytVideos: YouTubeVideo[] = [
  {
    id: 1,
    title: 'somewhere between heaven and hell',
    tag: 'Dark Ambient',
    duration: '6:42',
    youtubeId: 'QS2Q1UunBtY',
    url: 'https://youtu.be/QS2Q1UunBtY?si=V9J5X8Q7R4N2K1L3',
  },
  {
    id: 2,
    title: 'the woods feel different tonight',
    tag: 'Horror',
    duration: '5:18',
    youtubeId: 'hiJaobo5_CM',
    url: 'https://youtu.be/hiJaobo5_CM?si=V9J5X8Q7R4N2K1L3',
  },
  {
    id: 3,
    title: 'a world beyond reality',
    tag: 'Game Inspired',
    duration: '45:02',
    youtubeId: '5xI5YMJi5nM',
    url: 'https://youtu.be/5xI5YMJi5nM?si=v-FRdWipRB_oWAXn',
  },
  {
    id: 4,
    title: 'don\'t look behind you',
    tag: 'Silent Hill',
    duration: '4:54',
    youtubeId: 'olgHdZmqLxw',
    url: 'https://youtu.be/olgHdZmqLxw?si=0g6k1r7J8X9n5j2K',
  },
]

const FILTER_TAGS = ['All', 'Dark', 'Horror', 'Game Inspired', 'Silent Hill', 'Zelda', 'Other']

function WaveformBars({ playing }: { playing: boolean }) {
  return (
    <div className="flex items-end gap-0.5 h-4">
      {[0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 0.3, 0.7, 1].map((h, i) => (
        <div
          key={i}
          className="w-0.5 rounded-full"
          style={{
            backgroundColor: 'var(--accent-foreground)',
            height: `${h * 100}%`,
            animation: playing ? `waveform ${0.4 + i * 0.1}s ease-in-out infinite alternate` : 'none',
            animationDelay: `${i * 0.05}s`,
            opacity: playing ? 1 : 0.3,
            transition: 'opacity 0.3s',
          }}
        />
      ))}
    </div>
  )
}

function TrackCard({
  track,
  isPlaying,
  onPlay,
}: {
  track: Track
  isPlaying: boolean
  onPlay: () => void
}) {
  return (
    <div
      className="group relative flex flex-col overflow-hidden border border-[--border] hover:border-[--accent] transition-colors duration-300"
      style={{ background: 'var(--card)' }}
    >
      <div className="relative h-36 overflow-hidden">
        <img
          src={track.youtubeId ? youtubeThumbnail(track.youtubeId) : track.img}
          alt={track.title}
          className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-80 transition-all duration-500 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0d0d0d] via-transparent to-transparent" />
        <button
          onClick={onPlay}
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center border border-[--border] hover:border-[--accent-foreground] transition-colors"
          style={{ background: 'rgba(13,13,13,0.9)' }}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <rect x="1" y="1" width="3" height="8" />
              <rect x="6" y="1" width="3" height="8" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <polygon points="2,1 9,5 2,9" />
            </svg>
          )}
        </button>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex gap-1 flex-wrap">
          {track.tags.map(tag => (
            <span
              key={tag}
              className="font-mono-display text-[10px] px-2 py-0.5 border border-[--border]"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {tag.toUpperCase()}
            </span>
          ))}
        </div>
        <h3
          className="font-mono-display text-sm leading-snug"
          style={{ color: 'var(--foreground)' }}
        >
          {track.title}
        </h3>
        <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
          {track.desc}
        </p>
        <div
          className="flex items-center justify-between mt-auto pt-2 border-t border-[--border]"
        >
          <WaveformBars playing={isPlaying} />
          <span className="font-mono-display text-[11px]" style={{ color: 'var(--muted-foreground)' }}>
            {track.duration}
          </span>
        </div>
      </div>
    </div>
  )
}

function parseDuration(duration: string) {
  const [minutes, seconds] = duration.split(':').map(Number)
  return minutes * 60 + seconds
}

function formatTime(seconds: number) {
  const safeSeconds = Math.max(0, Math.floor(seconds))
  return `${Math.floor(safeSeconds / 60)}:${String(safeSeconds % 60).padStart(2, '0')}`
}

function AudioPlayer({
  track,
  playing,
  onToggle,
}: {
  track: (typeof tracks)[0] | null
  playing: boolean
  onToggle: () => void
}) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)
  const [volume, setVolume] = useState(75)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.pause()
    audio.currentTime = 0
    setProgress(0)
    setAudioDuration(0)

    if (track?.audioSrc) {
      audio.src = track.audioSrc
      audio.load()
    } else {
      audio.removeAttribute('src')
    }
  }, [track])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !track?.audioSrc) return

    audio.volume = volume / 100
    if (playing) {
      void audio.play()
    } else {
      audio.pause()
    }
  }, [playing, track, volume])

  if (!track) return null

  const displayedDuration = audioDuration || parseDuration(track.duration)
  const currentTime = (progress / 100) * displayedDuration

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 border-t border-[--border]"
      style={{ background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(8px)' }}
    >
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-6">
        <button
          onClick={onToggle}
          className="w-8 h-8 shrink-0 rounded-full border border-[--border] hover:border-[--accent-foreground] flex items-center justify-center transition-colors"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <rect x="1" y="1" width="3" height="8" />
              <rect x="6" y="1" width="3" height="8" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <polygon points="2,1 9,5 2,9" />
            </svg>
          )}
        </button>

        <div className="min-w-0 shrink-0 w-48 hidden sm:block">
          <p className="font-mono-display text-xs truncate" style={{ color: 'var(--foreground)' }}>
            {track.title}
          </p>
          {playing && (
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: 'var(--accent-foreground)',
                  animation: 'pulse-dot 1.2s ease infinite',
                }}
              />
              <span className="font-mono-display text-[10px]" style={{ color: 'var(--accent-foreground)' }}>
                PLAYING
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 flex items-center gap-3">
          <span className="font-mono-display text-[10px] w-8 text-right shrink-0" style={{ color: 'var(--muted-foreground)' }}>
            {formatTime(currentTime)}
          </span>
          <div
            className="flex-1 h-0.5 relative cursor-pointer group"
            style={{ background: 'var(--border)' }}
            onClick={e => {
              const rect = e.currentTarget.getBoundingClientRect()
              const nextProgress = ((e.clientX - rect.left) / rect.width) * 100
              setProgress(nextProgress)
              if (audioRef.current && audioDuration) {
                audioRef.current.currentTime = (nextProgress / 100) * audioDuration
              }
            }}
          >
            <div
              className="absolute inset-y-0 left-0 transition-none"
              style={{ background: 'var(--accent-foreground)', width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'var(--foreground)', left: `${progress}%` }}
            />
          </div>
          <span className="font-mono-display text-[10px] w-8 shrink-0" style={{ color: 'var(--muted-foreground)' }}>
            {formatTime(displayedDuration)}
          </span>
        </div>

        <div className="items-center gap-2 hidden md:flex">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--muted-foreground)' }}>
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
          </svg>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={e => setVolume(Number(e.target.value))}
            className="w-20 accent-[--accent-foreground] cursor-pointer"
            style={{ accentColor: 'var(--accent-foreground)' }}
          />
        </div>
      </div>
      <audio
        ref={audioRef}
        onLoadedMetadata={event => setAudioDuration(event.currentTarget.duration)}
        onTimeUpdate={event => {
          const audio = event.currentTarget
          setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0)
        }}
        onEnded={() => {
          setProgress(0)
          if (playing) onToggle()
        }}
      />
    </div>
  )
}

function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`py-24 px-6 max-w-5xl mx-auto ${className}`}>
      {children}
    </section>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span
        className="font-mono-display text-[10px] tracking-[0.2em] uppercase"
        style={{ color: 'var(--muted-foreground)' }}
      >
        {children}
      </span>
      <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
    </div>
  )
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [playingTrack, setPlayingTrack] = useState<(typeof tracks)[0] | null>(null)
  const [playerPlaying, setPlayerPlaying] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]') ?? document.createElement('link')
    favicon.rel = 'icon'
    favicon.type = 'image/jpeg'
    favicon.href = youtubeLogo
    document.head.appendChild(favicon)
  }, [])

  const filteredTracks =
    activeFilter === 'All'
      ? tracks
      : tracks.filter(t => t.tags.includes(activeFilter))

  function handlePlay(track: (typeof tracks)[0]) {
    if (playingTrack?.id === track.id) {
      setPlayerPlaying(p => !p)
    } else {
      setPlayingTrack(track)
      setPlayerPlaying(true)
    }
  }

  return (
    <div className="noise-overlay crt-scanlines min-h-screen" style={{ background: 'var(--background)' }}>
      {/* NAV */}
      <nav
        className="fixed top-0 inset-x-0 z-40 border-b border-[--border]"
        style={{ background: 'rgba(8,8,8,0.92)', backdropFilter: 'blur(8px)' }}
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <a
            href="#home"
            className="flex items-center gap-2 font-mono-display text-sm tracking-widest"
            style={{ color: 'var(--foreground)' }}
          >
            <img
              src={youtubeLogo}
              alt=""
              aria-hidden="true"
              className="h-7 w-7 rounded-full object-cover opacity-85"
            />
            <span>STILL FRAME</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {[
              ['#archive', 'Archive'],
              ['#featured', 'Featured'],
              ['#licensing', 'Licensing'],
              ['#about', 'About'],
              ['#youtube', 'YouTube'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="font-mono-display text-[11px] tracking-wider hover:text-[--foreground] transition-colors"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {label}
              </a>
            ))}
          </div>
          <button
            className="md:hidden font-mono-display text-xs"
            style={{ color: 'var(--muted-foreground)' }}
            onClick={() => setNavOpen(o => !o)}
          >
            {navOpen ? '✕' : '☰'}
          </button>
        </div>
        {navOpen && (
          <div
            className="md:hidden border-t border-[--border] px-6 py-4 flex flex-col gap-4"
            style={{ background: 'rgba(8,8,8,0.97)' }}
          >
            {[
              ['#archive', 'Archive'],
              ['#featured', 'Featured'],
              ['#licensing', 'Licensing'],
              ['#about', 'About'],
              ['#youtube', 'YouTube'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="font-mono-display text-xs tracking-wider"
                style={{ color: 'var(--muted-foreground)' }}
                onClick={() => setNavOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <div
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-14"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&h=900&fit=crop&auto=format"
            alt=""
            aria-hidden
            className="w-full h-full object-cover grayscale opacity-20"
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#080808] via-transparent to-[#080808]" />
          <div className="absolute inset-0 bg-linear-to-r from-[#080808] via-transparent to-[#080808]" />
        </div>

        <div
          className="relative z-10 flex flex-col items-center gap-6 px-6 animate-fade-in-up"
          style={{ animationDelay: '0.1s', opacity: 0 }}
        >
          <span
            className="font-mono-display text-[10px] tracking-[0.35em] uppercase"
            style={{ color: 'var(--muted-foreground)' }}
          >
            — Digital Archive v1.0 —
          </span>

          <h1
            className="font-mono-display text-5xl sm:text-7xl md:text-8xl tracking-[0.12em] uppercase leading-none"
            style={{ color: 'var(--foreground)' }}
          >
            STILL<br />FRAME
          </h1>

          <p
            className="font-mono-display text-xs tracking-[0.25em] uppercase"
            style={{ color: 'var(--accent-foreground)' }}
          >
            Dark / Eerie / Atmospheric Ambient Music
          </p>

          <p
            className="max-w-sm text-sm leading-relaxed"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Dark ambient music inspired by forgotten places,<br />
            strange worlds and video game atmospheres.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <a
              href="#archive"
              className="font-mono-display text-xs tracking-[0.2em] uppercase px-7 py-3 border border-[--foreground] hover:bg-[--foreground] hover:text-[--background] transition-all duration-300"
              style={{ color: 'var(--foreground)' }}
            >
              Explore Music
            </a>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-display text-xs tracking-[0.2em] uppercase px-7 py-3 border border-[--border] hover:border-[--accent] transition-colors duration-300"
              style={{ color: 'var(--muted-foreground)' }}
            >
              ▶ YouTube
            </a>
          </div>

          <div className="mt-16 flex flex-col items-center gap-2 opacity-50">
            <div className="w-px h-8" style={{ background: 'var(--border)' }} />
            <span className="font-mono-display text-[9px] tracking-widest" style={{ color: 'var(--muted-foreground)' }}>SCROLL</span>
          </div>
        </div>
      </div>

      {/* MUSIC ARCHIVE */}
      <Section id="archive">
        <SectionLabel>Music Archive</SectionLabel>

        <div className="flex flex-wrap gap-2 mb-10">
          {FILTER_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className="font-mono-display text-[10px] tracking-[0.15em] uppercase px-4 py-2 border transition-all duration-200"
              style={{
                borderColor: activeFilter === tag ? 'var(--accent-foreground)' : 'var(--border)',
                color: activeFilter === tag ? 'var(--accent-foreground)' : 'var(--muted-foreground)',
                background: activeFilter === tag ? 'rgba(61,92,58,0.12)' : 'transparent',
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTracks.map(track => (
            <TrackCard
              key={track.id}
              track={track}
              isPlaying={playingTrack?.id === track.id && playerPlaying}
              onPlay={() => handlePlay(track)}
            />
          ))}
        </div>

        {filteredTracks.length === 0 && (
          <div className="py-20 text-center font-mono-display text-xs" style={{ color: 'var(--muted-foreground)' }}>
            No tracks in this category yet.
          </div>
        )}
      </Section>

      {/* FEATURED TRACK */}
      <section id="featured" className="py-24 px-6 border-y border-[--border]" style={{ background: 'var(--card)' }}>
        <div className="max-w-5xl mx-auto">
          <SectionLabel>Featured Track</SectionLabel>
          <div className="grid md:grid-cols-2 gap-0 border border-[--border]">
            <div className="relative min-h-72 overflow-hidden">
              <img
                src={youtubeThumbnail(tracks[0].youtubeId!)}
                alt="somewhere between heaven and hell"
                className="w-full h-full object-cover grayscale opacity-50"
                style={{ minHeight: '288px' }}
              />
              <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#0d0d0d] hidden md:block" />
              <div className="absolute inset-0 bg-linear-to-t from-[#0d0d0d] to-transparent md:hidden" />
            </div>

            <div className="p-10 flex flex-col justify-center gap-6">
              <div>
                <span
                  className="font-mono-display text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: 'var(--accent-foreground)' }}
                >
                  Featured
                </span>
                <h2
                  className="font-mono-display text-2xl mt-3 leading-tight"
                  style={{ color: 'var(--foreground)' }}
                >
                  somewhere between<br />heaven and hell
                </h2>
              </div>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                An eerie ambient track hovering at the threshold between darkness and serenity. Inspired by the liminal spaces of Silent Hill.
              </p>
              <div className="flex items-center gap-2 font-mono-display text-[10px]" style={{ color: 'var(--muted-foreground)' }}>
                <span>6:42</span>
                <span>·</span>
                <span>Dark / Silent Hill</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handlePlay(tracks[0])}
                  className="font-mono-display text-xs tracking-[0.15em] uppercase px-6 py-3 border border-[--foreground] hover:bg-[--foreground] hover:text-[--background] transition-all duration-300"
                  style={{ color: 'var(--foreground)' }}
                >
                  {playingTrack?.id === 1 && playerPlaying ? '⏸ Pause' : '▶ Play Preview'}
                </button>
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-display text-xs tracking-[0.15em] uppercase px-6 py-3 border border-[--border] hover:border-[--accent] transition-colors duration-300"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  YouTube ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LICENSING */}
      <Section id="licensing">
        <SectionLabel>Use My Music</SectionLabel>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="flex flex-col gap-6">
            <h2
              className="font-mono-display text-3xl leading-snug"
              style={{ color: 'var(--foreground)' }}
            >
              Your project deserves<br />the right atmosphere.
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Want to use Still Frame music in your game or project? Non-exclusive licensing is available. Get in touch to discuss usage and licensing.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              This isn't a marketplace. It's one creator offering music directly to other creators who need something that doesn't sound like everyone else's soundtrack.
            </p>
            <a
              href="mailto:stillframesounds@outlook.com"
              className="font-mono-display text-xs tracking-[0.2em] uppercase px-7 py-3 border border-[--foreground] hover:bg-[--foreground] hover:text-[--background] transition-all duration-300 self-start"
              style={{ color: 'var(--foreground)' }}
            >
              Contact for Licensing
            </a>
          </div>

          <div className="flex flex-col gap-4">
            {[
              ['Games', 'Indie games, horror titles, atmospheric adventures.'],
              ['Video', 'YouTube, short films, documentary, found footage.'],
              ['Other Projects', 'Podcasts, installations, creative projects.'],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="p-5 border border-[--border] flex gap-4 items-start"
                style={{ background: 'var(--card)' }}
              >
                <span
                  className="font-mono-display text-[10px] mt-0.5 shrink-0"
                  style={{ color: 'var(--accent-foreground)' }}
                >
                  ◈
                </span>
                <div>
                  <p className="font-mono-display text-xs mb-1" style={{ color: 'var(--foreground)' }}>{title}</p>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 border-t border-[--border]" style={{ background: 'var(--card)' }}>
        <div className="max-w-5xl mx-auto">
          <SectionLabel>About Still Frame</SectionLabel>
          <div className="grid md:grid-cols-5 gap-12 items-start">
            <div className="md:col-span-3 flex flex-col gap-6">
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                All music is produced by me in Ableton Live. I'm still learning, experimenting, and exploring new sounds, so expect new moods as I grow.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                I started Still Frame as a way to capture something that I couldn't find elsewhere, the feeling of walking through a world that isn't quite real. The silence between the sounds. The unease that has no name.
              </p>
              <div
                className="flex items-center gap-3 p-4 border border-[--border]"
                style={{ background: 'rgba(61,92,58,0.06)' }}
              >
                <span style={{ color: 'var(--accent-foreground)' }}>◈</span>
                <p className="font-mono-display text-xs" style={{ color: 'var(--accent-foreground)' }}>
                  No AI involved in the production of my tracks.
                </p>
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-3">
              {[
                ['DAW', 'Ableton Live 9 Suite'],
                ['Genre', 'Dark Ambient / Atmospheric'],
                ['Influences', 'Silent Hill, Zelda, Horror Games'],
                ['Status', 'Learning & Experimenting'],
                ['Equipment', 'Zoom H1, Digital Piano'],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-4 py-2 border-b border-[--border]">
                  <span className="font-mono-display text-[10px] w-24 shrink-0 pt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                    {label.toUpperCase()}
                  </span>
                  <span className="font-mono-display text-xs" style={{ color: 'var(--foreground)' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* YOUTUBE */}
      <Section id="youtube">
        <SectionLabel>On YouTube</SectionLabel>
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-mono-display text-2xl" style={{ color: 'var(--foreground)' }}>
            Recent Videos
          </h2>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-display text-xs tracking-[0.15em] uppercase px-5 py-2.5 border border-[--border] hover:border-[--foreground] transition-colors"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Visit YouTube ↗
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ytVideos.map(v => (
            <a
              key={v.id}
              href={v.url ?? YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col border border-[--border] hover:border-[--accent] transition-colors duration-300 overflow-hidden"
              style={{ background: 'var(--card)' }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={v.youtubeId ? youtubeThumbnail(v.youtubeId) : v.img}
                  alt={v.title}
                  className="w-full aspect-video object-cover grayscale opacity-60 group-hover:opacity-80 group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center border border-[--border] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(8,8,8,0.85)' }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                      <polygon points="2,1 9,5 2,9" />
                    </svg>
                  </div>
                </div>
                <span
                  className="absolute bottom-1.5 right-1.5 font-mono-display text-[10px] px-1.5 py-0.5"
                  style={{ background: 'rgba(8,8,8,0.9)', color: 'var(--foreground)' }}
                >
                  {v.duration}
                </span>
              </div>
              <div className="p-3 flex flex-col gap-1">
                <p className="font-mono-display text-xs leading-snug" style={{ color: 'var(--foreground)' }}>
                  {v.title}
                </p>
                <span
                  className="font-mono-display text-[9px] tracking-widest uppercase"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {v.tag}
                </span>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-[--border] py-12 px-6" style={{ background: 'var(--card)' }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div className="flex flex-col gap-2">
            <p className="font-mono-display text-sm tracking-widest" style={{ color: 'var(--foreground)' }}>
              STILL FRAME
            </p>
            <p className="font-mono-display text-[10px] tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
              Dark / Eerie / Atmospheric Ambient Music
            </p>
            <p className="font-mono-display text-[9px] mt-2" style={{ color: 'var(--muted-foreground)', opacity: 0.5 }}>
              © {new Date().getFullYear()} Still Frame. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {[
              [YOUTUBE_URL, 'YouTube', true],
              ['mailto:stillframesounds@outlook.com', 'Contact', false],
              ['#licensing', 'Licensing', false],
              ['https://buymeacoffee.com/stillframesounds', 'Buy Me a Coffee', true],
            ].map(([href, label, external]) => (
              <a
                key={label as string}
                href={href as string}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="font-mono-display text-[10px] tracking-wider hover:text-[--foreground] transition-colors"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {label as string}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* PERSISTENT AUDIO PLAYER */}
      <AudioPlayer
        track={playingTrack}
        playing={playerPlaying}
        onToggle={() => setPlayerPlaying(p => !p)}
      />

      <div className="pb-20" />
    </div>
  )
}
