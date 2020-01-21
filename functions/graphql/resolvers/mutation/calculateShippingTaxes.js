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

    const {
      rate: taxRate,
      required: taxRequired,
    } = await dataSources.PrintfulAPI.calculateTaxes({
      recipient: {
        country_code,
        state_code,
        ...rest,
      },
    });

    return { shippingCurrency, shippingRate, taxRate, taxRequired };
  } catch (err) {
    return err;
  }
};

module.exports = calculateShippingTaxesResolver;
