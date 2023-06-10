"use client"
import React, { useState } from 'react';
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
  const [date, setDate] = useState('');

  const handleReservationConfirm = () => {
    // Validar los campos de entrada antes de enviar la solicitud
    if (!service || numberOfPeople <= 0 || !date) {
      alert('Por favor, complete todos los campos de la reserva');
      return;
    }

    // Crear el objeto de reserva
    const reservation = {
      service,
      numberOfPeople,
      date,
      
    };
    console.log('esta sirviendo el reservation');
    // Enviar la reserva al backend
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
          // Restablecer los campos de entrada después de la confirmación
          setService('');
          setNumberOfPeople(0);
          setDate('');
        } else {
          throw new Error('Error al crear la reserva');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Error al crear la reserva');
      });
      console.log("entre al fetch");
  };

  // Lista de opciones de servicio
  const serviceOptions = ['Tour astronómico', 'Paseo en caballo', 'Nadar en el Puclaro', 'Ir a las cascadas'];

  // Obtener la fecha de mañana
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().split('T')[0];

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h1 style={headingStyle}>Reservas Elki Magic</h1>

        <select
          style={inputStyle}
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="">Seleccione un servicio</option>
          {serviceOptions.map((option) => (
            <option value={option} key={option}>{option}</option>
          ))}
        </select>

        <input
          type="number"
          style={inputStyle}
          placeholder="Número de Personas"
          min="0"
          step="1"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(Number(e.target.value))}
        />
        <input
          type="date"
          style={inputStyle}
          placeholder="Fecha"
          min={tomorrowDate}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={handleReservationConfirm}>Confirmar</button>
      </div>
    </div>
  );
}

export default App;
