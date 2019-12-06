require('dotenv').config();

require('es6-promise').polyfill();
require('isomorphic-fetch');

const BUILD_HOOK = process.env.BUILD_HOOK;
const BUILD_STAGE_TRIGGER = process.env.STAGE_TRIGGER;

const BUILD_TRIGGERS = [
  'createProduct',
  'updateProduct',
  'deleteProduct',
  'createCategory',
  'updateCategory',
  'deleteCategory',
  'createCollection',
  'updateCollection',
  'deleteCollection',
];

exports.handler = async event => {
  if (!event.body)
    return {
      statusCode: 405,
      message: 'You must provide a payload.',
    };

  const {
    stageName,
    info: { fieldName },
  } = JSON.parse(event.body);

  if (!req.body)
    return {
      statusCode: 422,
      body: JSON.stringify({
        message: 'No action required.',
      }),
    };

  try {
    if (
      stageName === BUILD_STAGE_TRIGGER &&
      BUILD_TRIGGERS.includes(fieldName)
    ) {
      await fetch(BUILD_HOOK, {
        method: 'post',
      });

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Build successfully triggered.',
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'No build required.',
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
