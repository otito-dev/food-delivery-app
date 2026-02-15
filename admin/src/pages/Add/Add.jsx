import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]:value}))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("image", image)
        
        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            })
            setImage(false)
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }
    }

    return (
        <div className='add-redesign'>
            <div className='add-container'>
                <div className='add-header'>
                    <h1 className='add-title'>Add New Item</h1>
                    <p className='add-subtitle'>Fill in the details to add a new food item to your menu</p>
                </div>

                <form className='add-form-redesign' onSubmit={onSubmitHandler}>
                    <div className='form-grid'>
                        {/* Image Upload */}
                        <div className='form-section image-upload-section'>
                            <label className='section-label'>Product Image</label>
                            <div className='image-upload-area'>
                                <label htmlFor='image' className='image-upload-label'>
                                    {image ? (
                                        <div className='image-preview'>
                                            <img src={URL.createObjectURL(image)} alt="Preview" />
                                            <div className='image-overlay'>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M17 8L12 3M12 3L7 8M12 3V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                <span>Change Image</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='image-placeholder'>
                                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                                <path d="M40 38V10C40 8.89543 39.1046 8 38 8H10C8.89543 8 8 8.89543 8 10V38C8 39.1046 8.89543 40 10 40H38C39.1046 40 40 39.1046 40 38Z" stroke="#bdc3c7" strokeWidth="2"/>
                                                <path d="M8 32L16 24L24 32M24 32L28 28L40 40" stroke="#bdc3c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <circle cx="18" cy="18" r="3" fill="#bdc3c7"/>
                                            </svg>
                                            <p>Click to upload image</p>
                                            <span>PNG, JPG up to 5MB</span>
                                        </div>
                                    )}
                                </label>
                                <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required />
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className='form-section fields-section'>
                            <div className='form-group'>
                                <label className='field-label'>Product Name</label>
                                <input 
                                    onChange={onChangeHandler} 
                                    value={data.name} 
                                    type='text' 
                                    name='name' 
                                    placeholder='e.g. Margherita Pizza'
                                    required
                                />
                            </div>

                            <div className='form-group'>
                                <label className='field-label'>Product Description</label>
                                <textarea 
                                    onChange={onChangeHandler} 
                                    value={data.description} 
                                    name='description' 
                                    rows='4' 
                                    placeholder='Describe the dish, ingredients, and what makes it special...'
                                    required
                                ></textarea>
                            </div>

                            <div className='form-row'>
                                <div className='form-group'>
                                    <label className='field-label'>Category</label>
                                    <select onChange={onChangeHandler} value={data.category} name='category'>
                                        <option value="Salad">Salad</option>
                                        <option value="Rolls">Rolls</option>
                                        <option value="Deserts">Deserts</option>
                                        <option value="Sandwich">Sandwich</option>
                                        <option value="Cake">Cake</option>
                                        <option value="Pure Veg">Pure Veg</option>
                                        <option value="Pasta">Pasta</option>
                                        <option value="Noodles">Noodles</option>
                                    </select>
                                </div>

                                <div className='form-group'>
                                    <label className='field-label'>Price (₦)</label>
                                    <input 
                                        onChange={onChangeHandler} 
                                        value={data.price} 
                                        type='number' 
                                        name='price' 
                                        placeholder='1500'
                                        required
                                    />
                                </div>
                            </div>

                            <button type='submit' className='add-submit-btn'>
                                +
                                <span>Add Food Item</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Add