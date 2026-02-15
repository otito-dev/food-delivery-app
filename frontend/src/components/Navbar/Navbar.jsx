import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {
    const [menu,setMenu] = useState("home");
    const {getTotalCartAmount, cartItems, token, setToken, searchQuery, setSearchQuery, loading} = useContext(StoreContext);
    const [searchActive, setSearchActive] = useState(false);
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleHomeClick = (e) => {
        setMenu('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (loading) {
        return <div className="navbar-redesign"></div>;
    }
    return (
        <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
            <div className='navbar-container'>
                <div className='navbar-left'>
                    <Link to='/' className='navbar-logo-link' onClick={handleHomeClick}>
                        <img src={assets.logo} alt="QuickBite" className='navbar-logo' />
                    </Link>
                    
                    <ul className="navbar-menu-redesign">
                        <li>
                            <Link 
                                to='/' 
                                onClick={handleHomeClick} 
                                className={menu==="home"?"navbar-link active":"navbar-link"}
                            >
                                <span>Home</span>
                            </Link>
                        </li>
                        <li>
                            <a 
                                href='#explore-menu' 
                                onClick={()=>setMenu("menu")} 
                                className={menu==="menu"?"navbar-link active":"navbar-link"}
                            >
                                <span>Menu</span>
                            </a>
                        </li>
                        <li>
                            <a 
                                href='#app-download' 
                                onClick={()=>setMenu("mobile-app")} 
                                className={menu==="mobile-app"?"navbar-link active":"navbar-link"}
                            >
                                <span>Mobile App</span>
                            </a>
                        </li>
                        <li>
                            <a 
                                href='#footer' 
                                onClick={()=>setMenu("contact-us")} 
                                className={menu==="contact-us"?"navbar-link active":"navbar-link"}
                            >
                                <span>Contact</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="navbar-actions">
                    <div className={`navbar-search-container ${searchActive ? 'active' : ''}`}>
                        <input
                            className='search-input'
                            type='text'
                            placeholder='Search foods...'
                            value={searchQuery}
                            onChange={(e)=>setSearchQuery(e.target.value)}
                            onFocus={()=>setSearchActive(true)}
                            onBlur={()=>setTimeout(()=>setSearchActive(false),200)}
                        />
                        <button className="navbar-search-btn" onClick={()=>setSearchActive(s=>!s)} aria-label="Toggle search">
                            <img src={assets.search_icon} alt="Search" />
                        </button>
                    </div>
                    
                    <Link to='/cart' className="navbar-cart-btn" onClick={(e) => {
                        if (!token) {
                            e.preventDefault();
                            setShowLogin(true);
                        }
                        }}>
                        <img src={assets.basket_icon} alt="Cart" />
                        {getTotalCartAmount() > 0 && (
                            <span className="navbar-cart-badge">
                                {Object.values(cartItems).reduce((a, b) => a + b, 0)}
                            </span>
                        )}
                    </Link>

                    { !token ? (
                        <button className='navbar-signin-btn' onClick={()=>setShowLogin(true)}>
                            <span>Sign In</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 1L15 8L8 15M15 8H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    ) : (
                        <div className='navbar-profile'>
                            <img src={assets.profile_icon} alt="Profile" className='navbar-profile-img' />
                            <ul className='nav-profile-dropdown'>
                                <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt=""/><p>Orders</p></li>
                                <hr />
                                <li onClick={()=>{ setToken(""); localStorage.removeItem('token'); navigate('/'); }}><img src={assets.logout_icon} alt=""/><p>Logout</p></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar