import { Request, Response } from 'express';
import { stripe } from '../config/stripe.js';
import { prisma } from '../index.js';

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.body;

    // Fetch booking details
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { court: true }
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: booking.currency.toLowerCase(),
            product_data: {
              name: booking.court.name,
              description: `${booking.court.sportType} booking`
            },
            unit_amount: Number(booking.totalAmount) * 100, // amount in cents
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:3000/payment-success?bookingId=${booking.id}`,
      cancel_url: `http://localhost:3000/payment-failed?bookingId=${booking.id}`,
      metadata: { bookingId: booking.id }
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Payment session creation failed' });
  }
};
