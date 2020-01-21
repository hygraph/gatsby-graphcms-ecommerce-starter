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
        allowPayment: false,
        processing: false,
        error: null,
        success: true,
      };
    case 'CHECKOUT_PAYMENT':
      return {
        ...state,
        allowPayment: true,
        processing: false,
        error: null,
      };
    default:
      throw new Error('Invalid action');
  }
}

function CheckoutProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    allowPayment: false,
    processing: false,
    error: null,
    success: false,
  });

  const checkoutError = payload => {
    dispatch({ type: 'CHECKOUT_ERROR', payload });
  };

  const checkoutPayment = () => {
    dispatch({ type: 'CHECKOUT_PAYMENT' });
  };

  const checkoutProcessing = () => {
    dispatch({ type: 'CHECKOUT_PROCESSING' });
  };

  const checkoutSuccess = () => {
    dispatch({ type: 'CHECKOUT_SUCCESS' });
  };

  return (
    <CheckoutContext.Provider
      value={{
        ...state,
        checkoutError,
        checkoutPayment,
        checkoutProcessing,
        checkoutSuccess,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export { CheckoutProvider, CheckoutContext as default };
