import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const MyOrders = () => {

    const {url,token} = useContext(StoreContext);
    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchOrders = async() => {
        setLoading(true);
        try {
            const response = await axios.post(url+"/api/order/userorders",{}, {headers:{token}});
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
        setLoading(false);
    }

    useEffect(()=>{
        if (token) {
            fetchOrders();
        }
    },[token])

  return (
    <div className='my-orders'>
      <div className='orders-header'>
        <h1>My Orders</h1>
        <button 
          className='track-order-btn'
          onClick={fetchOrders}
          disabled={loading}
        >
          {loading ? '⟳ Refreshing...' : '🔄 Track Order'}
        </button>
      </div>
      {data.length === 0 ? (
        <p className='no-orders'>No orders yet</p>
      ) : (
        <div className='orders-list'>
          {data.map((order, index) => (
            <div key={index} className='order-item'>
              <div className='order-header'>
                <h3>Order #{order._id.slice(-6).toUpperCase()}</h3>
                <span className={`status ${order.payment ? 'paid' : 'pending'}`}>
                  {order.payment ? '✓ Paid' : '⏳ Pending Payment'}
                </span>
              </div>
              
              <div className='order-date'>
                <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
              </div>

              <div className='order-items'>
                <h4>Items:</h4>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} × {item.quantity} = ₦{item.price * item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className='order-details'>
                <div className='detail-row'>
                  <span>Subtotal:</span>
                  <span>₦{order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
                </div>
                <div className='detail-row'>
                  <span>Delivery Address:</span>
                  <span>
                    {order.address.street}, {order.address.city}, {order.address.state}
                  </span>
                </div>
                <div className='detail-row total'>
                  <span>Total:</span>
                  <span>₦{order.amount}</span>
                </div>
              </div>

              <div className='order-status'>
                <p><strong>Order Status:</strong> {order.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyOrders