const checkoutResolver = async (_, args, { dataSources }) => {
  try {
    const gcmsOrder = await dataSources.GraphCMSAPI.createOrder(args);

    return gcmsOrder;
  } catch (err) {
    return err;
  }
};

module.exports = checkoutResolver;
