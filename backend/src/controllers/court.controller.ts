import { Request, Response } from 'express';
import { prisma } from '../index.js';

// Create a new court
export const createCourt = async (req: Request, res: Response) => {
    try {
        const { facilityId, name, sportType, pricePerHour, currency, operatingHours } = req.body;

        const newCourt = await prisma.court.create({
            data: {
                facilityId,
                name,
                sportType,
                pricePerHour,
                currency,
                operatingHours
            }
        });

        res.status(201).json(newCourt);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create court' });
    }
};

// Get all courts
export const getCourts = async (req: Request, res: Response) => {
    try {
        const courts = await prisma.court.findMany({
            include: { facility: true }
        });
        res.json(courts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch courts' });
    }
};
