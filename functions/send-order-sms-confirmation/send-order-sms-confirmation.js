const twilio = require('twilio');

const twilioClient = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.handler = async event => {
  try {
    const data = JSON.parse(event.body);

    // if order is fulfilled

    // const body = await twilioClient.messages.create({
    //   to,
    //   from: process.env.TWILIO_FROM_NUMBER,
    //   body: `Your order is on the way!`,
    // });

    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
    };
  } catch (err) {
    console.log(err);

    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};
