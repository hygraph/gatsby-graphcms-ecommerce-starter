import React, { useReducer } from 'react';
import { navigate } from 'gatsby';
import { useForm, FormContext } from 'react-hook-form';
import { useMutation } from 'graphql-hooks';
import { injectStripe } from 'react-stripe-elements';
import { useCart } from 'react-use-cart';
import { toast } from 'react-toastify';

import ShippingForm from './ShippingForm';
import BillingForm from './BillingForm';
import PaymentForm from './PaymentForm';

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

function CheckoutForm({ elements, stripe }) {
  const methods = useForm({
    defaultValues: {
      separateBilling: false,
      'billing.country': 'DE',
      'shipping.country': 'DE',
    },
  });
  const { handleSubmit, watch } = methods;
  const [checkout] = useMutation(CHECKOUT_MUTATION);
  const [createPaymentIntent] = useMutation(PAYMENT_INTENT_MUTATION);
  const { cartTotal, emptyCart, items } = useCart();
  const [checkoutState, checkoutDispatch] = useReducer(checkoutReducer, {
    processing: false,
    error: null,
    success: false,
  });
  const { separateBilling } = watch();

  const useSeparateBilling = !!separateBilling;

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

  return (
    <FormContext {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ShippingForm {...checkoutState} />
        {useSeparateBilling && <BillingForm {...checkoutState} />}
        <PaymentForm {...checkoutState} />
      </form>
    </FormContext>
  );
}

export default injectStripe(CheckoutForm);
