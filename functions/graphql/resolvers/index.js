const resolvers = {
  Query: {
    hello: (parent, args, context) => {
      return 'Hello, world!';
    },
  },
  Mutation: {
    checkout: async (root, args, context) => {
      const order = await context.dataSources.GraphCMSAPI.createOrder(args);

      return order;
    },
  },
};

module.exports = resolvers;
