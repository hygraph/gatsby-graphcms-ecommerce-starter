import React, { useEffect } from 'react';
import { navigate } from 'gatsby';

import SEO from '../components/SEO';

function SuccessPage({ location }) {
  const showSuccessScreen = location.state && location.state.orderId;

  useEffect(() => {
    if (!showSuccessScreen) {
      const navigateTimer = setTimeout(() => {
        navigate(`/`);
      }, 3000);

      return () => clearTimeout(navigateTimer);
    }
  }, [showSuccessScreen]);

  if (!showSuccessScreen)
    return (
      <React.Fragment>
        <div className="mb-6">
          <h1 className="font-bold text-3xl md:text-6xl mb-3 text-primary">
            Oops!
          </h1>

          <hr className="border-b border-gainsboro w-10" />
        </div>
        <p>You've no business being on this page!</p>
      </React.Fragment>
    );

  return (
    <React.Fragment>
      <SEO pageTitle="Thank you for your order" />
      <div className="mb-6">
        <h1 className="font-bold text-3xl md:text-6xl mb-3 text-primary">
          Thank you!
        </h1>

        <hr className="border-b border-gainsboro w-10" />
      </div>

      <p>
        Please take note of your order reference for your records:{' '}
        <span className="font-semibold text-lightgray">
          {location.state.orderId}
        </span>
      </p>
    </React.Fragment>
  );
}

export default SuccessPage;
