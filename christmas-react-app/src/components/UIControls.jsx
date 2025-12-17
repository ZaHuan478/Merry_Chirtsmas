import './UIControls.css'

const UIControls = ({ onStart }) => {
  return (
    <div className="ui-layer">
      <div className="guide">
        🖱️ <b>Click Trái:</b> I Love You ❤️<br />
        🖱️ <b>Click Phải:</b> Phóng To Ảnh 📷<br />
        🖱️ <b>Double Click:</b> Về Cây Thông 🎄 &nbsp;|&nbsp; <b>Scroll:</b> Xoay Ảnh 🔄
      </div>
      <button className="start-button" onClick={onStart}>
        START MAGIC
      </button>
    </div>
  )
}

export default UIControls
