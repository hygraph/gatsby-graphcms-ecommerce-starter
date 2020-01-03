import React from 'react';
import { useCart } from 'react-use-cart';

import CheckoutItem from './CheckoutItem';

function CheckoutItemList() {
  const { items, cartTotal } = useCart();

  const formattedSubTotal = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(cartTotal / 100);

  return (
    <div className="rounded bg-white border-2 border-gainsboro p-3 md:p-6 my-3 md:my-6">
      {items.map(CheckoutItem)}
      <div className="flex items-center justify-between">
        <span className="text-slategray">Sub total</span>
        <span className="text-xl font-bold text-primary">
          {formattedSubTotal}
        </span>
      </div>
    </div>
  );
}

export default CheckoutItemList;
