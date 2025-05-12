"use client"

import { useRef, useEffect } from "react"

interface VideoBackgroundProps {
  src: string
  className?: string
}

export default function VideoBackground({ src, className = "" }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("비디오 자동 재생 실패:", error)
      })
    }
  }, [])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <video ref={videoRef} className="w-full h-full object-cover" autoPlay loop muted playsInline>
        <source src={src} type="video/mp4" />
        브라우저가 비디오 태그를 지원하지 않습니다.
      </video>
    </div>
  )
}
