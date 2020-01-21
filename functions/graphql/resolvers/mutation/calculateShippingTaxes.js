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

    const data = await dataSources.PrintfulAPI.calculateShipping({
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

    console.log(data);
  } catch (err) {
    return err;
  }
};

module.exports = calculateShippingTaxesResolver;
