import prisma from '../utils/prisma.js';
import { Request, Response } from 'express';

// Create facility
export const createFacility = async (req: Request, res: Response) => {
  try {
    const { ownerId, name, description, addressLine1, city, state, postalCode, country, sports, amenities } = req.body;

    const facility = await prisma.facility.create({
      data: {
        ownerId,
        name,
        description,
        addressLine1,
        city,
        state,
        postalCode,
        country,
        sports,
        amenities
      }
    });

    res.status(201).json(facility);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create facility' });
  }
};

// Get all facilities
export const getFacilities = async (req: Request, res: Response) => {
  try {
    const facilities = await prisma.facility.findMany({
      include: { courts: true }
    });

    res.json(facilities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch facilities' });
  }
};

// Get single facility
export const getFacilityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const facility = await prisma.facility.findUnique({
      where: { id },
      include: { courts: true }
    });

    if (!facility) {
      return res.status(404).json({ error: 'Facility not found' });
    }

    res.json(facility);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch facility' });
  }
};
