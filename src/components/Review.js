import React from 'react';

function Review({ id, gravatar, name, headline, message }) {
  return (
    <article key={id} className="p-6 w-full flex flex-col lg:w-1/3 relative">
      {gravatar && (
        <img
          src={gravatar}
          className="rounded-full w-16 h-16 mx-auto z-20 border-2 border-slategray object-fill absolute top-0 inset-x-0 -mt-2"
        />
      )}

      <div className="w-full overflow-hidden border-2 z-10 border-slategray rounded pt-12 p-6 text-center h-full flex flex-col justify-between">
        <div>
          <p className="text-slategray font-medium text-lg">{headline}</p>

          <div
            className="italic text-slategray py-6"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        </div>

        <p className="text-lightgray text-sm">{name}</p>
      </div>
    </article>
  );
}

export default Review;
