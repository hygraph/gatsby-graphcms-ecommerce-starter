const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
  type Query {
    order(id: ID!): Order
  }

  type Mutation {
    checkout(input: CheckoutInput!): Order
    createPaymentIntent(input: PaymentIntentInput!): PaymentIntent
    submitReview(input: SubmitReviewInput!): Review
  }

  type Order {
    graphCMSOrderId: ID!
    printfulOrderId: ID!
  }

  type PaymentIntent {
    id: ID!
    clientSecret: String!
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
    email: String!
    headline: String!
    rating: Int!
    message: String
    productId: ID!
  }

  input CheckoutInput {
    name: String!
    email: String!
    phone: String
    total: Int!
    items: [CheckoutItemInput!]!
    shippingAddress: CheckoutAddressInput!
    billingAddress: CheckoutAddressInput!
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
    state: String
    zip: String!
  }

  input PaymentIntentInput {
    email: String!
    metadata: PaymentIntentMeta!
    total: Int!
  }

  input PaymentIntentMeta {
    graphCMSOrderId: ID!
    printfulOrderId: ID!
  }
`;

module.exports = typeDefs;
