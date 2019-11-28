const order = require('./query/order');

const checkout = require('./mutation/checkout');
const submitReview = require('./mutation/submitReview');

const resolvers = {
  Query: {
    order,
  },
  Mutation: {
    checkout,
    submitReview,
  },
};

module.exports = resolvers;
