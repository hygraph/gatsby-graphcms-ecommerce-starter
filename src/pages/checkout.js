import React from 'react';
import { Elements } from 'react-stripe-elements';

import CheckoutForm from '../components/CheckoutForm';

function CheckoutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Elements>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default CheckoutPage;
