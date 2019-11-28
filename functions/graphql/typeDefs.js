const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
  type Query {
    order(id: ID!): Order
  }

  type Mutation {
    checkout(name: String!, email: String!, total: Int!): Order
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
`;

module.exports = typeDefs;
