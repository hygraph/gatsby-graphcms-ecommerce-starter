// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async event => {
  try {
    const { amount, currency } = JSON.parse(event.body);

    const client_secret = 'abc';
    // const { client_secret } = await stripe.paymentIntents.create({
    //   amount,
    //   currency,
    // });

    return {
      statusCode: 200,
      body: JSON.stringify({ client_secret }),
    };
  } catch (err) {
    console.log(err);

    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};
