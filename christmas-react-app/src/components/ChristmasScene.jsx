import { useRef } from 'react'
import useThreeScene from '../hooks/useThreeScene'
import useMouseControls from '../hooks/useMouseControls'

const ChristmasScene = () => {
  const containerRef = useRef(null)
  const { state, isReady } = useThreeScene(containerRef)
  useMouseControls(containerRef, state, isReady)

  return (
    <div>
      <div ref={containerRef} id="canvas-container"></div>
      <div className="guide">
        <span className="desktop-guide">
          🖱️ <b>Click/Di Chuột:</b> Xem Ảnh 📷 &nbsp;|&nbsp;
          🖱️ <b>Click Phải:</b> Phóng To 🔍 &nbsp;|&nbsp; <b>Scroll:</b> Xoay 🔄
        </span>
        <span className="mobile-guide">
          👆 <b>Tap 1:</b> Xem Ảnh 📷 &nbsp;|&nbsp; <b>Tap 2:</b> Phóng To 🔍<br />
          👆 <b>Vuốt:</b> Xoay Ảnh 🔄
        </span>
      </div>
    </div>
  )
}

export default ChristmasScene
