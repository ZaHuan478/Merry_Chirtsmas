import './UIControls.css'

const UIControls = ({ onStart }) => {
  return (
    <div className="ui-layer">
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
      <button className="start-button" onClick={onStart}>
        START MAGIC
      </button>
    </div>
  )
}

export default UIControls
