import React from 'react';
import classNames from 'classnames';

import InputError from './InputError';

function Input({ disabled, errors = {}, register, name, ...rest }) {
  const hasError = errors[name];

  const inputClass = classNames(
    'appearance-none bg-gainsboro border-2 px-4 py-3 pr-8 focus:outline-none focus:bg-white text-black w-full rounded-lg',
    {
      'border-red focus:border-red': hasError,
      'border-gainsboro focus:border-slategray': !hasError,
      'opacity-50': disabled,
    }
  );

  return (
    <React.Fragment>
      <input
        name={name}
        ref={register}
        className={inputClass}
        disabled={disabled}
        {...rest}
      />
      {hasError && <InputError message={hasError.message} />}
    </React.Fragment>
  );
}

export default Input;
