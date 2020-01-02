import React from 'react';
import { Link } from 'gatsby';
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

      <div className="mt-3 md:mt-6 py-3 md:py-6 border-t-2 border-gainsboro">
        <div className="flex flex-col items-end">
          <div className="flex flex-col items-end mb-3">
            <span className="text-slategray">Sub total</span>
            <span className="text-xl font-bold text-primary">
              {formattedSubTotal}
            </span>
          </div>

          <Link
            to="/checkout"
            className="bg-primary hover:bg-slategray px-4 py-3 rounded-lg text-white text-sm font-bold tracking-widest uppercase focus:outline-none"
          >
            Checkout
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Cart;
