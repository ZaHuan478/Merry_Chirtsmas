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
        🖱️ <b>Click Trái:</b> I Love You ❤️<br />
        🖱️ <b>Click Phải:</b> Phóng To Ảnh 📷<br />
        🖱️ <b>Double Click:</b> Về Cây Thông 🎄 &nbsp;|&nbsp; <b>Scroll:</b> Xoay Ảnh 🔄
      </div>
    </div>
  )
}

export default ChristmasScene
