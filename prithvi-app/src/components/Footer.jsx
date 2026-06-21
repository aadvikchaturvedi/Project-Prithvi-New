import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer" data-testid="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">पृथ्वी</h3>
            <p className="footer-description">
              A community-driven platform dedicated to making plastic recycling accessible, 
              rewarding, and impactful for every Indian household.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/about">About Us</a></li>
              <li><a href="/schedule-pickup">Schedule Pickup</a></li>
              <li><a href="/shop">Shop</a></li>
              <li><a href="/profile">Dashboard</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-contact">
              <li>📧 sgoswami6420@gmail.com</li>
              <li>📱 +91 8800948828</li>
              <li>📍 New Delhi, India</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Follow Us</h4>
            <div className="social-links">
              <a href="#" aria-label="Facebook" data-testid="social-facebook">Facebook</a>
              <a href="#" aria-label="Twitter" data-testid="social-twitter">Twitter</a>
              <a href="#" aria-label="Instagram" data-testid="social-instagram">Instagram</a>
              <a href="#" aria-label="LinkedIn" data-testid="social-linkedin">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 पृथ्वी  (Prithvi Hai Hamari). All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
