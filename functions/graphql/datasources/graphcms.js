const { gql } = require('apollo-server-lambda');
const { GraphQLDataSource } = require('apollo-datasource-graphql');

const getOrderQuery = gql`
  query getOrderById($id: ID!) {
    order(where: { id: $id }) {
      id
      name
      email
      total
    }
  }
`;

const createOrderMutation = gql`
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
    if (!request.headers) {
      request.headers = {};
    }

    request.headers.authorization = `Bearer ${process.env.GRAPHCMS_OPEN_TOKEN}`;
  }

  async getOrder(id) {
    try {
      const { data } = await this.query(getOrderQuery, {
        variables: { id },
      });

      return data.order;
    } catch (err) {
      console.log(err);
    }
  }

  async createOrder(variables) {
    try {
      const { data } = await this.mutation(createOrderMutation, { variables });

      return data.createOrder;
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = GraphCMSAPI;
