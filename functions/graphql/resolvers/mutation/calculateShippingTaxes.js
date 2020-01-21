const calculateShippingTaxesResolver = async (
  _,
  { input },
  { dataSources }
) => {
  try {
    const {
      country: country_code,
      state: state_code,
      ...rest
    } = input.shippingAddress;

    const {
      currency: shippingCurrency,
      rate: shippingRate,
    } = await dataSources.PrintfulAPI.calculateShipping({
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

    return { shippingCurrency, shippingRate };
  } catch (err) {
    return err;
  }
};

module.exports = calculateShippingTaxesResolver;
