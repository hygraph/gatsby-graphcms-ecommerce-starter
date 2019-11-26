const { ApolloServer } = require('apollo-server-lambda');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const dataSources = require('./datasources');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
});

exports.handler = server.createHandler();
