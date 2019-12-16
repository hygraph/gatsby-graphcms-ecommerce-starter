import 'isomorphic-fetch';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { CartProvider } from 'react-use-cart';
import { GraphQLClient, ClientContext } from 'graphql-hooks';
import { ToastContainer } from 'react-toastify';

import StripeProvider from './src/components/StripeProvider';
import Layout from './src/components/Layout';
import {
  handleItemAdded,
  handleItemUpdated,
  handleItemRemoved,
} from './src/utils/cart-helpers';

const toastOptions = {
  position: 'top-center',
  draggable: false,
  toastClassName: 'bg-primary text-white text-center p-2 shadow-none',
  progressClassName: 'h-0',
  closeButton: false,
  autoClose: 2000,
};

const client = new GraphQLClient({
  url: '/.netlify/functions/graphql',
});

const randomCartId = () =>
  Math.random()
    .toString(36)
    .substring(7);

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

export const wrapRootElement = ({ element }) => {
  return (
    <StripeProvider>
      <ClientContext.Provider value={client}>
        <CartProvider
          id={randomCartId()}
          onItemAdd={handleItemAdded}
          onItemUpdate={handleItemUpdated}
          onItemRemove={handleItemRemoved}
        >
          {element}
        </CartProvider>
        <ToastContainer {...toastOptions} />
      </ClientContext.Provider>
    </StripeProvider>
  );
};
