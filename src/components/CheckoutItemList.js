import React, { useContext } from 'react';
import { useCart } from 'react-use-cart';

import CheckoutItem from './CheckoutItem';
import CheckoutContext from '../context/Checkout';

function CheckoutItemList() {
  const { items, cartTotal } = useCart();
  const { orderTotal, shipping, tax } = useContext(CheckoutContext);

  const formatValue = value =>
    new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(value / 100);

  return (
    <div className="rounded bg-white border-2 border-gainsboro p-3 md:p-6 my-3 md:my-6">
      {items.map(CheckoutItem)}
      <div className="flex items-center justify-between">
        <span className="text-sm text-slategray">Sub total</span>
        <span className="font-semibold">{formatValue(cartTotal)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-slategray">Tax</span>
        <span className="font-semibold">{tax ? formatValue(tax) : '-'}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-slategray">Shipping</span>
        <span className="font-semibold">
          {shipping ? formatValue(shipping) : '-'}
        </span>
      </div>
      <hr className="border-b border-gainsboro my-3 w-20" />
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-slategray">Total</span>
        <span className="text-xl font-bold text-primary">
          {formatValue(orderTotal)}
        </span>
      </div>
    </div>
  );
}

export default CheckoutItemList;
