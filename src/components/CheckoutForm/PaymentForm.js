import React, { useContext, useEffect } from 'react';
import { useFormContext, ErrorMessage } from 'react-hook-form';
import { CardElement } from '@stripe/react-stripe-js';
import classnames from 'classnames';

import LoadingSVG from '../../svg/loading.svg';

import CheckoutContext from '../../context/Checkout';
import PaymentInfo from './PaymentInfo';

function PaymentForm() {
  const { errors, register, setValue } = useFormContext();
  const {
    allowPayment,
    error: checkoutError,
    processing: checkoutProcessing,
    success: checkoutSuccess,
  } = useContext(CheckoutContext);

  useEffect(() => {
    if (allowPayment)
      register(
        { name: 'stripe' },
        { required: 'Please provide payment details' }
      );
  }, [allowPayment, register]);

  const handleStripeChange = e => setValue('stripe', e);

  return (
    <div className="rounded-lg bg-white border-2 border-gainsboro p-3 md:p-6 my-3 md:my-6">
      <div className="flex items-center justify-between">
        <h3
          className={classnames(
            'text-slategray text-2xl md:text-4xl font-bold',
            {
              'mb-6': allowPayment,
            }
          )}
        >
          Pay
        </h3>
        {!allowPayment && (
          <p className="ml-4 text-lightgray text-sm">
            You must calculate shipping totals before proceeding to payment
          </p>
        )}
      </div>
      {allowPayment && (
        <React.Fragment>
          <PaymentInfo />

          <div className="mb-3 md:mb-6">
            <CardElement
              className="appearance-none bg-white border-2 border-gainsboro px-4 py-3 pr-8 focus:outline-none focus:border-slategray focus:bg-white text-slategray focus:outline-none w-full rounded-lg"
              options={{ hidePostalCode: true }}
              disabled={checkoutProcessing}
              onChange={handleStripeChange}
              onReady={el => setValue('cardElement', el)}
            />

            {errors.stripe && (
              <React.Fragment>
                <ErrorMessage
                  as={<p className="mt-2 text-red text-sm" />}
                  name="stripe"
                  errors={errors}
                />
              </React.Fragment>
            )}
          </div>

          {checkoutError && <p className="text-red">{checkoutError}</p>}
          {checkoutProcessing && 'Please wait. Processing order.'}
          {checkoutSuccess && 'Order successfully received.'}
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-primary rounded-lg text-white px-3 py-2 h-10 focus:outline-none font-bold"
              disabled={checkoutProcessing}
            >
              {checkoutProcessing ? <LoadingSVG /> : 'Pay for order'}
            </button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default PaymentForm;
