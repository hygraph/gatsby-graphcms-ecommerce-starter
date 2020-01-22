import React from 'react';

function Textarea({ register, name, ...rest }) {
  return (
    <textarea
      name={name}
      ref={register}
      className="appearance-none bg-gainsboro border-2 px-4 py-3 pr-8 focus:outline-none focus:border-slategray focus:bg-white text-slategray focus:outline-none w-full rounded-lg"
      {...rest}
    />
  );
}

export default Textarea;
