import React, { useContext } from 'react';
import { navigate } from 'gatsby';
import { useForm, FormContext } from 'react-hook-form';
import { useMutation } from 'graphql-hooks';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from 'react-use-cart';
import { toast } from 'react-toastify';

import BillingForm from './BillingForm';
import PaymentForm from './PaymentForm';
import ShippingForm from './ShippingForm';
import CheckoutContext from '../../context/Checkout';

const CALCULATE_MUTATION = `mutation estimateOrderCosts,($input: EstimateOrderCostsInput!) {
  estimateOrderCosts,(input: $input) {
    currency
    shippingRate
    taxRate
    vatRate
  }
}`;

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

function CheckoutForm() {
  const methods = useForm({
    defaultValues: {
      separateBilling: false,
      billing: {
        country: 'DE',
      },
      shipping: {
        country: 'DE',
      },
    },
  });
  const { handleSubmit, watch } = methods;
  const [estimateOrderCosts] = useMutation(CALCULATE_MUTATION);
  const [checkout] = useMutation(CHECKOUT_MUTATION);
  const [createPaymentIntent] = useMutation(PAYMENT_INTENT_MUTATION);
  const { emptyCart, items } = useCart();
  const { separateBilling } = watch();
  const {
    allowPayment,
    checkoutPayment,
    checkoutError,
    checkoutProcessing,
    checkoutSuccess,
    orderTotal,
    updateShipping,
    updateTax,
  } = useContext(CheckoutContext);
  const stripe = useStripe();
  const elements = useElements();

  const useSeparateBilling = !!separateBilling;

  const handleCheckoutError = ({
    message = 'Unable to process order. Please try again',
  }) => {
    checkoutError({ message });

    toast.error(message, {
      className: 'bg-red',
    });
  };

  const handleCheckoutSuccess = orderId => {
    checkoutSuccess();

    emptyCart();

    navigate('success', { state: { orderId } });
  };

  const calculateOrderCosts = async values => {
    checkoutProcessing();

    try {
      const input = {
        shippingAddress: values.shipping,
        items: items.map(({ id: variantId, description, image, ...rest }) => ({
          variantId,
          ...rest,
        })),
      };

      const {
        data: {
          estimateOrderCosts: { shippingRate, taxRate, vatRate },
        },
      } = await estimateOrderCosts({ variables: { input } });

      updateShipping(Math.round(shippingRate * 100));
      updateTax(Math.round(taxRate + vatRate * 100));

      checkoutPayment();
    } catch (err) {
      handleCheckoutError(err);
    }
  };

  const submitOrder = async values => {
    checkoutProcessing();

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
        total: orderTotal,
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
            description: `SWAG store Printful order ${printfulOrderId}`,
            email,
            metadata: { graphCMSOrderId, printfulOrderId },
            total: orderTotal,
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
      <form
        onSubmit={handleSubmit(
          allowPayment ? submitOrder : calculateOrderCosts
        )}
      >
        <ShippingForm />
        {useSeparateBilling && <BillingForm />}
        <PaymentForm />
      </form>
    </FormContext>
  );
}

export default CheckoutForm;
