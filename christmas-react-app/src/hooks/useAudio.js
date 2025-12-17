import { useEffect, useRef } from 'react'

const useAudio = () => {
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio('/audio.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 1.0

    // Auto play
    audioRef.current.play().catch(e => console.log('Audio play error:', e))

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  return audioRef
}

export default useAudio
