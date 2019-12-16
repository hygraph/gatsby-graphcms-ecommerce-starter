require('dotenv').config();

require('es6-promise').polyfill();
require('isomorphic-fetch');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async event => {
  try {
    const {
      data: { object: paymentIntent },
    } = stripe.webhooks.constructEvent(
      event.body,
      event.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    );

    const {
      metadata: { printfulOrderId },
    } = paymentIntent;

    await fetch(`https://api.printful.com/orders/${printfulOrderId}/confirm`, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.PRINTFUL_API_KEY
        ).toString('base64')}`,
      },
      method: 'post',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Order successfully confirmed',
      }),
    };
  } catch (err) {
    console.log(err);

    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};
