import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../utils/auth'
import './Auth.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    const result = login(email, password)
    if (result.success) {
      navigate('/')
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="auth-page" data-testid="login-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-card card">
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Login to continue recycling and earning</p>

            {error && (
              <div className="error-message" data-testid="error-message">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form" data-testid="login-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  data-testid="login-email-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  data-testid="login-password-input"
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary auth-submit"
                data-testid="login-submit-button"
              >
                Login
              </button>
            </form>

            <p className="auth-switch">
              Don't have an account?{' '}
              <Link to="/signup" data-testid="signup-link">Sign up here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
