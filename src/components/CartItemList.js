import React from 'react';
import { useCart } from 'react-use-cart';

import CartItem from './CartItem';

function CartItemList() {
  const { items } = useCart();

  return <div className="py-3">{items.map(CartItem)}</div>;
}

export default CartItemList;
