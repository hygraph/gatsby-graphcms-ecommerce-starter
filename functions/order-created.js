require('dotenv').config();

const { ServerClient: PostmarkClient } = require('postmark');

const postmark = new PostmarkClient(process.env.POSTMARK_API_KEY);

exports.handler = async event => {
  const {
    data: {
      DRAFT: { id, email: to, name },
    },
  } = JSON.parse(event.body);

  try {
    await postmark.sendEmailBatchWithTemplates([
      {
        from: process.env.POSTMARK_STORE_OWNER_EMAIL,
        to: process.env.POSTMARK_STORE_OWNER_EMAIL,
        TemplateId: process.env.POSTMARK_STORE_OWNER_NEW_ORDER_TEMPLATE_ID,
        TemplateModel: {
          id,
          name,
        },
      },
      {
        from: process.env.POSTMARK_STORE_OWNER_EMAIL,
        to,
        TemplateId: process.env.POSTMARK_NEW_ORDER_TEMPLATE_ID,
        TemplateModel: {
          id,
          name,
        },
      },
    ]);

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
