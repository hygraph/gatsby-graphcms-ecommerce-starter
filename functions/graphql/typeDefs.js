const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
  type Query {
    order(id: ID!): Order
  }

  type Mutation {
    checkout(name: String!, email: String!, total: Int!): Order
  }

  type Order {
    id: ID!
    name: String!
    email: String
    total: Int!
  }
`;

module.exports = typeDefs;
