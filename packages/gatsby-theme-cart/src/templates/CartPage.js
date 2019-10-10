import React, { useContext } from 'react';

import CartContext from '../context/CartContext';

function CartPage() {
  const { items } = useContext(CartContext);

  return (
    <React.Fragment>
      <h1>Cart</h1>

      {items.map((item, i) => (
        <li key={i}>{item.name}</li>
      ))}
    </React.Fragment>
  );
}

export default CartPage;
