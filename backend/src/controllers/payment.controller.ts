import { Request, Response } from 'express';
import { stripe } from '../config/stripe.js';
import { prisma } from '../index.js';

export const createCheckoutSession = async (req: Request, res: Response) => {
    try {
      const { bookingId } = req.body || {};
      if (!bookingId) {
        return res.status(400).json({ message: 'bookingId is required in request body' });
      }
  
      const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
      if (!booking) throw new Error('Booking not found');
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: booking.currency,
              product_data: { name: `Court Booking` },
              unit_amount: Number(booking.totalAmount) * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
      });
  
      res.json({ url: session.url });
    } catch (error: any) {
      console.error('Stripe error:', error);
      res.status(500).json({ message: 'Payment session creation failed', error: error.message });
    }
  };
  
