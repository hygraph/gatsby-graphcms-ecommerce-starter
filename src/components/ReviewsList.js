import React from 'react';

import Review from './Review';

function ReviewsList({ reviews }) {
  return (
    <React.Fragment>
      <div className="py-12">
        <h3 className="font-bold text-3xl mb-3 text-slategray">
          Customer Reviews
        </h3>

        <hr className="border-b border-gainsboro w-10" />
      </div>

      <div className="flex flex-wrap -mx-6">{reviews.map(Review)}</div>
    </React.Fragment>
  );
}

export default ReviewsList;
