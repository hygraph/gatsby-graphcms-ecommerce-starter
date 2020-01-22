const estimateOrderCosts = async (_, { input }, { dataSources }) => {
  try {
    const {
      country: country_code,
      state: state_code,
      ...rest
    } = input.shippingAddress;

    const {
      costs: { currency, shipping: shippingRate, tax: taxRate, vat: vatRate },
    } = await dataSources.PrintfulAPI.estimateOrderCosts({
      recipient: {
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

    return { currency, shippingRate, taxRate, vatRate };
  } catch (err) {
    return err;
  }
};

module.exports = estimateOrderCosts;
