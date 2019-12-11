import React, { useState, useEffect } from 'react';
import useForm from 'react-hook-form';
import { useMutation } from 'graphql-hooks';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { useCart } from 'react-use-cart';

import Input from './Input';
import Checkbox from './Checkbox';

const CHECKOUT_MUTATION = `mutation checkout($name: String!, $email: String!, $total: Int!, $billingAddress: CheckoutAddressInput!, $shippingAddress: CheckoutAddressInput!, $items: [CheckoutItemInput!]!) {
  checkout(name: $name, email: $email, total: $total, billingAddress: $billingAddress, shippingAddress: $shippingAddress, items: $items) {
    id
    name
    email
    total
  }
}`;

function CheckoutPage({ stripe }) {
  const [checkout] = useMutation(CHECKOUT_MUTATION);
  const { cartTotal, items } = useCart();
  const { handleSubmit, register, watch, setValue } = useForm();
  const useSeparateBilling = watch('separateBilling', false);
  const [checkoutError, setCheckoutError] = useState(null);
  const [cardElement, setCardElement] = useState(null);

  useEffect(() => {
    register({ name: 'stripe' });
  }, [register]);

  const onSubmit = async values => {
    try {
      const {
        email,
        tel,
        shipping: { name, ...rest },
        billing: billingAddress,
      } = values;

      const checkoutItems = items.map(
        ({ id: variantId, description, image, ...rest }) => ({
          variantId,
          ...rest,
        })
      );

      const shippingAddress = { name, ...rest };

      await checkout({
        variables: {
          name,
          email,
          total: cartTotal,
          shippingAddress,
          billingAddress: useSeparateBilling ? billingAddress : shippingAddress,
          items: checkoutItems,
        },
      });
    } catch (err) {
      setCheckoutError(
        err.message || 'Unable to process order. Please try again.'
      );
    }
  };

  const handleStripeChange = e => setValue('stripe', e);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded bg-white border-2 border-gainsboro p-3 md:p-6 pb-0 md:pb-0 my-3 md:my-6">
        <h3 className="text-slategray text-2xl md:text-4xl font-bold mb-6">
          Contact information
        </h3>

        <div className="md:flex -mx-3">
          <div className="md:w-1/2 mb-3 md:mb-6 px-3">
            <Input
              name="email"
              type="email"
              placeholder="Email address"
              register={register({ required: true })}
            />
          </div>

          <div className="md:w-1/2 mb-3 md:mb-6 px-3">
            <Input
              name="tel"
              type="tel"
              placeholder="Contact no."
              register={register}
            />
          </div>
        </div>
      </div>

      <div className="rounded bg-white border-2 border-gainsboro p-3 md:p-6 my-3 md:my-6">
        <h3 className="text-slategray text-2xl md:text-4xl font-bold mb-6">
          Shipping
        </h3>

        <div className="mb-3 md:mb-6">
          <Input
            name="shipping.name"
            placeholder="Name"
            register={register({ required: true })}
          />
        </div>

        <div className="mb-3 md:mb-6">
          <Input
            name="shipping.address1"
            placeholder="Address line 1"
            register={register({ required: true })}
          />
        </div>

        <div className="mb-3 md:mb-6">
          <Input
            name="shipping.address2"
            placeholder="Apartment, suite, etc. (optional)"
            register={register}
          />
        </div>

        <div className="md:flex -mx-3">
          <div className="md:w-1/2 mb-3 md:mb-6 px-3">
            <Input
              name="shipping.city"
              placeholder="City"
              register={register({ required: true })}
            />
          </div>
          <div className="md:w-1/2 mb-3 md:mb-6 px-3">
            <Input
              name="shipping.state"
              placeholder="State / County"
              register={register({ required: true })}
            />
          </div>
        </div>

        <div className="md:flex -mx-3">
          <div className="md:w-1/2 mb-3 md:mb-6 px-3">
            <Input
              name="shipping.country"
              placeholder="Country"
              register={register({ required: true })}
            />
          </div>

          <div className="md:w-1/2 mb-3 md:mb-6 px-3">
            <Input
              name="shipping.zip"
              placeholder="ZIP / Postcode"
              register={register({ required: true })}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Checkbox name="separateBilling" register={register}>
            Use different billing address
          </Checkbox>

          <button
            type="submit"
            className="bg-primary text-white px-3 py-2 h-10 focus:outline-none font-bold"
          >
            Continue to {useSeparateBilling ? 'billing' : 'payment'}
          </button>
        </div>
      </div>

      {/* <div className="rounded bg-white border-2 border-gainsboro p-3 md:p-6 my-3 md:my-6">
            <div className="flex items-start justify-between">
              <h3 className="text-slategray text-2xl md:text-4xl font-bold mb-6 inline-flex items-center">
                <span className="text-primary">
                  <svg
                    className="fill-current w-8 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                  </svg>
                </span>
                Ship to
              </h3>

              <button className="appearance-none text-primary focus:outline-none">
                Edit
              </button>
            </div>

            <p>Jamie Barton</p>
            <p>123 Address Street, Line 2, Washington, United States, 12345</p>
          </div> */}

      {useSeparateBilling && (
        <React.Fragment>
          <div className="rounded bg-white border-2 border-gainsboro p-3 md:p-6 my-3 md:my-6">
            <h3 className="text-slategray text-2xl md:text-4xl font-bold mb-6">
              Billing
            </h3>

            <div className="mb-3 md:mb-6">
              <Input
                name="billing.name"
                placeholder="Name"
                register={register({ required: true })}
              />
            </div>

            <div className="mb-3 md:mb-6">
              <Input
                name="billing.address1"
                placeholder="Address"
                register={register({ required: true })}
              />
            </div>

            <div className="mb-3 md:mb-6">
              <Input
                name="billing.address2"
                placeholder="Apartment, suite, etc. (optional)"
                register={register}
              />
            </div>

            <div className="md:flex -mx-3">
              <div className="md:w-1/2 mb-3 md:mb-6 px-3">
                <Input
                  name="billing.city"
                  placeholder="City"
                  register={register({ required: true })}
                />
              </div>
              <div className="md:w-1/2 mb-3 md:mb-6 px-3">
                <Input
                  name="billing.state"
                  placeholder="State / County"
                  register={register({ required: true })}
                />
              </div>
            </div>

            <div className="md:flex -mx-3">
              <div className="md:w-1/2 mb-3 md:mb-6 px-3">
                <Input
                  name="billing.country"
                  placeholder="Country"
                  register={register({ required: true })}
                />
              </div>

              <div className="md:w-1/2 mb-3 md:mb-6 px-3">
                <Input
                  name="billing.zip"
                  placeholder="ZIP / Postcode"
                  register={register({ required: true })}
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="bg-primary text-white px-3 py-2 h-10 focus:outline-none font-bold"
              >
                Continue to payment
              </button>
            </div>
          </div>
          <div className="rounded bg-white border-2 border-gainsboro p-3 md:p-6 my-3 md:my-6">
            <div className="flex items-start justify-between">
              <h3 className="text-slategray text-2xl md:text-4xl font-bold mb-6 inline-flex items-center">
                <span className="text-primary">
                  <svg
                    className="fill-current w-8 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                  </svg>
                </span>
                Bill to
              </h3>

              <button className="appearance-none text-primary focus:outline-none">
                Edit
              </button>
            </div>

            <p>Jamie Barton</p>
            <p>123 Address Street, Line 2, Washington, United States, 12345</p>
          </div>
        </React.Fragment>
      )}

      <div className="rounded bg-white border-2 border-gainsboro p-3 md:p-6 my-3 md:my-6">
        <h3 className="text-slategray text-2xl md:text-4xl font-bold mb-6">
          Pay
        </h3>

        <div className="mb-3 md:mb-6">
          <CardElement
            className="appearance-none bg-white border-2 border-slategray px-4 py-3 pr-8 focus:outline-none focus:border-primary focus:bg-white text-slategray focus:outline-none w-full rounded"
            hidePostalCode={true}
            onChange={handleStripeChange}
            onReady={el => setCardElement(el)}
          />
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-primary text-white px-3 py-2 h-10 focus:outline-none font-bold"
          >
            Pay for order
          </button>
        </div>
      </div>
    </form>
  );
}

export default injectStripe(CheckoutPage);
