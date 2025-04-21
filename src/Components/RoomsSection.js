import React from 'react';
import '../styles/RoomsSection.css';
import duplexRoom from '../assets/duplexRoom.jpeg';

const RoomsSection = () => {
  const rooms = [
    { type: 'DUPLEX ROOM', price: '$80', img: duplexRoom },
    { type: 'Classic', price: '$70', img: duplexRoom },
    { type: 'Double Room', price: '$90', img: duplexRoom },
  ];

  return (
    <div className="rooms-section">
      <h2>Where Rest Turns Into a Memory</h2>
      <div className="room-cards">
        {rooms.map((room, i) => (
          <div className="room-card" key={i}>
            <img src={room.img} alt={room.type} />
            <h3>{room.type}</h3>
            <p>The most memorable moments start with the perfect place to unwind.</p>
            <p><strong>Starting from {room.price}/night</strong></p>
            <button>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsSection;
