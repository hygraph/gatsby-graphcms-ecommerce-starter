import React, { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import classnames from 'classnames';

import LoadingSVG from '../../svg/loading.svg';

import Input from '../Input';
import Select from '../Select';
import Checkbox from '../Checkbox';
import CheckoutContext from '../../context/Checkout';

import usePrintfulShippingCountries from '../../hooks/usePrintfulShippingCountries';

function ShippingForm() {
  const { errors, register, watch } = useFormContext();
  const { shippingCountries } = usePrintfulShippingCountries();
  const { allowPayment, processing: checkoutProcessing } = useContext(
    CheckoutContext
  );

  const { shipping: { country: shippingCountryCode } = {} } = watch({
    nest: true,
  });

  const activeShippingCountry = shippingCountries.find(
    country => country.code === shippingCountryCode
  );

  const disableInput = allowPayment || checkoutProcessing;

  return (
    <div className="rounded-lg bg-white border-2 border-gainsboro p-3 md:p-6 my-3 md:my-6">
      <h3 className="text-slategray text-2xl md:text-4xl font-bold mb-6">
        Shipping
      </h3>

      <div className="mb-3 md:mb-6">
        <Input
          name="shipping.name"
          placeholder="Name"
          disabled={disableInput}
          register={register({ required: 'Shipping name is required' })}
          errors={errors}
        />
      </div>

      <div className="md:flex -mx-3">
        <div className="md:w-1/2 mb-3 md:mb-6 px-3">
          <Input
            name="email"
            type="email"
            placeholder="Email address"
            disabled={disableInput}
            register={register({
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Email is invalid',
              },
            })}
            errors={errors}
          />
        </div>

        <div className="md:w-1/2 mb-3 md:mb-6 px-3">
          <Input
            name="phone"
            type="tel"
            placeholder="Contact no."
            disabled={disableInput}
            register={register}
            errors={errors}
          />
        </div>
      </div>

      <div className="mb-3 md:mb-6">
        <Input
          name="shipping.address1"
          placeholder="Address line 1"
          disabled={disableInput}
          register={register({
            required: 'Shipping address line 1 is required',
          })}
          errors={errors}
        />
      </div>

      <div className="mb-3 md:mb-6">
        <Input
          name="shipping.address2"
          placeholder="Apartment, suite, etc. (optional)"
          disabled={disableInput}
          register={register}
          errors={errors}
        />
      </div>

      <div className="md:flex -mx-3">
        <div className="md:w-1/2 mb-3 md:mb-6 px-3">
          <Input
            name="shipping.city"
            placeholder="City"
            disabled={disableInput}
            register={register({ required: 'Shipping city is required' })}
            errors={errors}
          />
        </div>

        <div className="md:w-1/2 mb-3 md:mb-6 px-3">
          <Select
            name="shipping.country"
            disabled={disableInput}
            register={register({ required: 'Shipping country is required' })}
            options={shippingCountries.map(({ code: value, name }) => ({
              value,
              name,
            }))}
            errors={errors}
          />
        </div>
      </div>

      <div className="md:flex -mx-3">
        {activeShippingCountry && activeShippingCountry.states && (
          <div className="md:w-1/2 mb-3 md:mb-6 px-3">
            <Select
              name="shipping.state"
              disabled={disableInput}
              register={register({ required: 'Shipping state is required' })}
              options={activeShippingCountry.states.map(
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
            name="shipping.zip"
            placeholder="ZIP / Postcode"
            disabled={disableInput}
            register={register({ required: 'Shipping ZIP is required' })}
            errors={errors}
          />
        </div>
      </div>

      {!allowPayment && (
        <div className="flex items-center justify-between">
          <Checkbox
            name="separateBilling"
            disabled={disableInput}
            register={register}
          >
            Use different billing address
          </Checkbox>
          <button
            type="submit"
            className={classnames(
              'bg-primary rounded-lg text-white px-3 py-2 h-10 focus:outline-none font-bold',
              { 'cursor-not-allowed opacity-50': disableInput }
            )}
            disabled={disableInput}
          >
            {checkoutProcessing ? <LoadingSVG /> : 'Calculate shipping'}
          </button>
        </div>
      )}
    </div>
  );
}

export default ShippingForm;
