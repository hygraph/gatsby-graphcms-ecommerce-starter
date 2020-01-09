import React from 'react';

import SEO from '../components/SEO';

function SuccessPage({
  location: {
    state: { orderId },
  },
}) {
  return (
    <React.Fragment>
      <SEO pageTitle="Thank you for your order" />
      <div className="mb-6">
        <h1 className="font-bold text-6xl mb-3 text-primary">Thank you!</h1>

        <hr className="border-b border-gainsboro w-10" />
      </div>

      <p>
        Please take note of your order reference for your records:{' '}
        <span className="font-semibold text-lightgray">{orderId}</span>
      </p>
    </React.Fragment>
  );
}

export default SuccessPage;
