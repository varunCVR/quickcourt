import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_demo_key'
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo_key'

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-06-20'
})

export const getStripe = () => {
  return loadStripe(stripePublishableKey)
}