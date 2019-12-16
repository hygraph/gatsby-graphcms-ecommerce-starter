const checkoutResolver = async (_, { input }, { dataSources }) => {
  try {
    const { id: graphCMSOrderId } = await dataSources.GraphCMSAPI.createOrder(
      input
    );

    const {
      country: country_code,
      state: state_code,
      ...rest
    } = input.shippingAddress;

    const { id: printfulOrderId } = await dataSources.PrintfulAPI.createOrder({
      external_id: graphCMSOrderId,
      recipient: {
        email: input.email,
        country_code,
        state_code,
        ...rest,
      },
      items: input.items.map(
        ({ quantity, variantId: external_variant_id }) => ({
          external_variant_id,
          quantity,
        })
      ),
    });

    return { graphCMSOrderId, printfulOrderId };
  } catch (err) {
    return err;
  }
};

module.exports = checkoutResolver;
