const checkoutResolver = async (_, args, { dataSources }) => {
  try {
    const { id: graphCMSOrderId } = await dataSources.GraphCMSAPI.createOrder(
      args
    );

    const {
      country: country_code,
      state: state_code,
      ...rest
    } = args.shippingAddress;

    const { id: printfulOrderId } = await dataSources.PrintfulAPI.createOrder({
      external_id: graphCMSOrderId,
      recipient: {
        email: args.email,
        country_code,
        state_code,
        ...rest,
      },
      items: args.items.map(({ quantity, variantId: external_variant_id }) => ({
        external_variant_id,
        quantity,
      })),
    });

    return { graphCMSOrderId, printfulOrderId };
  } catch (err) {
    return err;
  }
};

module.exports = checkoutResolver;
