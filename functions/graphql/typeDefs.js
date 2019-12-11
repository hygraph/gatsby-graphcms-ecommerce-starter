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
    submitReview(input: SubmitReviewInput!): Review
  }

  type Order {
    id: ID!
    name: String!
    email: String
    total: Int!
  }

  type Review {
    id: ID!
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
`;

module.exports = typeDefs;
