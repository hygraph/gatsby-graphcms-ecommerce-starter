require('dotenv').config();

const { ApolloServer } = require('apollo-server-lambda');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const dataSources = require('./datasources');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: () => ({
    stripe,
  }),
});

exports.handler = server.createHandler();
