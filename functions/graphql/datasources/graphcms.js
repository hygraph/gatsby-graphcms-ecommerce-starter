const { gql } = require('apollo-server-lambda');
const { GraphQLDataSource } = require('apollo-datasource-graphql');

const mutation = gql`
  mutation createOrder($name: String!, $email: String!, $total: Int!) {
    createOrder(data: { name: $name, email: $email, total: $total }) {
      id
      name
      email
      total
    }
  }
`;

class GraphCMSAPI extends GraphQLDataSource {
  constructor() {
    super();
    this.baseURL = process.env.GRAPHCMS_ENDPOINT;
  }

  willSendRequest(request) {
    request.headers.set(
      'Authorization',
      `Bearer ${process.env.GRAPHCMS_LAMBDA_TOKEN}`
    );
  }

  async createOrder(variables) {
    try {
      const response = await this.mutation(mutation, { variables });

      return response.data.createOrder;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = GraphCMSAPI;
