import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Orders/Order'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminLogin from './components/AdminLogin/AdminLogin'
import axios from 'axios'

const App = () => {
  const url = "http://localhost:4000"
  const [token, setToken] = useState("")
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem('adminToken')
      
      if (savedToken) {
        try {
          // Verify token is still valid and user is admin
          const response = await axios.post(`${url}/api/user/verify-admin`, {}, {
            headers: { token: savedToken }
          })

          if (response.data.success && response.data.isAdmin) {
            setToken(savedToken)
          } else {
            // Invalid token or not admin
            localStorage.removeItem('adminToken')
          }
        } catch (error) {
          console.error('Auth check failed:', error)
          localStorage.removeItem('adminToken')
        }
      }
      
      setLoading(false)
    }

    checkAuth()
  }, [])

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#fcfcfc'
      }}>
        <div style={{
          textAlign: 'center'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '6px solid #f8f9fa',
            borderTop: '6px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ color: '#7f8c8d', fontSize: '16px' }}>Loading...</p>
        </div>
      </div>
    )
  }

  // If not logged in, show login page
  if (!token) {
    return <AdminLogin setToken={setToken} />
  }

  // If logged in, show admin panel
  return (
    <div>
      <ToastContainer/>
      <Navbar token={token} setToken={setToken} />
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add url={url} token={token} />}/>
          <Route path="/list" element={<List url={url} token={token} />}/>
          <Route path="/orders" element={<Order url={url} token={token} />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App