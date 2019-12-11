import React from 'react';

function Input({ register, name, ...rest }) {
  return (
    <input
      name={name}
      ref={register}
      className="appearance-none bg-white border-2 border-slategray px-4 py-3 pr-8 focus:outline-none focus:border-primary focus:bg-white text-slategray focus:outline-none w-full rounded"
      {...rest}
    />
  );
}

export default Input;
