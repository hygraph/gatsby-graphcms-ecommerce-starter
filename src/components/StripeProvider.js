import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function StripeProvider({ children }) {
  const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);

  return <Elements stripe={stripePromise}>{children}</Elements>;
}

export default StripeProvider;
