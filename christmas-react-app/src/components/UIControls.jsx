import './UIControls.css'

const UIControls = ({ onStart }) => {
  return (
    <div className="ui-layer">
      <div className="guide">
        <span className="desktop-guide">
          🖱️ <b>Click Trái:</b> I Love You ❤️ &nbsp;|&nbsp;
          🖱️ <b>Click Phải:</b> Phóng To Ảnh 📷<br />
          🖱️ <b>Double Click:</b> Về Cây Thông 🎄 &nbsp;|&nbsp; <b>Scroll:</b> Xoay Ảnh 🔄
        </span>
        <span className="mobile-guide">
          👆 <b>Tap 1:</b> Xem Ảnh 📷 &nbsp;|&nbsp; <b>Tap 2:</b> I Love You ❤️<br />
          👆 <b>Tap 3:</b> Phóng To 🔍 &nbsp;|&nbsp; <b>Vuốt:</b> Xoay 🔄
        </span>
      </div>
      <button className="start-button" onClick={onStart}>
        START MAGIC
      </button>
    </div>
  )
}

export default UIControls
