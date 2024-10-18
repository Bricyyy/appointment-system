import { Request, Response } from 'express';
import { getAppointments as getAppointmentsModel, createAppointment as createAppointmentModel } from '../models/Appointment';

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await getAppointmentsModel();
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).send('Server Error');
  }
};

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const newAppointment = await createAppointmentModel(req.body);
    res.json(newAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).send('Server Error');
  }
};