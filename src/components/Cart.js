import React from 'react';
import { useCart } from 'react-use-cart';

import CartItemList from './CartItemList';

function Cart() {
  const { isEmpty, cartTotal } = useCart();
  const formattedSubTotal = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(cartTotal / 100);

  if (isEmpty) return <p>Your cart is empty</p>;

  return (
    <React.Fragment>
      <CartItemList />

      <div className="mt-3 md:mt-6 py-3 md:py-6 border-t border-gainsboro">
        <div className="flex items-center justify-between">
          <span className="text-slategray">Sub total</span>
          <span className="text-xl font-bold text-primary">
            {formattedSubTotal}
          </span>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Cart;
