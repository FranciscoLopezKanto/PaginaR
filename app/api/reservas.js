
/*
const pool = new Pool({
  user: 'postgres',
  password: '1234',
  host: 'localhost',
  port: 5432,
  database: 'kanto',
*/
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Ruta para recibir las solicitudes POST de reserva
app.post('/reservas', (req, res) => {
  const reserva = req.body;
  // Aquí puedes procesar y guardar los datos de reserva en tu base de datos
  // por ejemplo, utilizando un ORM como Sequelize o Mongoose

  // Envía una respuesta de éxito
  res.status(200).json({ message: 'Reserva guardada exitosamente' });
});

// Puerto en el que se ejecutará el servidor
const port = 3001;
app.listen(port, () => {
  console.log(`Servidor backend escuchando en el puerto ${port}`);
});
