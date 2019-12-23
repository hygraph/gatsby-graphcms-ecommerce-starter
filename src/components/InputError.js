import React from 'react';

function InputError({ message = 'Field is required' }) {
  return <p className="mt-2 text-red text-sm">{message}</p>;
}

export default InputError;
