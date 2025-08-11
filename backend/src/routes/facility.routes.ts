import { Router } from 'express';
import { createFacility, getFacilities, getFacilityById } from '../controllers/facility.controller.js';

const router = Router();

router.post('/', createFacility);
router.get('/', getFacilities);
router.get('/:id', getFacilityById);

export default router;
