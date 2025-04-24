import React, { useState } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import './RoomCalendarPage.css';

const RoomCalendarPage = () => {
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const roomOptions = [
    'Standard',
    'Classic',
    'Duplex Room',
    'Double Room',
    'Queens Suite',
    'Presidential Suite',
    'Penthouse',
  ];

  return (
    <div className="room-calendar-container">
      <Typography className="room-calendar-title">
        Room Booking Calendar
      </Typography>

      <FormControl fullWidth className="room-select">
        <InputLabel id="room-select-label">Select Room</InputLabel>
        <Select
          labelId="room-select-label"
          value={selectedRoom}
          label="Select Room"
          onChange={(e) => setSelectedRoom(e.target.value)}
        >
          {roomOptions.map((room, index) => (
            <MenuItem key={index} value={room}>
              {room}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
        />
      </LocalizationProvider>
    </div>
  );
};

export default RoomCalendarPage;
