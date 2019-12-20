import React from 'react';

function Textarea({ register, name, ...rest }) {
  return (
    <textarea
      name={name}
      ref={register}
      className="appearance-none bg-white border-2 border-slategray px-4 py-3 pr-8 focus:outline-none focus:border-primary focus:bg-white text-slategray focus:outline-none w-full rounded"
      {...rest}
    />
  );
}

export default Textarea;
