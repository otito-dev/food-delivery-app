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
        <div className='add'>
            <div className='add-container'>
                <div className='add-header'>
                    <h1 className='add-title'>Add New Item</h1>
                    <p className='add-subtitle'>Fill in the details to add a new food item to your menu</p>
                </div>

                <form className='add-form-redesign' onSubmit={onSubmitHandler}>
                    <div className='form-grid'>
                        <div className='form-section image-upload-section'>
                            <label className='section-label'>Product Image</label>
                            <div className='image-upload-area'>
                                <label htmlFor='image' className='image-upload-label'>
                                    {image ? (
                                        <div className='image-preview'>
                                            <img src={URL.createObjectURL(image)} alt="Preview" />
                                            <div className='image-overlay'>
                                                <span style={{fontSize: '24px'}}>📤</span>
                                                <span>Change Image</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='image-placeholder'>
                                            <span style={{fontSize: '48px'}}>🖼️</span>
                                            <p>Click to upload image</p>
                                            <span>PNG, JPG up to 5MB</span>
                                        </div>
                                    )}
                                </label>
                                <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required />
                            </div>
                        </div>

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
                                ➕
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