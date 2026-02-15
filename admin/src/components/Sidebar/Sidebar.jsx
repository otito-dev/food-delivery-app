import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-content'>
        <NavLink to='/add' className='sidebar-link'>
          <div className='sidebar-icon-wrapper'>
            <img src={assets.add_icon} alt="Add" />
          </div>
          <span className='sidebar-label'>Add Items</span>
          <div className='sidebar-indicator'></div>
        </NavLink>

        <NavLink to='/list' className='sidebar-link'>
          <div className='sidebar-icon-wrapper'>
            <img src={assets.order_icon} alt="List" />
          </div>
          <span className='sidebar-label'>List Items</span>
          <div className='sidebar-indicator'></div>
        </NavLink>

        <NavLink to='/orders' className='sidebar-link'>
          <div className='sidebar-icon-wrapper'>
            <img src={assets.order_icon} alt="Orders" />
          </div>
          <span className='sidebar-label'>Orders</span>
          <div className='sidebar-indicator'></div>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar