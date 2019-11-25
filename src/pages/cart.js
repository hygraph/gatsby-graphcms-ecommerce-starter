import React from 'react';
import { useCart } from 'react-use-cart';

import CartItemList from '../components/CartItemList';

function Cart() {
  const { isEmpty, cartTotal } = useCart();

  if (isEmpty) return <p>Your cart is empty</p>;

  return (
    <React.Fragment>
      <CartItemList />

      <div>Sub total: {cartTotal}</div>
    </React.Fragment>
  );
}

export default Cart;
