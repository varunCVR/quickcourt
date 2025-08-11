import prisma from '../utils/prisma.js';
import { Request, Response } from 'express';

// Create court
export const createCourt = async (req: Request, res: Response) => {
  try {
    const { facilityId, name, sportType, pricePerHour, currency, operatingHours } = req.body;

    const court = await prisma.court.create({
      data: {
        facilityId,
        name,
        sportType,
        pricePerHour,
        currency: currency || 'INR',
        operatingHours
      }
    });

    res.status(201).json(court);
  } catch (error) {
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
    res.status(500).json({ error: 'Failed to fetch courts' });
  }
};
