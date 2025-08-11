import { Router } from 'express';
import { createCheckoutSession } from '../controllers/payment.controller.js';

const router = Router();

router.post('/checkout-session', createCheckoutSession);

export default router;
