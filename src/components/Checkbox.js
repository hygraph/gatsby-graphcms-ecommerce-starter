import React from 'react';
import classNames from 'classnames';

function Checkbox({ disabled, register, name, children, ...rest }) {
  const labelClass = classNames('block', {
    'cursor-not-allowed': disabled,
    'cursor-pointed': !disabled,
  });

  const inputClass = classNames('mr-3 leading-tight', {
    'cursor-not-allowed opacity-50': disabled,
  });

  return (
    <label className={labelClass} htmlFor={name}>
      <input
        id={name}
        name={name}
        type="checkbox"
        ref={register}
        className={inputClass}
        disabled={disabled}
        {...rest}
      />
      <span className="text-sm text-slategray">{children}</span>
    </label>
  );
}

export default Checkbox;
