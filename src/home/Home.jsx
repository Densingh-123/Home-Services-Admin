import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Advanced CSS file

const AdvancedHomeServices = () => {
  const navigate = useNavigate();

  const handleServiceClick = () => {
    navigate('/service'); // Navigate to the services page
  };

  return (
    <div className="advanced-home-services">
      {/* Header Section */}
      <header className="header">
        <h1 className="header-title">HOME SERVICES</h1>
        <p className="header-subtitle">Your Trusted Partner in Home Services</p>
      </header>

      {/* Main Content Section */}
      <div className="main-content">
        {/* Left Side: Pet Care Section */}
        <div className="pet-care-section">
          <img
            src="https://png.pngtree.com/png-clipart/20230823/original/pngtree-professional-cleaning-service-premises-people-picture-image_8305913.png"
            alt="Pet Care"
            className="pet-image"
          />
          <div className="pet-care-content">
            <h2 className="pet-care-title">DOGGIE WASH</h2>
            <p className="pet-care-text">We Treat Your Pet As A Family Member</p>
            <p className="pet-care-text">Qualified Personal Care For All Breeds</p>
            <p className="pet-care-text">Where Your Pet is The Star!</p>
          </div>
        </div>

        {/* Right Side: Home Services Section */}
        <div className="home-services-section">
          <h2 className="services-title">Our Home Services</h2>
          <p className="services-description">
            We provide a wide range of <span className="highlight">home services</span> to make your life easier. Our services include:
          </p>
          <div className="services-grid">
            <div className="service-card">
              <h3>Dishwashing</h3>
              <p>Sparkling clean dishes every time.</p>
            </div>
            <div className="service-card">
              <h3>Car Washing</h3>
              <p>Get your car looking brand new.</p>
            </div>
            <div className="service-card">
              <h3>Food Delivery</h3>
              <p>Delicious meals delivered to your door.</p>
            </div>
            <div className="service-card">
              <h3>Cleaning Services</h3>
              <p>A spotless home for you to enjoy.</p>
            </div>
          </div>
          <button className="service-button" onClick={handleServiceClick}>
            Explore All Services
          </button>
        </div>
      </div>

      {/* Offer Banner with Animation */}
      <div className="offer-banner">
        <span className="offer-text">🎉 Special Offer! 🎉</span>
        <span className="offer-timer">Hurry, offer ends soon!</span>
      </div>
    </div>
  );
};

export default AdvancedHomeServices;