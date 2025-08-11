import prisma from '../utils/prisma.js';
import { Request, Response } from 'express';

export const createBooking = async (req: Request & { user?: any }, res: Response) => {
  const { courtId, startTime, endTime } = req.body;

  try {
    const conflict = await prisma.booking.findFirst({
      where: {
        courtId,
        OR: [
          { startTime: { lte: new Date(endTime) }, endTime: { gte: new Date(startTime) } }
        ]
      }
    });
    if (conflict) return res.status(400).json({ error: 'Court already booked in this time slot' });

    const booking = await prisma.booking.create({
      data: {
        userId: req.user.userId,
        courtId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        status: 'CONFIRMED'
      }
    });

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

export const getMyBookings = async (req: Request & { user?: any }, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.userId },
      include: { court: true }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};
