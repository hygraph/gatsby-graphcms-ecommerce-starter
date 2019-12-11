import React from 'react';
import { Elements } from 'react-stripe-elements';

import CheckoutForm from '../components/CheckoutForm';

function CheckoutPage() {
  return (
    <div className="md:flex -mx-3">
      <div className="md:w-2/3 px-3">
        <Elements>
          <CheckoutForm />
        </Elements>
      </div>

      <div className="md:w-1/3 px-3">Cart summary</div>
    </div>
  );
}

export default CheckoutPage;
