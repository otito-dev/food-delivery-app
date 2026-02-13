import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("home");
    const [searchActive, setSearchActive] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const {getTotalCartAmount,token,setToken,food_list,searchQuery,setSearchQuery} = useContext(StoreContext)

    const navigate = useNavigate();

    const logout = () => {
        setIsLoggingOut(true);
        setTimeout(() => {
            localStorage.removeItem("token");
            setToken("");
            setIsLoggingOut(false);
            navigate("/");
        }, 800);
    }

    const handleHomeClick = () => {
        setMenu("home");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    }

    const handleSearchIcon = () => {
        setSearchActive(!searchActive);
    }

    const handleCartClick = () => {
        if (!token) {
            setShowLogin(true);
        } else {
            navigate('/cart');
        }
    }

  return (
    <div className='navbar'>
        {isLoggingOut && (
            <div className='logout-overlay'>
                <div className='logout-modal'>
                    <div className='logout-spinner'></div>
                    <p>Logging out...</p>
                </div>
            </div>
        )}
        <Link to='/' onClick={handleHomeClick}><img src={assets.logo} alt="" className="logo" /></Link>
        <ul className="navbar-menu">
            <Link to='/' onClick={handleHomeClick} className={menu==="home"?"active":""}>Home</Link>
            <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
            <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile-App</a>
            <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact Us</a>
        </ul>
        <div className='navbar-right'>
            <div className={`search-container ${searchActive ? 'active' : ''}`}>
                <input 
                    type='text' 
                    className='search-input'
                    placeholder='Search foods...'
                    value={searchQuery}
                    onChange={handleSearch}
                    onFocus={() => setSearchActive(true)}
                    onBlur={() => setTimeout(() => setSearchActive(false), 200)}
                />
                <img 
                    src={assets.search_icon} 
                    alt="search" 
                    className="search-icon-btn"
                    onClick={handleSearchIcon}
                />
            </div>
            <div className="navbar-search-icon" onClick={handleCartClick} style={{cursor: 'pointer'}}>
                <img src={assets.basket_icon} alt="" />
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            {!token?<button onClick={()=>setShowLogin(true)}>Sign In</button>
            :<div className='navbar-profile'>
                <img src={assets.profile_icon} alt="" />
                <ul className='nav-profile-dropdown'>
                    <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                    <hr />
                    <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                </ul>
            </div>}
            
        </div>
    </div>
  )
}

export default Navbar