"use client"

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setLoading(false);
      setMessage("Card details are required.");
      return;
    }

    // Call API to create payment intent
    const res = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, name, email }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || "Payment failed.");
      setLoading(false);
      return;
    }

    // Confirm card payment
    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name,
          email,
        },
      },
    });

    if (result.error) {
      setMessage(result.error.message || "Payment failed.");
    } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
      setMessage("✅ Payment successful! Thank you.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-2 text-center">Payment</h2>
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-blue-800 text-center">
        <div className="font-semibold">SkyTravel Booking Payment</div>
        <div className="text-sm">Please enter your details and payment amount.</div>
      </div>
      <label className="block mb-1 font-medium">Name</label>
      <input
        type="text"
        className="w-full p-2 border mb-3 rounded"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        placeholder="Your Name"
      />
      <label className="block mb-1 font-medium">Email</label>
      <input
        type="email"
        className="w-full p-2 border mb-3 rounded"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        placeholder="you@email.com"
      />
      <label className="block mb-1 font-medium">Amount (USD)</label>
      <input
        type="number"
        min="1"
        className="w-full p-2 border mb-3 rounded"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
        placeholder="Amount in USD"
      />
      <label className="block mb-1 font-medium">Card Details</label>
      <div className="p-2 border mb-4 rounded bg-gray-50">
        <CardElement options={{ hidePostalCode: true }} />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold disabled:opacity-50 transition"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : `Pay $${amount || ""}`}
      </button>
      {message && <div className={`mt-4 text-center ${message.includes("success") ? "text-green-600" : "text-red-500"}`}>{message}</div>}
    </form>
  );
}

export default function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
} 