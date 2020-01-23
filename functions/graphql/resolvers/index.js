const order = require('./query/order');

const estimateOrderCosts = require('./mutation/estimateOrderCosts');
const checkout = require('./mutation/checkout');
const createPaymentIntent = require('./mutation/createPaymentIntent');
const submitReview = require('./mutation/submitReview');

const resolvers = {
  Query: {
    order,
  },
  Mutation: {
    checkout,
    createPaymentIntent,
    estimateOrderCosts,
    submitReview,
  },
  PaymentIntentStatus: {
    CANCELLED: 'cancelled',
    PROCESSING: 'processing',
    REQUIRES_ACTION: 'requires_action',
    REQUIRES_CAPTURE: 'requires_capture',
    REQUIRES_CONFIRMATION: 'requires_confirmation',
    REQUIRES_PAYMENT_METHOD: 'requires_payment_method',
    REQUIRES_SOURCE: 'requires_source',
    SUCCEEDED: 'succeeded',
  },
};

module.exports = resolvers;
