const checkoutResolver = async (_, args, ctx) => {
  try {
    // placeholder
    const order = await ctx.dataSources.GraphCMSAPI.createOrder(args);

    return order;
  } catch (err) {
    return err;
  }
};

module.exports = checkoutResolver;
