import React, { useState } from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'
import ComingSoonPopup from '../ComingSoonPopup/ComingSoonPopup'

const AppDownload = () => {
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState('')

  const handlePlatformClick = (platform) => {
    setSelectedPlatform(platform)
    setShowComingSoon(true)
  }

  return (
    <>
      {showComingSoon && <ComingSoonPopup setShowComingSoon={setShowComingSoon} platform={selectedPlatform} />}
      <div className='app-download' id='app-download'>
          <p>For Better Experience Download <br />QuickBite App</p>
          <div className="app-download-platforms">
              <img src={assets.play_store} alt="Google Play Store" onClick={() => handlePlatformClick('Google Play Store')} />
              <img src={assets.app_store} alt="Apple App Store" onClick={() => handlePlatformClick('Apple App Store')} />
          </div>
      </div>
    </>
  )
}

export default AppDownload