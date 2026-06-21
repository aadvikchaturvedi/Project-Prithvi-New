import React from 'react'
import './About.css'

const About = () => {
  return (
    <div className="about-page" data-testid="about-page">
      <section className="about-hero">
        <div className="container">
          <h1 className="hero-title">About पृथ्वी </h1>
          <p className="hero-subtitle">
            Building a sustainable future, one plastic bottle at a time
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="content-section">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-text">
             At Prithvi, We are revolutionizing the current post-consumer product trading ecosystem to create an impactful, effective & efficient collection & recycling model. We promote sustainability by providing source segregation waste pickup service. Our process is completely circular and sustainable.​

We believe,
There is no such thing as AWAY
And, that is how we started with Prithvi (formerly Plastic Revive). When each one of us were in the middle of pandemic, we were discussing how we could get rid of the plastic waste that was increasing day by day with all those PPE kits, masks and disposables.​We started with a very tiny idea of creating wonders with waste. And today we feel proud that we have diverted more than 40,000 kgs of plastic with our value based recycling technology.​Our vision is to create a society with zero waste going to landfill. And, we are progressing well towards that with our source collection services. We offer plastic waste management services as well as a great range of recycled plastic products
            </p>
            <p className="section-text">
              Through our door-to-door collection service, we make it convenient for citizens 
              to recycle plastic waste responsibly, ensuring it doesn't end up in landfills 
              or our oceans.
            </p>
          </div>

          <div className="content-section">
            <h2 className="section-title">The Problem We're Solving</h2>
            <div className="stats-grid">
              <div className="stat-card card" data-testid="stat-card-1">
                <div className="stat-number">3.4M</div>
                <div className="stat-label">Tonnes of plastic waste annually in India</div>
              </div>
              <div className="stat-card card" data-testid="stat-card-2">
                <div className="stat-number">70%</div>
                <div className="stat-label">Plastic waste not recycled properly</div>
              </div>
              <div className="stat-card card" data-testid="stat-card-3">
                <div className="stat-number">500+</div>
                <div className="stat-label">Years for plastic to decompose</div>
              </div>
            </div>
            <p className="section-text">
              India faces a massive plastic waste crisis. Most households lack proper channels 
              to recycle their plastic waste, leading to environmental degradation and health hazards.
            </p>
          </div>

          <div className="content-section">
            <h2 className="section-title">How We Help</h2>
            <div className="help-grid">
              <div className="help-item">
                <div className="help-icon">🏠</div>
                <h3 className="help-title">Doorstep Collection</h3>
                <p className="help-text">
                  Schedule pickups at your convenience. Our trained volunteers collect 
                  plastic waste directly from your home.
                </p>
              </div>
              <div className="help-item">
                <div className="help-icon">♻️</div>
                <h3 className="help-title">Professional Recycling</h3>
                <p className="help-text">
                  We ensure all collected plastic is processed through certified recycling 
                  facilities, meeting environmental standards.
                </p>
              </div>
              <div className="help-item">
                <div className="help-icon">💰</div>
                <h3 className="help-title">Earn Rewards</h3>
                <p className="help-text">
                  Get paid for recycling! Earn ₹15 per kg of plastic, making sustainability 
                  financially rewarding.
                </p>
              </div>
              <div className="help-item">
                <div className="help-icon">🌱</div>
                <h3 className="help-title">Track Impact</h3>
                <p className="help-text">
                  Monitor your contribution through your dashboard. See how much CO₂ you've 
                  helped reduce and plastic recycled.
                </p>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title">Join the Movement</h2>
            <p className="section-text">
              Together, we can create a cleaner, greener India. Join thousands of citizens 
              who are already making a difference through Prithvi Hai Hamara.
            </p>
            <div className="cta-buttons">
              <a href="/signup" className="btn btn-primary" data-testid="signup-cta">
                Sign Up Today
              </a>
              <a href="/schedule-pickup" className="btn btn-secondary" data-testid="schedule-cta">
                Schedule Pickup
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
