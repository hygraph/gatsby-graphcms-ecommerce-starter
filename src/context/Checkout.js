import React, { createContext, useReducer } from 'react';

const CheckoutContext = createContext();

function reducer(state, { payload, type }) {
  switch (type) {
    case 'CHECKOUT_PROCESSING':
      return {
        ...state,
        processing: true,
        error: null,
      };
    case 'CHECKOUT_ERROR':
      return { ...state, processing: false, error: payload.message };
    case 'CHECKOUT_SUCCESS':
      return {
        ...state,
        processing: false,
        error: null,
        success: true,
      };
    default:
      throw new Error('Invalid action');
  }
}

function CheckoutProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    processing: false,
    error: null,
    success: false,
  });

  const checkoutError = payload => {
    dispatch({ type: 'CHECKOUT_ERROR', payload });
  };

  const checkoutProcessing = () => {
    dispatch({ type: 'CHECKOUT_PROCESSING' });
  };

  const checkoutSuccess = () => {
    dispatch({ type: 'CHECKOUT_SUCCESS' });
  };

  return (
    <CheckoutContext.Provider
      value={{ ...state, checkoutError, checkoutProcessing, checkoutSuccess }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export { CheckoutProvider, CheckoutContext as default };
