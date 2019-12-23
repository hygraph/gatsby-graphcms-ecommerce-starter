import React from 'react';
import { useCart } from 'react-use-cart';
import Img from 'gatsby-image';

function CartItem({ id, name, quantity, price, image }) {
  const { updateItemQuantity, removeItem } = useCart();

  const increment = () => updateItemQuantity(id, quantity + 1);
  const decrement = () => updateItemQuantity(id, quantity - 1);
  const remove = () => removeItem(id);

  const total = quantity * price;

  const formattedUnitPrice = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price / 100);

  const formattedLineTotal = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(total / 100);

  return (
    <div
      key={id}
      className="md:bg-gainsboro md:rounded flex items-center py-3 md:py-6 md:px-3 md:px-6 md:mb-3"
    >
      <div className="w-2/3 flex flex-grow items-center">
        <div className="relative">
          <Img
            className="h-16 md:h-20 w-16 md:w-20"
            fluid={image.childImageSharp.fluid}
            alt={name}
            title={name}
          />
          <button
            className="w-5 h-5 bg-slategray hover:bg-primary text-white text-xs flex items-center justify-center absolute top-0 right-0 -mt-1 -mr-1 rounded"
            onClick={remove}
          >
            <svg
              className="fill-current w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center">
          <button
            className="text-slategray hover:text-primary focus:outline-none p-1"
            onClick={increment}
          >
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z" />
            </svg>
          </button>

          <span className="mx-3 md:mx-6 p-1">{quantity}</span>

          <button
            className="text-slategray hover:text-primary focus:outline-none p-1"
            onClick={decrement}
          >
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </button>
        </div>

        <div>
          <h4 className="text-slategray font-medium">{name}</h4>
        </div>
      </div>

      <div className="text-right">
        <p className="font-medium text-slategray">{formattedLineTotal}</p>
        {quantity > 1 && (
          <p className="text-lightgray text-sm">{formattedUnitPrice} each</p>
        )}
      </div>
    </div>
  );
}

export default CartItem;
