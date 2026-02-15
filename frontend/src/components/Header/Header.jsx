import React from 'react'
import './Header.css'
import newback from '../../assets/newback.png'

const Header = () => {
  const goToMenu = (e) => {
    e?.preventDefault();
    const el = document.getElementById('explore-menu');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.location.hash = '#explore-menu';
  }

  const openHowItWorks = (e) => {
    e?.preventDefault();
    window.open('https://www.youtube.com/', '_blank');
  }
  return (
    <div className='header'>
      <div className='header-content-wrapper'>
        <div className='header-text-section'>
          <div className='header-badge'>
            <span className='badge-icon'>🔥</span>
            <span>Fast Delivery in 30 mins</span>
          </div>
          
          <h1 className='header-title'>
            Order Your
            <span className='header-title-highlight'> Favourite Food </span>
            Here
          </h1>
          
          <p className='header-description'>
            Choose from a diverse menu featuring a delectable array of dishes 
            crafted with the finest ingredients and culinary expertise. Our 
            mission is to satisfy your cravings and elevate your dining 
            experience, one delicious meal at a time.
          </p>
          
          <div className='header-actions'>
            <button className='header-cta-btn' onClick={goToMenu}>
              <span>View Menu</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <button className='header-secondary-btn' onClick={openHowItWorks}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 14.5V5.5L14 10L8 14.5Z"/>
              </svg>
              <span>How it works</span>
            </button>
          </div>
          
          <div className='header-stats'>
            <div className='stat-item'>
              <h3>30+</h3>
              <p>Dishes</p>
            </div>
            <div className='stat-divider'></div>
            <div className='stat-item'>
              <h3>5k+</h3>
              <p>Happy Customers</p>
            </div>
            <div className='stat-divider'></div>
            <div className='stat-item'>
              <h3>30min</h3>
              <p>Delivery Time</p>
            </div>
          </div>
        </div>
        
        <div className='header-visual-section'>
          <div className='header-image-overlay'>
            <img src={newback} alt="background" className='header-bg-img' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header