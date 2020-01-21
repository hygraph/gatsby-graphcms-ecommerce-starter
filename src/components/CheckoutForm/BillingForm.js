import React, { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import Input from '../Input';
import Select from '../Select';
import CheckoutContext from '../../context/Checkout';

import usePrintfulShippingCountries from '../../hooks/usePrintfulShippingCountries';

function BillingForm() {
  const { errors, register, watch } = useFormContext();
  const { shippingCountries } = usePrintfulShippingCountries();
  const { allowPayment, processing: checkoutProcessing } = useContext(
    CheckoutContext
  );

  const { billing: { country: billingCountryCode } = {} } = watch({
    nest: true,
  });

  const activeBillingCountry = shippingCountries.find(
    country => country.code === billingCountryCode
  );

  const disableInput = allowPayment || checkoutProcessing;

  return (
    <div className="rounded-lg bg-white border-2 border-gainsboro p-3 md:p-6 my-3 md:my-6">
      <h3 className="text-slategray text-2xl md:text-4xl font-bold mb-6">
        Billing
      </h3>

      <div className="mb-3 md:mb-6">
        <Input
          name="billing.name"
          placeholder="Name"
          disabled={disableInput}
          register={register({ required: 'Billing name is required' })}
          errors={errors}
        />
      </div>

      <div className="mb-3 md:mb-6">
        <Input
          name="billing.address1"
          placeholder="Address line 1"
          disabled={disableInput}
          register={register({
            required: 'Billing address line 1 is required',
          })}
          errors={errors}
        />
      </div>

      <div className="mb-3 md:mb-6">
        <Input
          name="billing.address2"
          placeholder="Apartment, suite, etc. (optional)"
          disabled={disableInput}
          register={register}
          errors={errors}
        />
      </div>

      <div className="md:flex -mx-3">
        <div className="md:w-1/2 mb-3 md:mb-6 px-3">
          <Input
            name="billing.city"
            placeholder="City"
            disabled={disableInput}
            register={register({ required: 'Billing city is required' })}
            errors={errors}
          />
        </div>
        <div className="md:w-1/2 mb-3 md:mb-6 px-3">
          <Select
            name="billing.country"
            disabled={disableInput}
            register={register({ required: 'Billing country is required' })}
            options={shippingCountries.map(({ code: value, name }) => ({
              value,
              name,
            }))}
            errors={errors}
          />
        </div>
      </div>

      <div className="md:flex -mx-3">
        {activeBillingCountry && activeBillingCountry.states && (
          <div className="md:w-1/2 mb-3 md:mb-6 px-3">
            <Select
              name="billing.state"
              disabled={disableInput}
              register={register({ required: 'Billing state is required' })}
              options={activeBillingCountry.states.map(
                ({ code: value, name }) => ({
                  value,
                  name,
                })
              )}
              errors={errors}
            />
          </div>
        )}

        <div className="md:w-1/2 mb-3 md:mb-6 px-3">
          <Input
            name="billing.zip"
            placeholder="ZIP / Postcode"
            disabled={disableInput}
            register={register({ required: 'Billing ZIP is required' })}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
}

export default BillingForm;
