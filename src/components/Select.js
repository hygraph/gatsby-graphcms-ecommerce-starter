import React from 'react';
import classNames from 'classnames';

import InputError from './InputError';

function Select({ errors = {}, register, name, options, ...rest }) {
  const hasError = errors[name];

  const selectClass = classNames(
    'block appearance-none w-full bg-white border-2 px-4 py-3 pr-8 focus:outline-none focus:bg-white text-slategray rounded',
    {
      'border-red focus:border-red': hasError,
      'border-slategrey focus:border-primary': !hasError,
    }
  );

  return (
    <React.Fragment>
      <div className="relative">
        <select name={name} ref={register} {...rest} className={selectClass}>
          {options.map(({ value, name }) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slategray">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      {hasError && <InputError message={hasError.message} />}
    </React.Fragment>
  );
}

export default Select;
