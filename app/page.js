"use client"
import React, { useState, useEffect } from 'react';
import './app.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

  const [service, setService] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [date, setDate] = useState(null);
  const [blockedDates, setBlockedDates] = useState([]);

  useEffect(() => {
    // Obtener las fechas bloqueadas desde el backend
    fetch('http://localhost:3001/api/blocked-dates')
      .then((response) => response.json())
      .then((data) => setBlockedDates(data))
      .catch((error) => console.error(error));
  }, []);

  const handleReservationConfirm = () => {
    if (!service || numberOfPeople <= 0 || !date) {
      alert('Por favor, complete todos los campos de la reserva');
      return;
    }

    if (blockedDates.includes(date.toISOString().split('T')[0])) {
      alert('Fecha no disponible, selecciona otra');
      return;
    }

    const reservation = {
      service,
      numberOfPeople,
      date: date.toISOString().split('T')[0],
    };

    fetch('http://localhost:3001/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservation),
    })
      .then((response) => {
        if (response.ok) {
          alert('Reserva creada exitosamente');
          setService('');
          setNumberOfPeople(0);
          setDate(null);
        } else {
          throw new Error('Error al crear la reserva');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Error al crear la reserva');
      });
  };

  const serviceOptions = ['Tour astronómico', 'Paseo en caballo', 'Nadar en el Puclaro', 'Ir a las cascadas'];

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h1 style={headingStyle}>Reservas Elki Magic</h1>

        <div className="form-group">
          <label htmlFor="service">Servicio</label>
          <select
            id="service"
            style={inputStyle}
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value="">Seleccione un servicio</option>
            {serviceOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="numberOfPeople">Cantidad de personas</label>
          <input
            id="numberOfPeople"
            type="number"
            style={inputStyle}
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Fecha</label>
          <DatePicker
            id="date"
            selected={date}
            onChange={(date) => setDate(date)}
            minDate={new Date()}
            filterDate={(date) => {
              const currentDate = new Date();
              currentDate.setHours(0, 0, 0, 0);
              return date >= currentDate && !blockedDates.includes(date.toISOString().split('T')[0]);
            }}
            disabledKeyboardNavigation
            dateFormat="dd/MM/yyyy"
            placeholderText="Seleccione una fecha"
            className="datepicker"
          />
        </div>

        <button onClick={handleReservationConfirm}>Confirmar</button>
      </div>
    </div>
  );
}

export default App;
