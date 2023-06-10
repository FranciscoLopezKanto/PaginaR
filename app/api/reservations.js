const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Array para almacenar las reservas
const reservations = [];

// Ruta para recibir las solicitudes POST de reservas
app.post('/api/reservations', (req, res) => {
  const { service, numberOfPeople, date } = req.body;

  // Validación básica de los datos de entrada
  if (!service || numberOfPeople <= 0 || !date) {
    return res.status(400).json({ error: 'Datos de reserva inválidos' });
  }

  // Crear una nueva reserva
  const newReservation = {
    service,
    numberOfPeople,
    date,
    timestamp: new Date(),
  };

  // Guardar la reserva en el array
  reservations.push(newReservation);

  // Enviar una respuesta exitosa
  res.status(201).json({ message: 'Reserva creada exitosamente' });
});

// Ruta para obtener todas las reservas guardadas
app.get('/api/reservations', (req, res) => {
  res.json(reservations);
});

// Iniciar el servidor en el puerto 3000
app.listen(3001, () => {
  console.log('Servidor backend iniciado en el puerto 3001');
});
