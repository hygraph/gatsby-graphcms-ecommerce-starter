import React from 'react';
import { Link } from 'gatsby';
import Image from 'graphcms-image';

function Product({ id, name, images }) {
  const [mainImage] = images;

  return (
    <article key={id} className="px-6 py-3 w-full md:p-6 md:w-1/2 lg:w-1/3">
      <Link to={`/products/${id}`} className="no-underline w-full h-full block">
        <div className="cursor-pointerw-full overflow-hidden relative p-3 bg-gainsboro">
          <Image
            image={mainImage}
            maxWidth={350}
            className="bg-white block object-cover"
          />
        </div>

        <div className="py-3">
          <p className="text-slategray font-medium text-lg">{name}</p>
          <p className="text-lightgray text-sm">{name}</p>
        </div>
      </Link>
    </article>
  );
}

export default Product;
