import React from 'react';
import Img from 'gatsby-image';

function Review({ id, gravatar, rating, name, headline, message }) {
  const Stars = () => (
    <div className="flex items-center mb-3">
      {new Array(rating).fill(0).map(() => (
        <svg
          className="w-8 h-8 text-primary fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );

  return (
    <article
      key={id}
      className="w-full md:flex mb-6 border-2 border-gainsboro rounded"
    >
      <div className="md:w-1/4 p-6 bg-gainsboro">
        <div className="flex h-full">
          <div className="m-auto flex flex-col items-center justify-center">
            {gravatar && (
              <Img
                className="bg-white rounded-full w-16 h-16 mb-3"
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
        <Stars />

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
