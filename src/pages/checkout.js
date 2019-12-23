import React from 'react';
import { Elements } from 'react-stripe-elements';

import CheckoutForm from '../components/CheckoutForm';
import SEO from '../components/SEO';

function CheckoutPage() {
  return (
    <React.Fragment>
      <SEO pageTitle="Checkout" />
      <div className="max-w-4xl mx-auto">
        <Elements>
          <CheckoutForm />
        </Elements>
      </div>
    </React.Fragment>
  );
}

export default CheckoutPage;
