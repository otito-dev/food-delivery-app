import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = ({token, pendingOrders = 0}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
    window.location.reload();
  }

  return (
    <div className='admin-navbar-redesign'>
      <div className='admin-navbar-container'>
        <div className='admin-navbar-left'>
          <img className='admin-logo' src={assets.logo} alt="QuickBite Admin" />
          <div className='admin-badge'>
            <span className='badge-dot'></span>
            <span>Admin Panel</span>
          </div>
        </div>
        
        <div className='admin-navbar-right'>
          <button className='admin-notification-btn'>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 6.66667C15 5.34058 14.4732 4.06881 13.5355 3.13113C12.5979 2.19345 11.3261 1.66667 10 1.66667C8.67392 1.66667 7.40215 2.19345 6.46447 3.13113C5.52678 4.06881 5 5.34058 5 6.66667C5 12.5 2.5 14.1667 2.5 14.1667H17.5C17.5 14.1667 15 12.5 15 6.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.4417 17.5C11.2952 17.7526 11.0849 17.9622 10.8319 18.1079C10.5789 18.2537 10.292 18.3304 10 18.3304C9.70802 18.3304 9.42116 18.2537 9.16815 18.1079C8.91514 17.9622 8.70484 17.7526 8.55835 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {pendingOrders > 0 && <span className='notification-badge'>{pendingOrders}</span>}
          </button>

          <button className='admin-signout-btn' onClick={handleLogout} title="Sign Out">
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar