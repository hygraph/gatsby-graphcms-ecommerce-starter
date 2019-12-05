import React from 'react';

import Cart from '../components/Cart';

function CartPage() {
  return (
    <React.Fragment>
      <div className="mb-6">
        <h1 className="font-bold text-6xl mb-3 text-primary">Cart</h1>

        <hr className="border-b border-gainsboro w-10" />
      </div>

      <Cart />
    </React.Fragment>
  );
}

export default CartPage;
