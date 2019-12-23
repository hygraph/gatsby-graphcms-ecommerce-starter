import React, { useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import useForm from 'react-hook-form';
import { useMutation } from 'graphql-hooks';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { useCart } from 'react-use-cart';

import Input from './Input';
import Select from './Select';
import Checkbox from './Checkbox';

const CHECKOUT_MUTATION = `mutation checkout($name: String!, $email: String!, $total: Int!, $billingAddress: CheckoutAddressInput!, $shippingAddress: CheckoutAddressInput!, $items: [CheckoutItemInput!]!) {
  checkout(input: {name: $name, email: $email, total: $total, billingAddress: $billingAddress, shippingAddress: $shippingAddress, items: $items}) {
    graphCMSOrderId
    printfulOrderId
  }
}`;

const PAYMENT_INTENT_MUTATION = `mutation createPaymentIntent($email: String!, $metadata: PaymentIntentMeta!, $total: Int!) {
  createPaymentIntent(input: {email: $email, metadata: $metadata, total: $total}) {
    id
    clientSecret
    status
  }
}`;

const defaultValues = {
  separateBilling: false,
};

function CheckoutPage({ elements, stripe }) {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    setError,
    errors,
    formState,
  } = useForm({ defaultValues });
  const { isSubmitting } = formState;
  const [checkout] = useMutation(CHECKOUT_MUTATION);
  const [createPaymentIntent] = useMutation(PAYMENT_INTENT_MUTATION);
  const { cartTotal, items } = useCart();
  const values = watch();
  const shippingCountryCode = watch('shipping.country');
  const billingCountryCode = watch('billing.country');
  const useSeparateBilling = !!values.separateBilling;

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

      const {
        data: {
          checkout: { graphCMSOrderId, printfulOrderId },
        },
      } = await checkout({
        variables: {
          name,
          email,
          total: cartTotal,
          shippingAddress,
          billingAddress: useSeparateBilling ? billingAddress : shippingAddress,
          items: checkoutItems,
        },
      });

      const {
        data: {
          createPaymentIntent: { clientSecret },
        },
      } = await createPaymentIntent({
        variables: {
          email,
          metadata: { graphCMSOrderId, printfulOrderId },
          total: cartTotal,
        },
      });

      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement('card'),
        },
      });
    } catch (err) {
      setError(
        'checkout',
        'unableToProceed',
        err.message || 'Unable to process order. Please try again.'
      );
    }
  };

  const {
    allPrintfulCountry: { nodes: shippingCountries },
  } = useStaticQuery(graphql`
    {
      allPrintfulCountry(sort: { fields: name }) {
        nodes {
          name
          id
          code
          states {
            code
            name
          }
        }
      }
    }
  `);

  const handleStripeChange = e => setValue('stripe', e);

  const activeShippingCountry = shippingCountries.find(
    country => country.code === shippingCountryCode
  );
  const activeBillingCountry = shippingCountries.find(
    country => country.code === billingCountryCode
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded bg-white border-2 border-gainsboro p-3 md:p-6 my-3 md:my-6">
        <h3 className="text-slategray text-2xl md:text-4xl font-bold mb-6">
          Shipping
        </h3>

        <div className="mb-3 md:mb-6">
          <Input
            name="shipping.name"
            placeholder="Name"
            register={register({ required: 'Shipping name is required' })}
          />
          {errors['shipping.name'] && errors['shipping.name'].message}
        </div>

        <div className="md:flex -mx-3">
          <div className="md:w-1/2 mb-3 md:mb-6 px-3">
            <Input
              name="email"
              type="email"
              placeholder="Email address"
              register={register({
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Email is invalid',
                },
              })}
            />
            {errors.email && errors.email.message}
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

        <div className="mb-3 md:mb-6">
          <Input
            name="shipping.address1"
            placeholder="Address line 1"
            register={register({
              required: 'Shipping address line 1 is required',
            })}
          />
          {errors['shipping.address1'] && errors['shipping.address1'].message}
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
              register={register({ required: 'Shipping city is required' })}
            />
            {errors['shipping.city'] && errors['shipping.city'].message}
          </div>
          {activeShippingCountry && activeShippingCountry.states && (
            <div className="md:w-1/2 mb-3 md:mb-6 px-3">
              <Select
                name="shipping.state"
                register={register({ required: 'Shipping state is required' })}
                options={activeShippingCountry.states.map(
                  ({ code: value, name }) => ({
                    value,
                    name,
                  })
                )}
              />
              {errors['shipping.state'] && errors['shipping.state'].message}
            </div>
          )}
        </div>

        <div className="md:flex -mx-3">
          <div className="md:w-1/2 mb-3 md:mb-6 px-3">
            <Select
              name="shipping.country"
              register={register({ required: 'Shipping country is required' })}
              options={shippingCountries.map(({ code: value, name }) => ({
                value,
                name,
              }))}
            />
            {errors['shipping.country'] && errors['shipping.country'].message}
          </div>

          <div className="md:w-1/2 mb-3 md:mb-6 px-3">
            <Input
              name="shipping.zip"
              placeholder="ZIP / Postcode"
              register={register({ required: 'Shipping ZIP is required' })}
            />
            {errors['shipping.zip'] && errors['shipping.zip'].message}
          </div>
        </div>

        <div>
          <Checkbox name="separateBilling" register={register}>
            Use different billing address
          </Checkbox>
        </div>
      </div>

      {useSeparateBilling && (
        <div className="rounded bg-white border-2 border-gainsboro p-3 md:p-6 my-3 md:my-6">
          <h3 className="text-slategray text-2xl md:text-4xl font-bold mb-6">
            Billing
          </h3>

          <div className="mb-3 md:mb-6">
            <Input
              name="billing.name"
              placeholder="Name"
              register={register({ required: 'Billing name is required' })}
            />
            {errors['billing.name'] && errors['billing.name'].message}
          </div>

          <div className="mb-3 md:mb-6">
            <Input
              name="billing.address1"
              placeholder="Address"
              register={register({
                required: 'Billing address line 1 is required',
              })}
            />
            {errors['billing.address1'] && errors['billing.address1'].message}
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
                register={register({ required: 'Billing city is required' })}
              />
              {errors['billing.city'] && errors['billing.city'].message}
            </div>
            {activeBillingCountry && activeBillingCountry.states && (
              <div className="md:w-1/2 mb-3 md:mb-6 px-3">
                <Select
                  name="billing.state"
                  register={register({ required: 'Billing state is required' })}
                  options={activeBillingCountry.states.map(
                    ({ code: value, name }) => ({
                      value,
                      name,
                    })
                  )}
                />
                {errors['billing.state'] && errors['billing.state'].message}
              </div>
            )}
          </div>

          <div className="md:flex -mx-3">
            <div className="md:w-1/2 mb-3 md:mb-6 px-3">
              <Select
                name="billing.country"
                register={register({ required: 'Billing country is required' })}
                options={shippingCountries.map(({ code: value, name }) => ({
                  value,
                  name,
                }))}
              />
              {errors['billing.country'] && errors['billing.country'].message}
            </div>

            <div className="md:w-1/2 mb-3 md:mb-6 px-3">
              <Input
                name="billing.zip"
                placeholder="ZIP / Postcode"
                register={register({ required: 'Billing ZIP is required' })}
              />
              {errors['billing.zip'] && errors['billing.zip'].message}
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
            onReady={el => setValue('cardElement', el)}
          />

          {values.stripe && values.stripe.error && (
            <span className="text-red text-sm pt-3">
              {values.stripe.error.message}
            </span>
          )}
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-primary rounded text-white px-3 py-2 h-10 focus:outline-none font-bold"
            disabled={isSubmitting}
          >
            Pay for order
          </button>
        </div>
      </div>
    </form>
  );
}

export default injectStripe(CheckoutPage);
