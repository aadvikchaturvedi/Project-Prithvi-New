import React, { useState } from 'react'
import './SchedulePickup.css'

const RATE_PER_KG = 15

const SchedulePickup = () => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    pincode: '',
    pickupDate: '',
    timeSlot: '',
    plasticType: '',
    estimatedWeight: ''
  })
  const [earnings, setEarnings] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const RATE_PER_KG = 15

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (name === 'estimatedWeight') {
      const weight = parseFloat(value) || 0
      setEarnings(weight * RATE_PER_KG)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        address: '',
        city: '',
        pincode: '',
        pickupDate: '',
        timeSlot: '',
        plasticType: '',
        estimatedWeight: ''
      })
      setEarnings(0)
    }, 5000)
  }

  if (submitted) {
    return (
      <div className="schedule-page" data-testid="schedule-pickup-page">
        <div className="container">
          <div className="success-message" data-testid="success-message">
            <div className="success-icon">✓</div>
            <h2>Pickup Scheduled Successfully!</h2>
            <p>Our volunteers will collect the plastic within 24 hours.</p>
            <p className="earnings-highlight">
              Estimated Earnings: <strong>₹{earnings.toFixed(2)}</strong>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="schedule-page" data-testid="schedule-pickup-page">
      <div className="container">
        <div className="schedule-header">
          <h1 className="page-title">Schedule Plastic Pickup</h1>
          <p className="page-subtitle">
            Fill in the details below and our volunteers will collect your plastic waste
          </p>
        </div>

        <div className="schedule-content">
          <form onSubmit={handleSubmit} className="pickup-form card" data-testid="pickup-form">
            <div className="form-group">
              <label htmlFor="address">Full Address *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your complete address"
                rows="3"
                required
                data-testid="address-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g., New Delhi"
                  required
                  data-testid="city-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="pincode">Pincode *</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="e.g., 110001"
                  pattern="[0-9]{6}"
                  required
                  data-testid="pincode-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="pickupDate">Preferred Pickup Date *</label>
                <input
                  type="date"
                  id="pickupDate"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  data-testid="pickup-date-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="timeSlot">Time Slot *</label>
                <select
                  id="timeSlot"
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                  required
                  data-testid="time-slot-select"
                >
                  <option value="">Select time slot</option>
                  <option value="8-12">8 AM - 12 PM</option>
                  <option value="12-16">12 PM - 4 PM</option>
                  <option value="16-20">4 PM - 8 PM</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="plasticType">Plastic Type (Optional)</label>
                <select
                  id="plasticType"
                  name="plasticType"
                  value={formData.plasticType}
                  onChange={handleChange}
                  data-testid="plastic-type-select"
                >
                  <option value="">Select type</option>
                  <option value="pet">PET Bottles</option>
                  <option value="hdpe">HDPE (Containers)</option>
                  <option value="ldpe">LDPE (Bags)</option>
                  <option value="pp">PP (Packaging)</option>
                  <option value="mixed">Mixed Plastic</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="estimatedWeight">Estimated Weight (kg) *</label>
                <input
                  type="number"
                  id="estimatedWeight"
                  name="estimatedWeight"
                  value={formData.estimatedWeight}
                  onChange={handleChange}
                  placeholder="e.g., 5"
                  min="0.5"
                  step="0.5"
                  required
                  data-testid="weight-input"
                />
              </div>
            </div>

            {earnings > 0 && (
              <div className="earnings-preview" data-testid="earnings-preview">
                <p>Estimated Earnings: <strong>₹{earnings.toFixed(2)}</strong></p>
                <small>Rate: ₹{RATE_PER_KG}/kg</small>
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary submit-btn"
              data-testid="submit-pickup-button"
            >
              Schedule Pickup
            </button>
          </form>

          <div className="info-card card">
            <h3>How It Works</h3>
            <ul className="info-list">
              <li>📝 Fill in your address and pickup details</li>
              <li>📅 Choose your preferred date and time</li>
              <li>⚖️ Estimate the weight of plastic waste</li>
              <li>👥 Our volunteers will collect within 24 hours</li>
              <li>💰 Earn ₹{RATE_PER_KG} per kg of plastic recycled</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchedulePickup
