import React from 'react';
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

  // Obtener la fecha de mañana
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().split('T')[0];

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h1 style={headingStyle}>Reservas Elki Magic</h1>

        <input type="text" style={inputStyle} placeholder="Servicio" />
        <input type="number" style={inputStyle} placeholder="Número de Personas" min="0" step="1" />
        <input type="date" style={inputStyle} placeholder="Fecha" min={tomorrowDate} />

        <button>Confirmar</button>
      </div>
    </div>
  );
}

export default App;
