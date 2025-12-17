import { useEffect, useRef } from 'react'

const useMouseControls = (containerRef, stateRef, isReady) => {
  const mouseRotation = useRef(0)
  const touchStartX = useRef(0)
  const touchStartTime = useRef(0)
  const touchCount = useRef(0)

  useEffect(() => {
    if (!containerRef.current || !stateRef || !isReady) {
      console.log('Mouse controls waiting:', { hasContainer: !!containerRef.current, hasState: !!stateRef, isReady })
      return
    }

    console.log('Mouse controls initialized!')
    const container = containerRef.current

    // Mouse Click - Left: HEART
    const handleClick = (e) => {
      console.log('Click detected!')
      if (e.button === 0) {
        stateRef.current.current = 'HEART'
        console.log('State changed to HEART')
      }
    }

    // Mouse Right Click - PHOTO
    const handleContextMenu = (e) => {
      e.preventDefault()
      stateRef.current.current = 'PHOTO'
    }

    // Double Click - TREE
    const handleDblClick = () => {
      stateRef.current.current = 'TREE'
      mouseRotation.current = 0
    }

    // Mouse Wheel - Rotate
    const handleWheel = (e) => {
      e.preventDefault()
      if (stateRef.current.current !== 'TREE' && stateRef.current.current !== 'HEART') {
        stateRef.current.current = 'EXPLODE'
        mouseRotation.current += e.deltaY * 0.001
        stateRef.current.handX = (Math.sin(mouseRotation.current) + 1) / 2
      }
    }

    // Mouse Move - EXPLODE
    let mouseMoveTimeout
    const handleMouseMove = (e) => {
      clearTimeout(mouseMoveTimeout)
      if (stateRef.current.current === 'TREE' || stateRef.current.current === 'HEART' || stateRef.current.current === 'PHOTO') return
      
      stateRef.current.current = 'EXPLODE'
      const rect = container.getBoundingClientRect()
      stateRef.current.handX = (e.clientX - rect.left) / rect.width

      mouseMoveTimeout = setTimeout(() => {
        if (stateRef.current.current === 'EXPLODE') stateRef.current.current = 'EXPLODE'
      }, 100)
    }

    // Touch Start
    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX
      touchStartTime.current = Date.now()
      touchCount.current++

      setTimeout(() => {
        if (touchCount.current === 2) {
          stateRef.current.current = 'TREE'
          mouseRotation.current = 0
        }
        touchCount.current = 0
      }, 300)
    }

    // Touch Move
    const handleTouchMove = (e) => {
      e.preventDefault()
      if (stateRef.current.current !== 'TREE' && stateRef.current.current !== 'HEART') {
        stateRef.current.current = 'EXPLODE'
        const rect = container.getBoundingClientRect()
        stateRef.current.handX = (e.touches[0].clientX - rect.left) / rect.width
      }
    }

    // Touch End
    const handleTouchEnd = () => {
      const touchDuration = Date.now() - touchStartTime.current
      
      if (touchDuration < 200) {
        stateRef.current.current = 'HEART'
      } else if (touchDuration > 500) {
        stateRef.current.current = 'PHOTO'
      }
    }

    // Add event listeners
    container.addEventListener('click', handleClick)
    container.addEventListener('contextmenu', handleContextMenu)
    container.addEventListener('dblclick', handleDblClick)
    container.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('touchstart', handleTouchStart)
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd)

    // Initial state
    setTimeout(() => {
      if (stateRef.current.current === 'TREE') stateRef.current.current = 'EXPLODE'
    }, 2000)

    // Cleanup
    return () => {
      container.removeEventListener('click', handleClick)
      container.removeEventListener('contextmenu', handleContextMenu)
      container.removeEventListener('dblclick', handleDblClick)
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
      clearTimeout(mouseMoveTimeout)
    }
  }, [containerRef, stateRef, isReady])

  return { mouseRotation, touchStartX }
}

export default useMouseControls
