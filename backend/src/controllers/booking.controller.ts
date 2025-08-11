import { Request, Response } from 'express';
import { prisma } from '../index.js';

// Create a booking
export const createBooking = async (req: Request, res: Response) => {
    try {
        const { userId, courtId, startTime, endTime, totalAmount, currency } = req.body;

        // 1. Check for overlapping bookings
        const conflict = await prisma.booking.findFirst({
            where: {
                courtId,
                AND: [
                    { startTime: { lt: new Date(endTime) } },
                    { endTime: { gt: new Date(startTime) } }
                ],
                status: { in: ['CONFIRMED', 'PENDING'] }
            }
        });

        if (conflict) {
            return res.status(400).json({ error: 'This court is already booked for the selected time.' });
        }

        // 2. Create booking
        const booking = await prisma.booking.create({
            data: {
                userId,
                courtId,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                totalAmount,
                currency
            }
        });

        res.status(201).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create booking' });
    }
};

// Get bookings for a user
export const getMyBookings = async (req: Request, res: Response) => {
    try {
        const { userId } = req.query;

        const bookings = await prisma.booking.findMany({
            where: { userId: String(userId) },
            include: { court: true }
        });

        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
};

// Cancel a booking
export const cancelBooking = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: { status: 'CANCELLED' }
        });

        res.json(updatedBooking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to cancel booking' });
    }
};
