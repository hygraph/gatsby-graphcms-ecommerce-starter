const submitReviewResolver = async (_, { input }, ctx) => {
  try {
    const review = await ctx.dataSources.GraphCMSAPI.submitReview(input);

    return review;
  } catch (err) {
    return err;
  }
};

module.exports = submitReviewResolver;
