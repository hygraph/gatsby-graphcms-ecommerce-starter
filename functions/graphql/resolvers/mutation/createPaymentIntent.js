const createPaymentIntentResolver = async (
  _,
  { input: { description, email, metadata, total } },
  { stripe }
) => {
  try {
    const {
      id,
      client_secret: clientSecret,
      status,
    } = await stripe.paymentIntents.create({
      amount: total,
      currency: 'eur',
      description,
      metadata,
      receipt_email: email,
    });

    return {
      id,
      clientSecret,
      status,
    };
  } catch (err) {
    return err;
  }
};

module.exports = createPaymentIntentResolver;
