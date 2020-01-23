import React from 'react';

function PaymentInfo() {
  return (
    <div className="border-2 border-gainsboro b-3 md:mb-6 px-3 py-2 rounded-lg">
      <p className="leading-relaxed text-slategray text-sm">
        This is a <strong>test checkout</strong>. You can simulate transactions
        using any valid expiry date, CVC code and{' '}
        <code className="text-black bg-gainsboro rounded-lg p-1">
          4242 4242 4242 4242
        </code>
        , or{' '}
        <code className="text-black bg-gainsboro rounded-lg p-1">
          4000 0000 0000 3220
        </code>{' '}
        if you want trigger 3D Secure 2 authentication.
      </p>
    </div>
  );
}

export default PaymentInfo;
