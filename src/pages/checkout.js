import React from 'react';
import useForm from 'react-hook-form';
import { useMutation } from 'graphql-hooks';

const CHECKOUT_MUTATION = `
  mutation checkout($name: String!, $email: String!, $total: Int!) {
    id
    name
    email
    total
  }
`;

function CheckoutPage() {
  const [checkout] = useMutation(CHECKOUT_MUTATION);
  const { handleSubmit, register } = useForm();

  const onSubmit = async values => {
    console.log(values);

    const name = 'Test User';
    const email = 'jamie@graphcms.com';
    const total = 1000;

    // run mutation
    await checkout({ variables: { name, email, total } });
  };

  return (
    <div className="md:flex -mx-3">
      <div className="md:w-2/3 px-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded bg-white border-2 border-slategray p-3 md:p-6 pb-0 md:pb-0 my-3 md:my-6">
            <h3 className="text-slategray text-2xl md:text-4xl font-bold mb-6">
              Contact information
            </h3>

            <div className="md:flex -mx-3">
              <div className="md:w-1/2 mb-3 md:mb-6 px-3">
                <input
                  name="email"
                  type="email"
                  className="appearance-none bg-white border-2 border-slategray px-4 py-3 pr-8 focus:outline-none focus:border-primary focus:bg-white text-slategray focus:outline-none w-full rounded"
                  placeholder="Email address"
                  ref={register({ required: true })}
                />
              </div>

              <div className="md:w-1/2 mb-3 md:mb-6 px-3">
                <input
                  name="tel"
                  type="tel"
                  className="appearance-none bg-white border-2 border-slategray px-4 py-3 pr-8 focus:outline-none focus:border-primary focus:bg-white text-slategray focus:outline-none w-full rounded"
                  placeholder="Phone no."
                  ref={register({ required: true })}
                />
              </div>
            </div>
          </div>

          <div className="rounded bg-white border-2 border-slategray p-3 md:p-6 my-3 md:my-6">
            <h3 className="text-slategray text-2xl md:text-4xl font-bold mb-6">
              Shipping
            </h3>

            <div className="md:flex -mx-3">
              <div className="md:w-1/2 mb-3 md:mb-6 px-3">
                <input
                  type="text"
                  className="appearance-none bg-white border-2 border-slategray px-4 py-3 pr-8 focus:outline-none focus:border-primary focus:bg-white text-slategray focus:outline-none w-full rounded"
                  placeholder="First name"
                />
              </div>

              <div className="md:w-1/2 mb-3 md:mb-6 px-3">
                <input
                  type="text"
                  className="appearance-none bg-white border-2 border-slategray px-4 py-3 pr-8 focus:outline-none focus:border-primary focus:bg-white text-slategray focus:outline-none w-full rounded"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="md:flex -mx-3">
              <div className="md:w-1/2 mb-3 md:mb-6 px-3">
                <input
                  type="text"
                  className="appearance-none bg-white border-2 border-slategray px-4 py-3 pr-8 focus:outline-none focus:border-primary focus:bg-white text-slategray focus:outline-none w-full rounded"
                  placeholder="Address"
                />
              </div>

              <div className="md:w-1/2 mb-3 md:mb-6 px-3">
                <input
                  type="text"
                  className="appearance-none bg-white border-2 border-slategray px-4 py-3 pr-8 focus:outline-none focus:border-primary focus:bg-white text-slategray focus:outline-none w-full rounded"
                  placeholder="Apartment, suite, etc. (optional)"
                />
              </div>
            </div>

            <div className="mb-3 md:mb-6">
              <input
                type="text"
                className="appearance-none bg-white border-2 border-slategray px-4 py-3 pr-8 focus:outline-none focus:border-primary focus:bg-white text-slategray focus:outline-none w-full rounded"
                placeholder="City"
              />
            </div>

            <div className="md:flex -mx-3">
              <div className="md:w-1/2 mb-3 md:mb-6 px-3">
                <input
                  type="text"
                  className="appearance-none bg-white border-2 border-slategray px-4 py-3 pr-8 focus:outline-none focus:border-primary focus:bg-white text-slategray focus:outline-none w-full rounded"
                  placeholder="Country"
                />
              </div>

              <div className="md:w-1/2 mb-3 md:mb-6 px-3">
                <input
                  type="text"
                  className="appearance-none bg-white border-2 border-slategray px-4 py-3 pr-8 focus:outline-none focus:border-primary focus:bg-white text-slategray focus:outline-none w-full rounded"
                  placeholder="ZIP / Postcode"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="block">
                <input className="mr-3 leading-tight" type="checkbox" />
                <span className="text-sm">Use different billing address</span>
              </label>

              <button className="bg-primary text-white px-3 py-2 h-10 focus:outline-none font-bold">
                Continue to payment
              </button>
            </div>
          </div>

          <div className="rounded bg-white border-2 border-slategray p-3 md:p-6 my-3 md:my-6">
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
          </div>

          <div className="rounded bg-white border-2 border-slategray p-3 md:p-6 my-3 md:my-6">
            <h3 className="text-slategray text-2xl md:text-4xl font-bold mb-6">
              Billing
            </h3>

            <div className="md:flex -mx-3">
              <div className="md:w-1/2 mb-3 md:mb-6 px-3">
                <input
                  type="text"
                  className="appearance-none bg-white border-2 border-slategray px-4 py-3 pr-8 focus:outline-none focus:border-primary focus:bg-white text-slategray focus:outline-none w-full rounded"
                  placeholder="First name"
                />
              </div>

              <div className="md:w-1/2 mb-3 md:mb-6 px-3">
                <input
                  type="text"
                  className="appearance-none bg-white border-2 border-slategray px-4 py-3 pr-8 focus:outline-none focus:border-primary focus:bg-white text-slategray focus:outline-none w-full rounded"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="md:flex -mx-3">
              <div className="md:w-1/2 mb-3 md:mb-6 px-3">
                <input
                  type="text"
                  className="appearance-none bg-white border-2 border-slategray px-4 py-3 pr-8 focus:outline-none focus:border-primary focus:bg-white text-slategray focus:outline-none w-full rounded"
                  placeholder="Address"
                />
              </div>

              <div className="md:w-1/2 mb-3 md:mb-6 px-3">
                <input
                  type="text"
                  className="appearance-none bg-white border-2 border-slategray px-4 py-3 pr-8 focus:outline-none focus:border-primary focus:bg-white text-slategray focus:outline-none w-full rounded"
                  placeholder="Apartment, suite, etc. (optional)"
                />
              </div>
            </div>

            <div className="mb-3 md:mb-6">
              <input
                type="text"
                className="appearance-none bg-white border-2 border-slategray px-4 py-3 pr-8 focus:outline-none focus:border-primary focus:bg-white text-slategray focus:outline-none w-full rounded"
                placeholder="City"
              />
            </div>

            <div className="md:flex -mx-3">
              <div className="md:w-1/2 mb-3 md:mb-6 px-3">
                <input
                  type="text"
                  className="appearance-none bg-white border-2 border-slategray px-4 py-3 pr-8 focus:outline-none focus:border-primary focus:bg-white text-slategray focus:outline-none w-full rounded"
                  placeholder="Country"
                />
              </div>

              <div className="md:w-1/2 mb-3 md:mb-6 px-3">
                <input
                  type="text"
                  className="appearance-none bg-white border-2 border-slategray px-4 py-3 pr-8 focus:outline-none focus:border-primary focus:bg-white text-slategray focus:outline-none w-full rounded"
                  placeholder="ZIP / Postcode"
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button className="bg-primary text-white px-3 py-2 h-10 focus:outline-none font-bold">
                Continue to payment
              </button>
            </div>
          </div>

          <div className="rounded bg-white border-2 border-slategray p-3 md:p-6 my-3 md:my-6">
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
        </form>
      </div>

      <div className="md:w-1/3 px-3">Cart summary</div>
    </div>
  );
}

export default CheckoutPage;
