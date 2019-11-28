import 'isomorphic-fetch';

import React from 'react';
import { CartProvider } from 'react-use-cart';
import { GraphQLClient, ClientContext } from 'graphql-hooks';

import Layout from './src/components/Layout';

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
    <ClientContext.Provider value={client}>
      <CartProvider id={randomCartId()}>{element}</CartProvider>
    </ClientContext.Provider>
  );
};
