require('dotenv').config();

const { ServerClient: PostmarkClient } = require('postmark');

const postmark = new PostmarkClient(process.env.POSTMARK_API_KEY);

exports.handler = async event => {
  const {
    data: {
      PUBLISHED: { id, email: to, fulfilled, name },
    },
  } = JSON.parse(event.body);

  if (!fulfilled)
    return {
      statusCode: 422,
      body: JSON.stringify({
        message: 'No action required.',
      }),
    };

  try {
    await postmark.sendEmailWithTemplate({
      from: process.env.POSTMARK_STORE_OWNER_EMAIL,
      to,
      TemplateId: process.env.POSTMARK_ORDER_DISPATCHED_TEMPLATE_ID,
      TemplateModel: {
        id,
        name,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Email(s) sent successfully.',
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
