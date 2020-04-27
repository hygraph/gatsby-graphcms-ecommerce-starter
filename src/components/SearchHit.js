import React from 'react';

import LocaleLink from './LocaleLink';

const SearchHit = ({ hit: { objectID, name, image, formattedPrice } }) => (
  <article key={objectID} className="w-full h-full">
    <LocaleLink
      to={`/products/${objectID}`}
      className="group no-underline w-full h-full flex"
    >
      <div className="bg-gainsboro rounded-lg cursor-pointer w-full overflow-hidden relative px-3 py-6 md:px-6">
        <img src={image} alt={name} title={name} />

        <div className="pt-3 md:pt-6 text-center">
          <p className="text-slategray font-bold text-lg group-hover:text-primary mb-1">
            {name}
          </p>
          <p className="text-lightgray text-sm">{formattedPrice}</p>
        </div>
      </div>
    </LocaleLink>
  </article>
);

export default SearchHit;
