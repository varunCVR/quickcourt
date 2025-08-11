import { Router } from 'express';
import { getFacilities, createFacility, approveFacility } from '../controllers/facility.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', getFacilities);

// Only OWNER can create facilities
router.post('/', authenticate, authorize('OWNER'), createFacility);

// Only ADMIN can approve
router.put('/:id/approve', authenticate, authorize('ADMIN'), approveFacility);

export default router;
