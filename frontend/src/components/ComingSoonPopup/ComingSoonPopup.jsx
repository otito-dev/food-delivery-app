import React from 'react'
import './ComingSoonPopup.css'
import { assets } from '../../assets/assets'

const ComingSoonPopup = ({ setShowComingSoon, platform }) => {
  return (
    <div className='coming-soon-popup'>
        <div className="coming-soon-popup-container">
            <div className='coming-soon-popup-title'>
                <h2>Coming Soon!</h2>
                <img onClick={() => setShowComingSoon(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="coming-soon-popup-content">
                <div className="coming-soon-emoji">🚀</div>
                <p className="coming-soon-text">
                    Stay Tuned! The <span className="platform-name">{platform}</span> app is coming soon.
                </p>
                <p className="coming-soon-subtitle">
                    We're working hard to bring you the best mobile experience!
                </p>
            </div>
            <button onClick={() => setShowComingSoon(false)} className="coming-soon-button">
                Got It!
            </button>
        </div>
    </div>
  )
}

export default ComingSoonPopup
