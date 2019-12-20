import React, { useEffect } from 'react';
import { useCart } from 'react-use-cart';
import { navigate } from 'gatsby';
import { Elements } from 'react-stripe-elements';

import CheckoutForm from '../components/CheckoutForm';

function Checkout() {
  const { isEmpty } = useCart();

  useEffect(() => {
    if (isEmpty) {
      const navigateTimer = setTimeout(() => {
        navigate(`/cart`);
      }, 3000);

      return () => clearTimeout(navigateTimer);
    }
  }, [isEmpty]);

  if (isEmpty) return <p>Your cart is empty</p>;

  return (
    <Elements>
      <CheckoutForm />
    </Elements>
  );
}

export default Checkout;
