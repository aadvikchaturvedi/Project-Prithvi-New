import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signup } from '../utils/auth'
import './Auth.css'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    const result = signup(name, email, password)
    if (result.success) {
      navigate('/')
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="auth-page" data-testid="signup-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-card card">
            <h1 className="auth-title">Join Prithvi Hai Hamara</h1>
            <p className="auth-subtitle">Start your sustainability journey today</p>

            {error && (
              <div className="error-message" data-testid="error-message">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form" data-testid="signup-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  data-testid="signup-name-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  data-testid="signup-email-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  data-testid="signup-password-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  data-testid="signup-confirm-password-input"
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary auth-submit"
                data-testid="signup-submit-button"
              >
                Sign Up
              </button>
            </form>

            <p className="auth-switch">
              Already have an account?{' '}
              <Link to="/login" data-testid="login-link">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
