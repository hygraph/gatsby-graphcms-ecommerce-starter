import React from 'react';
import Img from 'gatsby-image';

import Rating from './Rating';

function Review({ id, gravatar, rating, name, headline, message }) {
  return (
    <article
      key={id}
      className="w-full md:flex mb-6 border-2 border-gainsboro rounded-lg"
    >
      <div className="md:w-1/4 p-6 bg-gainsboro">
        <div className="flex h-full">
          <div className="m-auto flex flex-col items-center justify-center">
            {gravatar && (
              <Img
                className="bg-white rounded-lg w-16 h-16 mb-3"
                fluid={gravatar.childImageSharp.fluid}
                alt={name}
                title={name}
              />
            )}
            <p className="text-slategray text-lg font-bold">{name}</p>
          </div>
        </div>
      </div>

      <div className="md:w-3/4 p-6">
        <Rating rating={rating} />

        <p className="text-slategray font-medium text-lg">{headline}</p>

        <div
          className="italic text-slategray py-6"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </div>
    </article>
  );
}

export default Review;
