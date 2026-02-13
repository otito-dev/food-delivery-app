import React, { useState } from 'react'
import './AdminLogin.css'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AdminLogin = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const url = "http://localhost:4000"

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(`${url}/api/user/login`, {
        email,
        password
      })

      if (response.data.success) {
        const token = response.data.token
        
        // Verify this is an admin account
        const verifyResponse = await axios.post(`${url}/api/user/verify-admin`, {}, {
          headers: { token }
        })

        if (verifyResponse.data.success && verifyResponse.data.isAdmin) {
          // Store token
          localStorage.setItem('adminToken', token)
          setToken(token)
          toast.success('Welcome Admin!')
        } else {
          toast.error('Access Denied: Admin privileges required')
          setLoading(false)
        }
      } else {
        toast.error(response.data.message)
        setLoading(false)
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Login failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className='admin-login'>
      <ToastContainer />
      <div className='admin-login-container'>
        <div className='admin-login-header'>
          <div className='admin-logo'>🍅</div>
          <h1>Tomato Admin</h1>
          <p>Please sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} className='admin-login-form'>
          <div className='form-group'>
            <label>Email Address</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='admin@tomato.com'
              required
              disabled={loading}
            />
          </div>

          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              required
              disabled={loading}
            />
          </div>

          <button type='submit' disabled={loading} className='login-btn'>
            {loading ? (
              <span className='loading-spinner'>
                <span className='spinner'></span> Logging in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className='admin-login-footer'>
          <p>🔒 Authorized Personnel Only</p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin