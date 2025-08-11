import prisma from '../utils/prisma.js';
import { Request, Response } from 'express';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { userId, courtId, startTime, endTime, totalAmount, currency } = req.body;

    const booking = await prisma.booking.create({
      data: {
        userId,
        courtId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        totalAmount: totalAmount.toString(),
        currency: currency || 'INR'
      }
    });

    res.status(201).json({
      ...booking,
      totalAmount: booking.totalAmount.toNumber()
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

export const getMyBookings = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        court: {
          include: { facility: true }
        }
      },
      orderBy: { startTime: 'desc' }
    });

    const formatted = bookings.map(b => ({
      ...b,
      totalAmount: b.totalAmount.toNumber()
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};
