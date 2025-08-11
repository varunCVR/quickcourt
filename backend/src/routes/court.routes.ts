import { Router } from 'express';
import { createCourt, getCourts } from '../controllers/court.controller.js';

const router = Router();

router.post('/', createCourt);
router.get('/', getCourts);

export default router;
