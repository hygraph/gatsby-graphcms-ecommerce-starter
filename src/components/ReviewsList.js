import React from 'react';

import Review from './Review';
import ReviewForm from './ReviewForm';

function ReviewsList({ productId, reviews }) {
  return (
    <React.Fragment>
      <div className="py-12">
        <h3 className="font-bold text-3xl mb-3 text-slategray">
          Customer Reviews
        </h3>

        <hr className="border-b border-gainsboro w-10" />
      </div>

      {reviews.map(Review)}

      <ReviewForm productId={productId} />
    </React.Fragment>
  );
}

export default ReviewsList;
