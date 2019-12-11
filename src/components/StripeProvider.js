import React, { useEffect, useState } from 'react';
import { StripeProvider as Stripe } from 'react-stripe-elements';

function StripeProvider({ children }) {
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY));
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        setStripe(window.Stripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY));
      });
    }
  }, []);

  return <Stripe stripe={stripe}>{children}</Stripe>;
}

export default StripeProvider;
