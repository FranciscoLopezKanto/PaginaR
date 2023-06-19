const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const bodyParser = require('body-parser');

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Habilitar CORS
app.use(cors());

// Configuración de la base de datos
const pool = new Pool({
  connectionString: 'postgres://usuario:contraseña@host:puerto/nombre_basedatos',
});

// Iniciar el servidor en el puerto 3001
app.listen(3001, () => {
  console.log('Servidor backend iniciado en el puerto 3001');
});
