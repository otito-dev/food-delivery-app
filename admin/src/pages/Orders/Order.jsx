import React, { useState, useEffect } from 'react'
import './Order.css'
import axios from 'axios'
import { assets } from '../../assets/assets'

const Order = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const url = "http://localhost:4000"

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const response = await axios.get(url + "/api/order/list")
      if (response.data.success) {
        setOrders(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: newStatus
      })
      if (response.data.success) {
        fetchOrders()
      }
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  const handlePaymentConfirm = async (orderId) => {
    try {
      const response = await axios.post(url + "/api/order/confirm", {
        orderId
      })
      if (response.data.success) {
        fetchOrders()
      }
    } catch (error) {
      console.error("Error confirming payment:", error)
    }
  }

  return (
    <div className='order-container'>
      <h1>Order Management</h1>
      
      {loading ? (
        <div className='loading'>Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className='no-orders'>No orders found</div>
      ) : (
        <div className='orders-wrapper'>
          {orders.map((order, index) => (
            <div key={index} className='order-card'>
              <div className='order-card-header'>
                <div className='order-id'>
                  <h3>Order #{order._id.slice(-6).toUpperCase()}</h3>
                  <span className={`payment-badge ${order.payment ? 'paid' : 'unpaid'}`}>
                    {order.payment ? '✓ PAID' : '⏳ UNPAID'}
                  </span>
                </div>
                <span className='order-date'>
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </div>

              <div className='order-customer'>
                <h4>Customer Details</h4>
                <div className='customer-info'>
                  <p><strong>Name:</strong> {order.address.firstName} {order.address.lastName}</p>
                  <p><strong>Email:</strong> {order.address.email}</p>
                  <p><strong>Phone:</strong> {order.address.phone}</p>
                  <p><strong>Address:</strong> {order.address.street}, {order.address.city}, {order.address.state} {order.address.zipcode}, {order.address.country}</p>
                </div>
              </div>

              <div className='order-items'>
                <h4>Items Ordered</h4>
                <table className='items-table'>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td className='qty-cell'>{item.quantity}</td>
                        <td className='price-cell'>₦{item.price}</td>
                        <td className='total-cell'>₦{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className='order-summary'>
                <div className='summary-item'>
                  <span>Subtotal:</span>
                  <span>₦{order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
                </div>
                <div className='summary-item total-amount'>
                  <span>Total Amount:</span>
                  <span>₦{order.amount}</span>
                </div>
              </div>

              <div className='order-actions'>
                <div className='status-section'>
                  <label>Order Status:</label>
                  <select 
                    value={order.status} 
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className='status-select'
                  >
                    <option value="Order Received">Order Received</option>
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

                {!order.payment && (
                  <button 
                    className='confirm-payment-btn'
                    onClick={() => handlePaymentConfirm(order._id)}
                  >
                    ✓ Confirm Payment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Order