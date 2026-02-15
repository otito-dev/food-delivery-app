import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const PlaceOrder = () => {

  const navigate = useNavigate()

  const {
    getTotalCartAmount,
    deliveryFee,
    token,
    food_list,
    cartItems,
    url,
    setCartItems,
    loading  
  } = useContext(StoreContext)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(prev => ({ ...prev, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault();

    try {

      let orderItems = [];

      food_list.forEach((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = { ...item };
          itemInfo["quantity"] = cartItems[item._id];
          orderItems.push(itemInfo);
        }
      })

      if (orderItems.length === 0) {
        alert("Your cart is empty");
        return;
      }

      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + deliveryFee,
      }

      let response = await axios.post(
        url + "/api/order/place",
        orderData,
        { headers: { token } }
      );

      if (response.data.success) {

        let itemsList = "🛒 ORDER ITEMS:\n";
        orderItems.forEach((item) => {
          itemsList += `• ${item.name} x${item.quantity} = ₦${item.price * item.quantity}\n`;
        });

        const orderSummary =
          `${itemsList}\n📊 ORDER SUMMARY:\nSubtotal: ₦${getTotalCartAmount()}\nDelivery Fee: ₦${deliveryFee}\n━━━━━━━━━━━━━━━\nTotal: ₦${getTotalCartAmount() + deliveryFee}\n\n📍 Delivery Address:\n${data.firstName} ${data.lastName}\n${data.street}\n${data.city}, ${data.state} ${data.zipcode}\n${data.country}\nPhone: ${data.phone}`;

        const whatsappMessage = encodeURIComponent(
          `Hi, I would like to proceed with payment for my order.\n\n${orderSummary}`
        );

        const whatsappBusinessNumber =
          import.meta.env.VITE_WHATSAPP_NUMBER || "2348083183980";

        window.open(`https://wa.me/${whatsappBusinessNumber}?text=${whatsappMessage}`, '_blank');
        setCartItems({});
        navigate('/myorders');

      } else {
        alert(response.data.message || "Error placing order");
      }

    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing your order.");
    }
  }

  useEffect(() => {

    if (loading) return;

    if (!token) {
      navigate('/cart');
      return;
    }

    if (Object.keys(cartItems).length === 0) {
      navigate('/cart');
    }

  }, [loading, token, cartItems, navigate]);

  if (loading) {
    return <div className="place-order"><h2>Loading...</h2></div>
  }

  return (
    <form onSubmit={placeOrder} className='place-order'>

      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="mutlti-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>

        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />

        <div className="mutlti-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>

        <div className="mutlti-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>

        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="tel" placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="card-total-details">
              <p>Subtotal</p>
              <p>₦{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="card-total-details">
              <p>Delivery Fee</p>
              <p>₦{deliveryFee}</p>
            </div>
            <hr />
            <div className="card-total-details">
              <b>Total</b>
              <b>₦{getTotalCartAmount() + deliveryFee}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder
