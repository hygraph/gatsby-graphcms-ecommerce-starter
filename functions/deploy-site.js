require('dotenv').config();

require('es6-promise').polyfill();
require('isomorphic-fetch');

const BUILD_HOOK = process.env.BUILD_HOOK;

exports.handler = async () => {
  console.log(process.env.BUILD_HOOK);
  try {
    await fetch(BUILD_HOOK, {
      method: 'post',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Build successfully triggered.',
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
