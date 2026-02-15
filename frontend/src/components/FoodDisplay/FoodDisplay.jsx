import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {
    const {food_list, searchQuery} = useContext(StoreContext)

    return (
        <div className='food-display-redesign' id='food-display'>
            <div className='food-display-header'>
                <h2 className='food-display-title'>
                    {category === "All" ? "Top Dishes Near You" : `Best ${category} Dishes`}
                </h2>
                <div className='food-display-filter-info'>
                    <span className='filter-badge'>
                        {food_list.filter(item => (category === "All" || category === item.category) && item.name.toLowerCase().includes(searchQuery.toLowerCase())).length} items
                    </span>
                    {category !== "All" && (
                        <button className='clear-filter-btn' onClick={() => {}}>
                            <span>Clear filter</span>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M11 3L3 11M3 3L11 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            <div className='food-display-list-redesign'>
                {food_list.map((item, index) => {
                    if ((category === "All" || category === item.category) && item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                        return (
                            <FoodItem 
                                key={index} 
                                id={item._id} 
                                name={item.name} 
                                description={item.description} 
                                price={item.price} 
                                image={item.image}
                            />
                        )
                    }
                    return null
                })}
            </div>

            {food_list.filter(item => (category === "All" || category === item.category) && item.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                <div className='no-items-found'>
                    <div className='no-items-icon'>🍽️</div>
                    <h3>No items found</h3>
                    <p>We couldn't find any dishes in this category.</p>
                    <button className='back-to-all-btn'>
                        View All Dishes
                    </button>
                </div>
            )}
        </div>
    )
}

export default FoodDisplay