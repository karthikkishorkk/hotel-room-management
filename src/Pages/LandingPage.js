import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Highlight from '../Components/Highlight';
import RoomsSection from '../Components/RoomsSection';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="hero-section">
        <div className="overlay">
          <h1>Find Your <span>Stay</span> Anywhere in the World</h1>
          <p>Discover your perfect getaway from thousands of handpicked hotels.</p>
        </div>
      </div>
      <Highlight />
      <RoomsSection />
      <Footer />
    </>
  );
};

export default LandingPage;
