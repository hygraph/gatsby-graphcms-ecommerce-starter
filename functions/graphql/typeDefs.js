const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
  type Query {
    order(id: ID!): Order
  }

  type Mutation {
    checkout(name: String!, email: String!, total: Int!): Order
    submitReview(
      name: String!
      headline: String!
      rating: Int!
      message: String
      productId: ID!
    ): Review
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
`;

module.exports = typeDefs;
