import React, { useEffect, useReducer } from 'react';
import { graphql, useStaticQuery, navigate } from 'gatsby';
import useForm from 'react-hook-form';
import { useMutation } from 'graphql-hooks';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { useCart } from 'react-use-cart';
import { toast } from 'react-toastify';

import Input from './Input';
import Select from './Select';
import Checkbox from './Checkbox';
import InputError from './InputError';

const CHECKOUT_MUTATION = `mutation checkout($input: CheckoutInput!) {
  checkout(input: $input) {
    graphCMSOrderId
    printfulOrderId
  }
}`;

const PAYMENT_INTENT_MUTATION = `mutation createPaymentIntent($input: PaymentIntentInput!) {
  createPaymentIntent(input: $input) {
    id
    clientSecret
    status
  }
}`;

const defaultValues = {
  separateBilling: false,
  'shipping.country': 'DE',
};

function checkoutReducer(checkoutState, { payload, type }) {
  switch (type) {
    case 'CHECKOUT_PROCESSING':
      return {
        ...checkoutState,
        processing: true,
        error: null,
      };
    case 'CHECKOUT_ERROR':
      return { ...checkoutState, processing: false, error: payload.message };
    case 'CHECKOUT_SUCCESS':
      return {
        ...checkoutState,
        processing: false,
        error: null,
        success: true,
      };
    default:
      throw new Error('Invalid action');
  }
}

function CheckoutPage({ elements, stripe }) {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    errors,
    formState,
  } = useForm({ defaultValues });
  const { isSubmitting } = formState;
  const [checkout] = useMutation(CHECKOUT_MUTATION);
  const [createPaymentIntent] = useMutation(PAYMENT_INTENT_MUTATION);
  const { cartTotal, emptyCart, items } = useCart();
  const [checkoutState, checkoutDispatch] = useReducer(checkoutReducer, {
    processing: false,
    error: null,
    success: false,
  });
  const values = watch();
  const shippingCountryCode = watch('shipping.country');
  const billingCountryCode = watch('billing.country');
  const useSeparateBilling = !!values.separateBilling;

  useEffect(() => {
    register(
      { name: 'stripe' },
      { required: 'Please provide payment details' }
    );
  }, [register]);

  const handleCheckoutError = ({
    message = 'Unable to process order. Please try again',
  }) => {
    checkoutDispatch({ type: 'CHECKOUT_ERROR', payload: { message } });

    toast.error(message, {
      className: 'bg-red',
    });
  };

  const handleCheckoutSuccess = orderId => {
    checkoutDispatch({ type: 'CHECKOUT_SUCCESS' });

    emptyCart();

    navigate('success', { state: { orderId } });
  };

  const onSubmit = async values => {
    checkoutDispatch({ type: 'CHECKOUT_PROCESSING' });

    try {
      const {
        email,
        phone,
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

      const input = {
        name,
        email,
        phone,
        total: cartTotal,
        shippingAddress,
        billingAddress: useSeparateBilling ? billingAddress : shippingAddress,
        items: checkoutItems,
      };

      const {
        data: {
          checkout: { graphCMSOrderId, printfulOrderId },
        },
      } = await checkout({
        variables: {
          input,
        },
      });

      const {
        data: {
          createPaymentIntent: { clientSecret },
        },
      } = await createPaymentIntent({
        variables: {
          input: {
            email,
            metadata: { graphCMSOrderId, printfulOrderId },
            total: cartTotal,
          },
        },
      });

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement('card'),
        },
      });

      if (error) throw new Error(error.message);

      handleCheckoutSuccess(graphCMSOrderId);
    } catch (err) {
      handleCheckoutError(err);
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
      <div className="rounded-lg bg-white border-2 border-gainsboro p-3 md:p-6 my-3 md:my-6">
        <h3 className="text-slategray text-2xl md:text-4xl font-bold mb-6">
          Shipping
        </h3>

        <div className="mb-3 md:mb-6">
          <Input
            name="shipping.name"
            placeholder="Name"
            disabled={checkoutState.processing}
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
              disabled={checkoutState.processing}
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
              disabled={checkoutState.processing}
              register={register}
              errors={errors}
            />
          </div>
        </div>

        <div className="mb-3 md:mb-6">
          <Input
            name="shipping.address1"
            placeholder="Address line 1"
            disabled={checkoutState.processing}
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
            disabled={checkoutState.processing}
            register={register}
            errors={errors}
          />
        </div>

        <div className="md:flex -mx-3">
          <div className="md:w-1/2 mb-3 md:mb-6 px-3">
            <Input
              name="shipping.city"
              placeholder="City"
              disabled={checkoutState.processing}
              register={register({ required: 'Shipping city is required' })}
              errors={errors}
            />
          </div>

          <div className="md:w-1/2 mb-3 md:mb-6 px-3">
            <Select
              name="shipping.country"
              disabled={checkoutState.processing}
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
                disabled={checkoutState.processing}
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
              disabled={checkoutState.processing}
              register={register({ required: 'Shipping ZIP is required' })}
              errors={errors}
            />
          </div>
        </div>

        <div>
          <Checkbox name="separateBilling" register={register}>
            Use different billing address
          </Checkbox>
        </div>
      </div>

      {useSeparateBilling && (
        <div className="rounded-lg bg-white border-2 border-gainsboro p-3 md:p-6 my-3 md:my-6">
          <h3 className="text-slategray text-2xl md:text-4xl font-bold mb-6">
            Billing
          </h3>

          <div className="mb-3 md:mb-6">
            <Input
              name="billing.name"
              placeholder="Name"
              disabled={checkoutState.processing}
              register={register({ required: 'Billing name is required' })}
              errors={errors}
            />
          </div>

          <div className="mb-3 md:mb-6">
            <Input
              name="billing.address1"
              placeholder="Address line 1"
              disabled={checkoutState.processing}
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
              disabled={checkoutState.processing}
              register={register}
              errors={errors}
            />
          </div>

          <div className="md:flex -mx-3">
            <div className="md:w-1/2 mb-3 md:mb-6 px-3">
              <Input
                name="billing.city"
                placeholder="City"
                disabled={checkoutState.processing}
                register={register({ required: 'Billing city is required' })}
                errors={errors}
              />
            </div>
            <div className="md:w-1/2 mb-3 md:mb-6 px-3">
              <Select
                name="billing.country"
                disabled={checkoutState.processing}
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
                  disabled={checkoutState.processing}
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
                disabled={checkoutState.processing}
                register={register({ required: 'Billing ZIP is required' })}
                errors={errors}
              />
            </div>
          </div>
        </div>
      )}

      <div className="rounded-lg bg-white border-2 border-gainsboro p-3 md:p-6 my-3 md:my-6">
        <h3 className="text-slategray text-2xl md:text-4xl font-bold mb-6">
          Pay
        </h3>

        <div className="mb-3 md:mb-6">
          <p className="leading-relaxed text-slategray">
            <strong>This is a test checkout</strong>. You can simulate
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
        </div>

        <div className="mb-3 md:mb-6">
          <CardElement
            className="appearance-none bg-white border-2 border-gainsboro px-4 py-3 pr-8 focus:outline-none focus:border-slategray focus:bg-white text-slategray focus:outline-none w-full rounded-lg"
            hidePostalCode={true}
            disabled={checkoutState.processing}
            onChange={handleStripeChange}
            onReady={el => setValue('cardElement', el)}
          />

          {errors.stripe && (
            <React.Fragment>
              <InputError message={errors.stripe.message} />
            </React.Fragment>
          )}
        </div>

        {checkoutState.error && (
          <p className="text-red">{checkoutState.error}</p>
        )}
        {checkoutState.processing && 'Please wait. Processing order.'}
        {checkoutState.success && 'Order successfully received.'}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-primary rounded-lg text-white px-3 py-2 h-10 focus:outline-none font-bold"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <svg
                className="fill-current h-3"
                viewBox="0 0 120 30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="15" cy="15" r="15">
                  <animate
                    attributeName="r"
                    from="15"
                    to="15"
                    begin="0s"
                    dur="0.8s"
                    values="15;9;15"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="fill-opacity"
                    from="1"
                    to="1"
                    begin="0s"
                    dur="0.8s"
                    values="1;.5;1"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="60" cy="15" r="9" fill-opacity="0.3">
                  <animate
                    attributeName="r"
                    from="9"
                    to="9"
                    begin="0s"
                    dur="0.8s"
                    values="9;15;9"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="fill-opacity"
                    from="0.5"
                    to="0.5"
                    begin="0s"
                    dur="0.8s"
                    values=".5;1;.5"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="105" cy="15" r="15">
                  <animate
                    attributeName="r"
                    from="15"
                    to="15"
                    begin="0s"
                    dur="0.8s"
                    values="15;9;15"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="fill-opacity"
                    from="1"
                    to="1"
                    begin="0s"
                    dur="0.8s"
                    values="1;.5;1"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            ) : (
              'Pay for order'
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default injectStripe(CheckoutPage);
