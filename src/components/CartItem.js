import React from 'react';
import { useCart } from 'react-use-cart';

function CartItem({ id, name, description, quantity, price }) {
  const { updateItemQuantity, removeItem } = useCart();

  const increment = () => updateItemQuantity(id, quantity + 1);
  const decrement = () => updateItemQuantity(id, quantity - 1);
  const remove = () => removeItem(id);

  return (
    <div key={id}>
      <div>
        <h4>{name}</h4>
        <p>{description}</p>
      </div>

      <div>
        <button onClick={decrement}>-</button>

        <span>{quantity}</span>

        <button onClick={increment}>+</button>
      </div>

      <div>
        <p>Total: {price * quantity}</p>
        <p>Unit: {price}</p>
      </div>

      <div>
        <button onClick={remove}>Remove item</button>
      </div>
    </div>
  );
}

export default CartItem;
