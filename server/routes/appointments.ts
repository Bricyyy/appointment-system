import { Router } from 'express';
import { getAppointments, createAppointment } from '../controllers/appointmentsController';

const router = Router();

// Route for getting appointments
router.get('/', getAppointments);

// Route for creating a new appointment
router.post('/', createAppointment);

export default router;