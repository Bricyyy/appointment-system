import pool from '../config/db.config';

export interface Appointment {
  id: number;
  title: string;
  start: Date;
  end: Date;
  patientName: string;
  appointmentType: string;
}

export async function getAppointments() {
  try {
    const result = await pool.query('SELECT * FROM appointments');
    return result.rows;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
}

export async function createAppointment(appointment: Appointment) {
  const { title, start, end, patientName, appointmentType } = appointment;
  const result = await pool.query(
    `INSERT INTO appointments (title, start, end, patientName, appointmentType) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [title, start, end, patientName, appointmentType]
  );
  return result.rows[0];
}
