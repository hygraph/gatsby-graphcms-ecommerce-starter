import React from 'react';

function Review({ id, name, headline, message, updatedAt }) {
  return (
    <div
      key={id}
      className="border-b border-gainsboro py-6 md:flex md:flex-wrap md:-mx-6"
    >
      <div className="md:w-1/4 md:p-6">
        <p>{name}</p>
      </div>

      <div className="md:w-3/4 md:p-6">
        <p>{headline}</p>
        <div dangerouslySetInnerHTML={{ __html: message }} />
      </div>
    </div>
  );
}

export default Review;
