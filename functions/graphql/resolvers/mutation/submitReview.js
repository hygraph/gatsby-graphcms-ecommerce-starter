const submitReviewResolver = async (_, args, ctx) => {
  try {
    const review = await ctx.dataSources.GraphCMSAPI.submitReview(args);

    return review;
  } catch (err) {
    return err;
  }
};

module.exports = submitReviewResolver;
