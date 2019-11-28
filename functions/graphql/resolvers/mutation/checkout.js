const checkoutResolver = async (_, args, ctx) => {
  try {
    // placeholder
    const order = await ctx.dataSources.GraphCMSAPI.createOrder(args);

    return order;
  } catch (e) {
    return err;
  }
};

module.exports = checkoutResolver;
