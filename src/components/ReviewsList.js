import React from 'react';

import Review from './Review';

function ReviewsList({ reviews }) {
  if (!reviews) return <p>This product has no reviews</p>;

  return (
    <React.Fragment>
      <div className="my-6 text-center">
        <h3 className="font-bold text-3xl mb-3 text-slategray">Reviews</h3>

        <hr className="border-b border-gainsboro w-10" />
      </div>

      {reviews.map(Review)}
    </React.Fragment>
  );
}

export default ReviewsList;
