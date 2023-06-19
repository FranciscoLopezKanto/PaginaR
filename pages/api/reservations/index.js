
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
      date: new Date(date), // Asegurar que la fecha sea un objeto de tipo Date válido
    };
  
    // Verificar si la fecha es válida antes de formatearla
    if (isNaN(newReservation.date)) {
      // Manejar el caso de fecha inválida
      return res.status(400).json({ error: 'Fecha de reserva inválida' });
    }
  
    // Formatear la fecha como 'YYYY-MM-DD'
    newReservation.date = newReservation.date.toISOString().split('T')[0];
  
    // Guardar la reserva en la base de datos
    pool.query(
      'INSERT INTO reservas (tipo_servicio, cant_personas, fecha) VALUES ($1, $2, $3)',
      [newReservation.service, newReservation.numberOfPeople, newReservation.date],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error al guardar la reserva' });
        }
  
        // Enviar una respuesta exitosa
        res.status(201).json({ message: 'Reserva creada exitosamente' });
      }
    );
  });
  
  // Ruta para obtener todas las reservas guardadas
  app.get('/api/reservations', (req, res) => {
    // Obtener todas las reservas de la base de datos
    pool.query('SELECT * FROM reservas', (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al obtener las reservas' });
      }
  
      try {
        // Formatear las fechas de las reservas existentes
        const formattedReservations = result.rows.map((row) => ({
          service: row.tipo_servicio,
          numberOfPeople: row.cant_personas,
          date: row.fecha instanceof Date ? row.fecha.toISOString().split('T')[0] : null,
          timestamp: row.timestamp,
        }));
  
        // Enviar las reservas formateadas como respuesta
        res.json(formattedReservations);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al formatear las fechas de las reservas' });
      }
    });
  });
  