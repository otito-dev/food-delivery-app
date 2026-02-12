import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios";
import { toast } from 'react-toastify';

const List = ({url}) => {

    const [list,setList] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editData, setEditData] = useState({
        id: '',
        name: '',
        description: '',
        price: '',
        category: 'Salad'
    });
    const [editImage, setEditImage] = useState(null);

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {
            setList(response.data.data)
        }
        else{
            toast.error("Error")
        }
    }

    const removeFood = async (foodId) => {
        const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
        await fetchList();
        if (response.data.success) {
            toast.success(response.data.message)
        }
        else{
            toast.error("Error")
        }
    }

    const openEditModal = (item) => {
        setEditData({
            id: item._id,
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category
        });
        setEditImage(null);
        setShowEditModal(true);
    }

    const closeEditModal = () => {
        setShowEditModal(false);
        setEditData({
            id: '',
            name: '',
            description: '',
            price: '',
            category: 'Salad'
        });
        setEditImage(null);
    }

    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleEditImageChange = (event) => {
        setEditImage(event.target.files[0]);
    }

    const submitEdit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append("id", editData.id);
        formData.append("name", editData.name);
        formData.append("description", editData.description);
        formData.append("price", editData.price);
        formData.append("category", editData.category);
        
        if (editImage) {
            formData.append("image", editImage);
        }

        const response = await axios.post(`${url}/api/food/update`, formData);
        
        if (response.data.success) {
            toast.success(response.data.message);
            await fetchList();
            closeEditModal();
        } else {
            toast.error(response.data.message || "Error updating food");
        }
    }

    useEffect(()=>{
        fetchList();
    },[])

  return (
    <div className='list add flex-col'>
        <p>All Foods List</p>
        <div className="list-table">
            <div className="list-table-format title">
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b>Action</b>
            </div>
            {list.map((item,index)=>{
                return(
                    <div key={index} className='list-table-format'>
                        <img src={`${url}/images/`+ item.image} alt="" />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>₦{item.price}</p>
                        <div className='list-actions'>
                            <p onClick={()=>openEditModal(item)} className='cursor edit-btn'>Edit</p>
                            <p onClick={()=>removeFood(item._id)} className='cursor delete-btn'>X</p>
                        </div>
                    </div>
                )
            })}
        </div>

        {showEditModal && (
            <div className='edit-modal-overlay' onClick={closeEditModal}>
                <div className='edit-modal-content' onClick={(e) => e.stopPropagation()}>
                    <div className='edit-modal-header'>
                        <h2>Edit Food Item</h2>
                        <button className='close-btn' onClick={closeEditModal}>×</button>
                    </div>
                    
                    <form onSubmit={submitEdit} className='edit-modal-form'>
                        <div className='edit-form-group'>
                            <label>Product Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={editData.name}
                                onChange={handleEditChange}
                                required
                            />
                        </div>

                        <div className='edit-form-group'>
                            <label>Product Description</label>
                            <textarea 
                                name="description" 
                                value={editData.description}
                                onChange={handleEditChange}
                                rows="4"
                                required
                            ></textarea>
                        </div>

                        <div className='edit-form-row'>
                            <div className='edit-form-group'>
                                <label>Category</label>
                                <select name="category" value={editData.category} onChange={handleEditChange}>
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

                            <div className='edit-form-group'>
                                <label>Price</label>
                                <input 
                                    type="number" 
                                    name="price" 
                                    value={editData.price}
                                    onChange={handleEditChange}
                                    placeholder='₦...'
                                    step="0.01"
                                    required
                                />
                            </div>
                        </div>

                        <div className='edit-form-group'>
                            <label>Update Image (Optional)</label>
                            <input 
                                type="file" 
                                name="image"
                                onChange={handleEditImageChange}
                                accept="image/*"
                            />
                            <small>Leave empty to keep current image</small>
                        </div>

                        <div className='edit-modal-buttons'>
                            <button type='button' className='cancel-btn' onClick={closeEditModal}>Cancel</button>
                            <button type='submit' className='save-btn'>Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
  )
}

export default List