import prisma from '../utils/prisma.js';
import { Request, Response } from 'express';

export const getAllCourts = async (req: Request, res: Response) => {
  try {
    const courts = await prisma.court.findMany({
      include: { facility: true }
    });
    res.json(courts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courts' });
  }
};

export const createCourt = async (req: Request & { user?: any }, res: Response) => {
  const { name, sportType, pricePerHour, facilityId } = req.body;

  try {
    const court = await prisma.court.create({
      data: { name, sportType, pricePerHour, facilityId }
    });
    res.json(court);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create court' });
  }
};
