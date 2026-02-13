import React, { useContext, useEffect } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const {cartItems,food_list,removeFromCart,getTotalCartAmount,url,token} = useContext(StoreContext)
  const navigate = useNavigate();
  const deliveryFee = Math.round(getTotalCartAmount()*0.2);

  // Redirect to home if not logged in and scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  // Don't render if not authenticated
  if (!token) {
    return null;
  }

  // Check if cart is empty
  const isCartEmpty = getTotalCartAmount() === 0;

  if (isCartEmpty) {
    return (
      <div className='cart'>
        <div className='empty-cart'>
          <div className='empty-cart-icon'>🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some delicious food to your cart to get started!</p>
          <button onClick={() => navigate('/')} className='continue-shopping-btn'>
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='cart'> 
      <div className='cart-items'>
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,index)=>{
          if(cartItems[item._id]>0)
          {
            return(
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₦{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₦{item.price*cartItems[item._id]}</p>
                  <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
                </div>
               <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-buttom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="card-total-details">
              <p>subtotal</p>
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
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-pronmocode-input'>
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart