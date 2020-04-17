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
  mutation createOrder(
    $name: String!
    $email: String!
    $phone: String
    $total: Int!
    $items: [OrderItemCreateInput!]!
    $billingAddress: AddressCreateInput!
    $shippingAddress: AddressCreateInput!
  ) {
    createOrder(
      data: {
        name: $name
        email: $email
        phone: $phone
        total: $total
        billingAddress: { create: $billingAddress }
        shippingAddress: { create: $shippingAddress }
        orderItems: { create: $items }
      }
    ) {
      id
      name
      email
      total
    }
  }
`;

const submitReviewMutation = gql`
  mutation submitReview(
    $name: String!
    $email: String!
    $headline: String!
    $rating: Int!
    $message: String!
    $productId: ID!
  ) {
    createReview(
      data: {
        name: $name
        email: $email
        headline: $headline
        rating: $rating
        message: $message
        product: { connect: { id: $productId } }
      }
    ) {
      id
      name
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

  async submitReview(variables) {
    try {
      const { data } = await this.mutation(submitReviewMutation, { variables });

      return data.createReview;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = GraphCMSAPI;
