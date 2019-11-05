const { GraphQLClient } = require('graphql-request');

const graphcms = new GraphQLClient('my-endpoint', {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_LAMBDA_TOKEN}`,
  },
});

const mutation = `
  mutation createOrder($total: Int!, $paid: Boolean) {
    createOrder(data: {
      status: PUBLISHED,
      total: $total,
      paid: $paid
    }) {
      id
    }
  }
`;

exports.handler = async event => {
  try {
    // const {data} = JSON.parse(event.body)

    const variables = {
      total: 1000,
      paid: true,
    };

    const data = await graphcms.request(mutation, variables);

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
