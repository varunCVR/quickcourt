import express from 'express';
import cors from 'cors';
import courtRoutes from './routes/court.routes';
import bookingRoutes from './routes/booking.routes';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/courts', courtRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);

export default app;
