import { Router } from 'express';
import { getAllCourts, createCourt } from '../controllers/court.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', getAllCourts);
router.post('/', authMiddleware, createCourt);

export default router;
