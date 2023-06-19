import { NextApiRequest, NextApiResponse } from "next";
import pool from '@/lib/dbConfig';


// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        
        const query = 'SELECT fecha FROM reservas WHERE fecha >= CURRENT_DATE';
        const response = await pool.query(query);
        
        return res.json(response.rows);
      } catch (error: any) {
        console.log("me estoy ejecutando");
        return res.status(400).json({ message: error.message,hola:"bassaaaanooo" });
      }

    default:
      return res.status(400).json({ message: "Method are not supported" });
  }
}
// Ruta para obtener las fechas bloqueadas


/*
app.get('/api/blocked-dates', (req, res) => {
    // Obtener las fechas bloqueadas de la base de datos
    pool.query('SELECT fecha FROM reservas WHERE fecha >= CURRENT_DATE', (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al obtener las fechas bloqueadas' });
      }
  
      try {
        // Formatear las fechas bloqueadas como 'YYYY-MM-DD'
        const blockedDates = result.rows.map((row) => row.fecha.toISOString().split('T')[0]);
  
        // Enviar las fechas bloqueadas como respuesta
        res.json(blockedDates);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al formatear las fechas bloqueadas' });
      }
    });
  });
*/
