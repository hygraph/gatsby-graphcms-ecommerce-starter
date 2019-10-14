import React, { useContext } from 'react';

import CartContext from '../context/CartContext';

function Cart() {
  const { items } = useContext(CartContext);

  return (
    <div>
      <h1>Cart</h1>

      {items.map((item, i) => (
        <li key={i}>{item.name}</li>
      ))}
    </div>
  );
}

export default Cart;
