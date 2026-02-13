import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'

const Navbar = ({ token, setToken }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const handleLogout = () => {
    setShowLogoutModal(true)
    
    setTimeout(() => {
      // Remove token
      localStorage.removeItem('adminToken')
      setToken("")
      toast.success('Logged out successfully')
      setShowLogoutModal(false)
    }, 800)
  }

  return (
    <>
      {/* Logout Modal */}
      {showLogoutModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            background: 'white',
            padding: '48px',
            borderRadius: '20px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              border: '5px solid #f8f9fa',
              borderTop: '5px solid #667eea',
              borderRadius: '50%',
              margin: '0 auto 20px',
              animation: 'spin 1.2s linear infinite'
            }}></div>
            <p style={{
              color: '#2c3e50',
              fontSize: '16px',
              fontWeight: 500,
              margin: 0
            }}>
              Logging out...
            </p>
          </div>
        </div>
      )}

      <div className='navbar'>
        <img className='logo' src={assets.logo} alt="" />
        <div style={{ position: 'relative' }}>
          <img 
            className='profile' 
            src={assets.profile_image} 
            alt="" 
            style={{ cursor: 'pointer' }}
            title="Click to logout"
          />
          {/* Logout dropdown */}
          <div className='admin-profile-dropdown'>
            <div onClick={handleLogout} className='logout-option'>
              <span>🚪</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar