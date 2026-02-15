import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <div className='explore-menu-header'>
        <div className='explore-menu-title-section'>
          <h2 className='explore-menu-title'>Explore Our Menu</h2>
          <p className='explore-menu-subtitle'>
            Choose your favorite category and discover amazing dishes crafted with love
          </p>
        </div>
        
        <div className='category-count-badge'>
          <span className='count-number'>{menu_list.length}</span>
          <span className='count-label'>Categories</span>
        </div>
      </div>

      <div className='explore-menu-list-wrapper'>
        <div className='explore-menu-list-redesign'>
          {menu_list.map((item, index) => {
            return (
              <div 
                onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} 
                key={index} 
                className={`menu-category-card ${category === item.menu_name ? "active" : ""}`}
              >
                <div className='category-image-wrapper'>
                  <img 
                    src={item.menu_image} 
                    alt={item.menu_name}
                    className='category-image'
                  />
                  {category === item.menu_name && (
                    <div className='category-check-badge'>
                      ✔
                    </div>
                  )}
                </div>
                
                <div className='category-info'>
                  <h4 className='category-name'>{item.menu_name}</h4>
                  {category === item.menu_name && (
                    <span className='category-selected-tag'>Selected</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className='explore-menu-divider'>
        <div className='divider-line'></div>
        <span className='divider-text'>Scroll to explore</span>
        <div className='divider-line'></div>
      </div>
    </div>
  )
}

export default ExploreMenu