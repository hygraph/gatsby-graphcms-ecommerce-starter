import React from 'react';

import SEO from '../components/SEO';
import Checkout from '../components/Checkout';

function CheckoutPage() {
  return (
    <React.Fragment>
      <SEO pageTitle="Checkout" />
      <div className="md:flex -mx-6">
        <div className="md:w-3/4 px-6">
          <div className="mb-6">
            <h1 className="font-bold text-6xl mb-3 text-primary">Checkout</h1>

            <hr className="border-b border-gainsboro w-10" />
          </div>

          <Checkout />
        </div>

        <div className="md:w-1/4 px-6"></div>
      </div>
    </React.Fragment>
  );
}

export default CheckoutPage;
