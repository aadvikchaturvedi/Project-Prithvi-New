import React, { useState, useEffect } from 'react'
import { carouselSlides, features, blogPosts } from '../data/content'
import './Home.css'

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)
  }

  return (
    <div className="home-page">

      {/* ================= HERO / CAROUSEL ================= */}
      <section className="hero-section">
        <div className="carousel">
          {carouselSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            >
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="carousel-bg"
              />

              {/* Dark Overlay */}
              <div className="carousel-overlay"></div>

              {/* Text on Image */}
              <div className="slide-content">
                
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-subtitle">{slide.subtitle}</p>
                <p className="slide-description">{slide.description}</p>
              </div>
            </div>
          ))}

          <button className="carousel-btn prev" onClick={prevSlide}>‹</button>
          <button className="carousel-btn next" onClick={nextSlide}>›</button>

          <div className="carousel-indicators">
            {carouselSlides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="section features-section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Making plastic recycling simple, rewarding, and impactful
          </p>

          <div className="features-grid">
            {features.map((feature) => (
              <div key={feature.id} className="feature-card card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= AWARENESS / BLOG ================= */}
      <section className="section awareness-section">
        <div className="container">
          <h2 className="section-title">Awareness & Impact</h2>
          <p className="section-subtitle">
            Learn about plastic pollution and how you can make a difference
          </p>

          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.id} className="blog-card card">
                <div className="blog-image">
  <img 
    src={post.image} 
    alt={post.title} 
    className="blog-img"
  />
</div>
                <div className="blog-content">
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <span className="blog-date">{post.date}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Make a Difference?</h2>
            <p className="cta-text">
              Join thousands of Indians who are recycling plastic and earning rewards
            </p>
            <a href="/schedule-pickup" className="btn btn-primary">
              Schedule Your First Pickup
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
