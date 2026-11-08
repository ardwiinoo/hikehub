import { Pause, Play } from 'lucide-react'
import { useRef, useState } from 'react'

interface AuthVideoProps {
  src: string
  poster: string
}

/** Muted background video with a pause control (WCAG 2.2.2 for auto-playing motion). */
export function AuthVideo({ src, poster }: AuthVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(true)

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) void video.play()
    else video.pause()
  }

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        onPlay={() => {
          setPlaying(true)
        }}
        onPause={() => {
          setPlaying(false)
        }}
        className="absolute inset-0 size-full object-cover"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Jeda video' : 'Putar video'}
        className="absolute right-6 bottom-6 z-10 rounded-full bg-black/40 p-2.5 text-white backdrop-blur transition hover:bg-black/60"
      >
        {playing ? (
          <Pause className="size-4" aria-hidden />
        ) : (
          <Play className="size-4" aria-hidden />
        )}
      </button>
    </>
  )
}
