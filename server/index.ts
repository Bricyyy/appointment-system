import express, { Request, Response, NextFunction } from 'express';
import appointmentRoutes from './routes/appointments';
import testRoutes from './routes/test';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.config';

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

// Route handling
app.use('/api/appointments', appointmentRoutes);
app.use('/api/test', testRoutes);

// Health check route (optional)
app.get('/health', (req, res) => {
  res.status(200).send('Server is running');
});

const PORT = process.env.PORT || 5000;

pool.connect()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});