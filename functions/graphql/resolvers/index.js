const order = require('./query/order');
const checkout = require('./mutation/checkout');

const resolvers = {
  Query: {
    order,
  },
  Mutation: {
    checkout,
  },
};

module.exports = resolvers;
