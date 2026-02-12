import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. In magnam consectetur saepe illo aliquid aliquam sunt consequuntur aut provident perferendis? ipsum dolor, sit amet consectetur adipisicing elit. Excepturi fugiat delectus suscipit maiores ab, possimus in, ipsa vero aliquid quasi, ducimus officia! Debitis, est minus!</p>
                <div className="footer-social-icons">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src={assets.facebook_icon} alt="Facebook" />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src={assets.twitter_icon} alt="Twitter" />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <img src={assets.linkedin_icon} alt="LinkedIn" />
                    </a>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li><Link to="/" onClick={scrollToTop}>Home</Link></li>
                    <li>About Us</li>
                    <li><Link to="/myorders">Delivery</Link></li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+234-80-318-3980</li>
                    <li>otitofranklin70@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='foooter-copyright'>Copyright 2025 @ Tomato.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer