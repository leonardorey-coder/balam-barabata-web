'use client'

import { useCallback, useRef } from 'react'

type Source = {
  src: string
  type?: string
  media?: string
}

interface SegmentedVideoProps {
  start: number
  duration: number
  poster?: string
  className?: string
  sources: Source[]
}

export default function SegmentedVideo({
  start,
  duration,
  poster,
  className,
  sources,
}: SegmentedVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const handleLoadedMetadata = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    try {
      v.currentTime = start
    } catch {
      // noop
    }
  }, [start])

  const handleTimeUpdate = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    const end = start + duration
    if (v.currentTime < start || v.currentTime >= end) {
      v.currentTime = start
    }
  }, [start, duration])

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      onLoadedMetadata={handleLoadedMetadata}
      onTimeUpdate={handleTimeUpdate}
      aria-hidden="true"
    >
      {sources.map((s, i) => (
        <source key={i} src={s.src} type={s.type} media={s.media} />
      ))}
    </video>
  )
}

