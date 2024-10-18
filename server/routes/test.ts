// routes/test.ts
import { Router, Request, Response } from 'express';
import { getAppointments } from '../models/Appointment'; // Import your existing function

const router = Router();

router.get('/test-db', async (req: Request, res: Response) => {
  try {
    // Test the database connection by fetching appointments
    const appointments = await getAppointments();
    res.json({ message: 'Database connection is working!', appointments });
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Unable to connect to the database or retrieve data.' });
  }
});

export default router;
