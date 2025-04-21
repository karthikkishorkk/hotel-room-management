import React, { useState } from 'react';
import '../styles/RoomsSection.css';
import duplexRoom from '../assets/duplexRoom.jpeg';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const RoomsSection = () => {
  const rooms = [
    {
      type: 'Standard',
      price: '$60',
      img: duplexRoom,
      description: 'A cozy room with all the essentials for a comfortable stay.',
    },
    {
      type: 'Classic',
      price: '$70',
      img: duplexRoom,
      description: 'Classic style and comfort with a touch of elegance.',
    },
    {
      type: 'DUPLEX ROOM',
      price: '$80',
      img: duplexRoom,
      description: 'A spacious duplex with separate living and sleeping areas.',
    },
    {
      type: 'Double Room',
      price: '$90',
      img: duplexRoom,
      description: 'Perfect for couples or friends, featuring twin or double beds.',
    },
    {
      type: 'Queens Suite',
      price: '$110',
      img: duplexRoom,
      description: 'Luxurious suite fit for royalty with premium amenities.',
    },
    {
      type: 'Presidential Suite',
      price: '$150',
      img: duplexRoom,
      description: 'Experience top-tier luxury in our grandest suite.',
    },
    {
      type: 'Penthouse',
      price: '$200',
      img: duplexRoom,
      description: 'Panoramic views and ultimate privacy at the top floor.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleRooms = rooms.slice(currentIndex, currentIndex + 3);

  const handleNext = () => {
    if (currentIndex + 3 < rooms.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="rooms-section">
      <h2>Where Rest Turns Into a Memory</h2>
      <p className="section-subtext">
        The most memorable moments start with the perfect place to unwind.
      </p>

      <div className="rooms-slider-container">
        <button className="arrow-button" onClick={handlePrev} disabled={currentIndex === 0}>
          <ArrowBack />
        </button>

        <div className="room-cards">
          {visibleRooms.map((room, i) => (
            <div className="room-card" key={i}>
              <img src={room.img} alt={room.type} />
              <h3>{room.type}</h3>
              <p>{room.description}</p>
              <p><strong>Starting from {room.price}/night</strong></p>
              <button>Book Now</button>
            </div>
          ))}
        </div>

        <button
          className="arrow-button"
          onClick={handleNext}
          disabled={currentIndex + 3 >= rooms.length}
        >
          <ArrowForward />
        </button>
      </div>
    </div>
  );
};

export default RoomsSection;
