import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {

    const { food_list = [], searchQuery } = useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near your</h2>
        <div className='food-display-list'>
            {food_list.map((item, index) => {
                // Filter by search query first
                const matchesSearch = !searchQuery || 
                    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.category.toLowerCase().includes(searchQuery.toLowerCase());
                
                if(matchesSearch && (category==="All" || category===item.category)){
                    return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                }
            })}
        </div>
    </div>
  )
}

export default FoodDisplay