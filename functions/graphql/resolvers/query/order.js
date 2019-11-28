const orderResolver = async (_, { id }, ctx) => {
  try {
    // placeholder
    const order = await ctx.dataSources.GraphCMSAPI.getOrder(id);

    return order;
  } catch (e) {
    return err;
  }
};

module.exports = orderResolver;
