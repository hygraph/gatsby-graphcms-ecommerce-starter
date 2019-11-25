import React from 'react';
import { CartProvider } from 'react-use-cart';

import Layout from './src/components/Layout';

const randomCartId = () =>
  Math.random()
    .toString(36)
    .substring(7);

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

export const wrapRootElement = ({ element }) => {
  return <CartProvider id={randomCartId()}>{element}</CartProvider>;
};
