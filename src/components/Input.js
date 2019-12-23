import React from 'react';
import classNames from 'classnames';

import InputError from './InputError';

function Input({ errors = {}, register, name, ...rest }) {
  const hasError = errors[name];

  const inputClass = classNames(
    'appearance-none bg-white border-2 px-4 py-3 pr-8 focus:outline-none focus:bg-white text-slategray w-full rounded',
    {
      'border-red focus:border-red': hasError,
      'border-slategrey focus:border-primary': !hasError,
    }
  );

  return (
    <React.Fragment>
      <input name={name} ref={register} className={inputClass} {...rest} />
      {hasError && <InputError message={hasError.message} />}
    </React.Fragment>
  );
}

export default Input;
