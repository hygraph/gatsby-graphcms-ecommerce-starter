import React, { createContext, useReducer } from 'react';

let CartContext;

const { Provider, Consumer } = (CartContext = createContext());

const initialState = {
  count: 0,
  items: [],
};

const ADD_ITEM = 'ADD_ITEM';

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const items = [...state.items, action.payload];

      return {
        ...state,
        items,
        count: items.length,
      };
    }

    default:
      throw new Error('No action provided');
  }
};

const CartProvider = ({ children, ...props }) => {
  const [cart, dispatch] = useReducer(reducer, initialState);
  const isEmpty = cart.count === 0;

  return (
    <Provider
      value={{
        ...cart,
        ...props,
        isEmpty,
        addItem: payload => dispatch({ type: ADD_ITEM, payload }),
      }}
    >
      {children}
    </Provider>
  );
};

export { CartContext as default, Consumer as CartConsumer, CartProvider };
