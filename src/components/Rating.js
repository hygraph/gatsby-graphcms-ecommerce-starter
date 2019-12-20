import React from 'react';

function Rating({ rating }) {
  return (
    <div className="flex items-center mb-3">
      {new Array(rating).fill(0).map((_, index) => (
        <svg
          key={index}
          className="w-8 h-8 text-primary fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
}

export default Rating;
