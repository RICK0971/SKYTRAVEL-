import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import connectDB from '@/lib/mongodb';
import Payment from '@/models/Payment';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: Request) {
  try {
    const { amount, name, email } = await req.json();
    if (!amount || isNaN(amount) || amount < 1 || !name || !email) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    // Stripe expects amount in cents
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(amount) * 100),
      currency: 'usd',
      receipt_email: email,
      metadata: { name },
    });

    // Save payment details to MongoDB
    await connectDB();
    await Payment.create({
      name,
      email,
      amount: Number(amount),
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 });
  }
} 