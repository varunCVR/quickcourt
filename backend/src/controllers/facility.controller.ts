import { Request, Response } from 'express';
import { prisma } from '../index.js';

// Create a new facility
export const createFacility = async (req: Request, res: Response) => {
    try {
        const { ownerId, name, description, addressLine1, city, state, postalCode, country, shortLocation, sports, amenities, photos } = req.body;

        const newFacility = await prisma.facility.create({
            data: {
                ownerId,
                name,
                description,
                addressLine1,
                city,
                state,
                postalCode,
                country,
                shortLocation,
                sports,
                amenities,
                photos
            }
        });

        res.status(201).json(newFacility);
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
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch facilities' });
    }
};

// Get facility by ID
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
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch facility' });
    }
};
