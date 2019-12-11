const checkoutResolver = async (_, args, { dataSources }) => {
  try {
    const gcmsOrder = await dataSources.GraphCMSAPI.createOrder(args);

    const {
      country: country_code,
      state: state_code,
      ...rest
    } = args.shippingAddress;

    await dataSources.PrintfulAPI.createOrder({
      external_id: gcmsOrder.id,
      recipient: {
        country_code,
        state_code,
        ...rest,
      },
      items: args.items.map(({ quantity, variantId: external_variant_id }) => ({
        external_variant_id,
        quantity,
      })),
    });

    return gcmsOrder;
  } catch (err) {
    return err;
  }
};

module.exports = checkoutResolver;
