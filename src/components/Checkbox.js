import React from 'react';

function Checkbox({ register, name, children, ...rest }) {
  return (
    <label className="block cursor-pointer" htmlFor={name}>
      <input
        id={name}
        name={name}
        type="checkbox"
        ref={register}
        className="mr-3 leading-tight"
        {...rest}
      />
      <span className="text-sm">{children}</span>
    </label>
  );
}

export default Checkbox;
