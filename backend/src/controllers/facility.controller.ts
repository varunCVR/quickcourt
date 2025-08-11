import { Request, Response } from 'express';
import { prisma } from '../index.js';

// Get all facilities
export const getFacilities = async (req: Request, res: Response) => {
    try {
        const facilities = await prisma.facility.findMany({
            include: { courts: true, owner: true }
        });
        res.json(facilities);
    } catch (error: any) {
        console.error('Error fetching facilities:', error);
        res.status(500).json({ message: 'Failed to fetch facilities' });
    }
};

// Create a facility
export const createFacility = async (req: Request, res: Response) => {
    try {
        const {
            ownerId, name, description,
            addressLine1, city, state, postalCode, country,
            latitude, longitude, sports, amenities, photos
        } = req.body;

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
                latitude,
                longitude,
                sports,
                amenities,
                photos
            }
        });

        res.status(201).json(newFacility);
    } catch (error: any) {
        console.error('Error creating facility:', error);
        res.status(500).json({ message: 'Failed to create facility' });
    }
};

// Approve a facility (ADMIN only)
export const approveFacility = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const updatedFacility = await prisma.facility.update({
            where: { id },
            data: { approved: true }
        });

        res.json(updatedFacility);
    } catch (error: any) {
        console.error('Error approving facility:', error);
        res.status(500).json({ message: 'Failed to approve facility' });
    }
};
