const express = require('express');
const app = express();
const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  password: '1234',
  host: 'localhost',
  port: 5432,
  database: 'kanto',
});
let reservas;
const getReservas = async () => {
  try {
    const client = await pool.connect();
    console.log('Conexión exitosa a la base de datos');
    const result = await client.query('SELECT * FROM reservas');
    reservas = result.rows;
    client.release();
    console.table(reservas);
  } catch (error) {
    console.error('Error al obtener las reservas', error);
  }
};

app.get('/reservas', async (req, res) => {
  try {
    if (!reservas) {
      await getReservas();
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(reservas, null, 2));
  } catch (error) {
    console.error('Error al obtener las reservas', error);
    res.status(500).json({ error: 'Error al obtener las reservas' });
  }
});

const port = 3001; // Cambia el número de puerto aquí si lo deseas

app.listen(port, () => {
  console.log(`Servidor backend escuchando en el puerto ${port}`);
});
