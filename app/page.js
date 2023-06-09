"use client"
import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './globals.css';

function App() {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const boxStyle = {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  };

  const inputStyle = {
    margin: '10px',
    padding: '5px',
    fontSize: '16px',
  };

  const headingStyle = {
    fontSize: '24px',
    marginBottom: '20px',
  };

  // Estado para guardar los valores de los campos de entrada
  const [service, setService] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [date, setDate] = useState(null);

  const handleReservationConfirm = () => {
    const reservationData = {
      service,
      numberOfPeople,
      date: date.toISOString().split('T')[0],
    };

    axios
      .post('http://tu-backend.com/reservas', reservationData)
      .then((response) => {
        console.log('Reserva guardada en el backend:', response.data);
        // Realizar acciones adicionales después de guardar la reserva
      })
      .catch((error) => {
        console.error('Error al guardar la reserva:', error);
      });
  };

  // Obtener la fecha de mañana
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().split('T')[0];

  // Fechas deshabilitadas
  const disabledDates = ['2023-06-18', '2023-06-24'];

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h1 style={headingStyle}>Reservas Elki Magic</h1>

        <input
          type="text"
          style={inputStyle}
          placeholder="Servicio"
          value={service}
          onChange={(e) => setService(e.target.value)}
        />
        <input
          type="number"
          style={inputStyle}
          placeholder="Número de Personas"
          min="0"
          step="1"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(Number(e.target.value))}
        />
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          minDate={tomorrow}
          filterDate={(date) => {
            const dateString = date.toISOString().split('T')[0];
            return !disabledDates.includes(dateString);
          }}
          placeholderText="Fecha"
          style={inputStyle}
        />

        <button onClick={handleReservationConfirm}>Confirmar</button>
      </div>
    </div>
  );
}

export default App;
