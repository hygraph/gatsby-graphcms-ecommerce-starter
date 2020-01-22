import React from 'react';
import { ErrorMessage } from 'react-hook-form';
import classNames from 'classnames';

function Input({ disabled, errors = {}, register, name, ...rest }) {
  const inputClass = classNames(
    'appearance-none bg-gainsboro border-2 px-4 py-3 pr-8 focus:outline-none focus:bg-white text-black w-full rounded-lg',
    {
      'cursor-not-allowed opacity-50': disabled,
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
      <ErrorMessage
        as={<p className="mt-2 text-red text-sm" />}
        name={name}
        errors={errors}
      />
    </React.Fragment>
  );
}

export default Input;
