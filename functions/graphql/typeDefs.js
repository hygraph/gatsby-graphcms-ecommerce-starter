const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
  type Query {
    order(id: ID!): Order
  }

  type Mutation {
    checkout(
      name: String!
      email: String!
      phone: String
      total: Int!
      items: [CheckoutItemInput!]!
      shippingAddress: CheckoutAddressInput!
      billingAddress: CheckoutAddressInput!
    ): Order
    createPaymentIntent(input: PaymentInput!): PaymentIntent
    submitReview(input: SubmitReviewInput!): Review
  }

  type Order {
    graphCMSOrderId: ID!
    printfulOrderId: ID!
  }

  type PaymentIntent {
    id: ID!
    secretKey: String!
    status: PaymentIntentStatus!
  }

  type Review {
    id: ID!
  }

  enum PaymentIntentStatus {
    CANCELLED
    PROCESSING
    REQUIRES_ACTION
    REQUIRES_CAPTURE
    REQUIRES_CONFIRMATION
    REQUIRES_PAYMENT_METHOD
    SUCCEEDED
  }

  input SubmitReviewInput {
    name: String!
    headline: String!
    rating: Int!
    message: String
    productId: ID!
  }

  input CheckoutItemInput {
    name: String!
    variantId: ID!
    price: Int!
    quantity: Int = 1
  }

  input CheckoutAddressInput {
    address1: String!
    address2: String
    city: String!
    country: String!
    name: String!
    state: String!
    zip: String!
  }

  input PaymentInput {
    email: String!
    metadata: PaymentIntentMeta!
    total: Int!
  }

  input PaymentIntentMeta {
    graphCmsOrder: ID!
    printfulOrder: ID!
  }
`;

module.exports = typeDefs;
