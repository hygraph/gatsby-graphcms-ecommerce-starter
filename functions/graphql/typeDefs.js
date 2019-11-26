const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
  type Query {
    hello: String
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
