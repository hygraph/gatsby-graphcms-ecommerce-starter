import React from 'react';
import classnames from 'classnames';

function PaymentInfo() {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div
      className={classnames('border-2 b-3 md:mb-6 px-3 py-2 rounded-lg', {
        'border-gainsboro': isDevelopment,
        'border-orange-400': !isDevelopment,
      })}
    >
      {isDevelopment ? (
        <p className="leading-relaxed text-slategray text-sm">
          This is a <strong>test checkout</strong>. You can simulate
          transactions using any valid expiry date, CVC code and{' '}
          <code className="text-black bg-gainsboro rounded-lg p-1">
            4242 4242 4242 4242
          </code>
          , or{' '}
          <code className="text-black bg-gainsboro rounded-lg p-1">
            4000 0000 0000 3220
          </code>{' '}
          if you want trigger 3D Secure 2 authentication.
        </p>
      ) : (
        <div>
          <p className="leading-relaxed text-slategray text-sm">
            This is a <strong>live checkout</strong>. Card payments will be
            processed and orders will be fulfilled.
          </p>
        </div>
      )}
    </div>
  );
}

export default PaymentInfo;
