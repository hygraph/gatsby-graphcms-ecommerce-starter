import React, { useContext } from 'react';

import CartContext from '../context/CartContext';

function CartButton({ name, price }) {
  const { addItem } = useContext(CartContext);

  const handleClick = () => addItem({ name, price });

  return <button onClick={handleClick}>Add to Cart</button>;
}

export default CartButton;
