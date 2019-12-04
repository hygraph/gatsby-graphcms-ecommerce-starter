import React from 'react';

function CheckoutPage() {
  return (
    <div>
      <div className="md:w-2/3">
        <div className="bg-white border border-gainsboro p-3 md:p-6 pb-0 md:pb-0 my-3 md:my-6">
          <h3 className="text-slategray text-2xl md:text-4xl font-bold mb-6">
            Contact information
          </h3>

          <div className="md:flex -mx-3">
            <div className="md:w-1/2 mb-3 md:mb-6 px-3">
              <input
                type="email"
                className="appearance-none border border-lightgray px-3 py-2 h-10 bg-white focus:outline-none w-full"
                placeholder="Email address"
              />
            </div>

            <div className="md:w-1/2 mb-3 md:mb-6 px-3">
              <input
                type="tel"
                className="appearance-none border border-lightgray px-3 py-2 h-10 bg-white focus:outline-none w-full"
                placeholder="Phone no."
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gainsboro p-3 md:p-6 my-3 md:my-6">
          <h3 className="text-slategray text-2xl md:text-4xl font-bold mb-6">
            Shipping
          </h3>

          <div className="md:flex -mx-3">
            <div className="md:w-1/2 mb-3 md:mb-6 px-3">
              <input
                type="text"
                className="appearance-none border border-lightgray px-3 py-2 h-10 bg-white focus:outline-none w-full"
                placeholder="First name"
              />
            </div>

            <div className="md:w-1/2 mb-3 md:mb-6 px-3">
              <input
                type="text"
                className="appearance-none border border-lightgray px-3 py-2 h-10 bg-white focus:outline-none w-full"
                placeholder="Last name"
              />
            </div>
          </div>

          <div className="md:flex -mx-3">
            <div className="md:w-1/2 mb-3 md:mb-6 px-3">
              <input
                type="text"
                className="appearance-none border border-lightgray px-3 py-2 h-10 bg-white focus:outline-none w-full"
                placeholder="Address"
              />
            </div>

            <div className="md:w-1/2 mb-3 md:mb-6 px-3">
              <input
                type="text"
                className="appearance-none border border-lightgray px-3 py-2 h-10 bg-white focus:outline-none w-full"
                placeholder="Apartment, suite, etc. (optional)"
              />
            </div>
          </div>

          <div className="mb-3 md:mb-6">
            <input
              type="text"
              className="appearance-none border border-lightgray px-3 py-2 h-10 bg-white focus:outline-none w-full"
              placeholder="City"
            />
          </div>

          <div className="md:flex -mx-3">
            <div className="md:w-1/2 mb-3 md:mb-6 px-3">
              <input
                type="text"
                className="appearance-none border border-lightgray px-3 py-2 h-10 bg-white focus:outline-none w-full"
                placeholder="Country"
              />
            </div>

            <div className="md:w-1/2 mb-3 md:mb-6 px-3">
              <input
                type="text"
                className="appearance-none border border-lightgray px-3 py-2 h-10 bg-white focus:outline-none w-full"
                placeholder="ZIP / Postcode"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label class="block">
              <input class="mr-3 leading-tight" type="checkbox" />
              <span class="text-sm">Use different billing address</span>
            </label>

            <button className="bg-primary text-white px-3 py-2 h-10 focus:outline-none font-bold">
              Continue to payment
            </button>
          </div>
        </div>

        <div className="bg-white border border-gainsboro p-3 md:p-6 my-3 md:my-6">
          <div className="flex items-start justify-between">
            <h3 className="text-slategray text-2xl md:text-4xl font-bold mb-6">
              Ship to
            </h3>

            <button className="appearance-none text-primary focus:outline-none">
              Edit
            </button>
          </div>

          <p>Jamie Barton</p>
          <p>123 Address Street, Line 2, Washington, United States, 12345</p>
        </div>

        <div className="bg-white border border-gainsboro p-3 md:p-6 my-3 md:my-6">
          <h3 className="text-slategray text-2xl md:text-4xl font-bold mb-6">
            Billing
          </h3>

          <div className="md:flex -mx-3">
            <div className="md:w-1/2 mb-3 md:mb-6 px-3">
              <input
                type="text"
                className="appearance-none border border-lightgray px-3 py-2 h-10 bg-white focus:outline-none w-full"
                placeholder="First name"
              />
            </div>

            <div className="md:w-1/2 mb-3 md:mb-6 px-3">
              <input
                type="text"
                className="appearance-none border border-lightgray px-3 py-2 h-10 bg-white focus:outline-none w-full"
                placeholder="Last name"
              />
            </div>
          </div>

          <div className="md:flex -mx-3">
            <div className="md:w-1/2 mb-3 md:mb-6 px-3">
              <input
                type="text"
                className="appearance-none border border-lightgray px-3 py-2 h-10 bg-white focus:outline-none w-full"
                placeholder="Address"
              />
            </div>

            <div className="md:w-1/2 mb-3 md:mb-6 px-3">
              <input
                type="text"
                className="appearance-none border border-lightgray px-3 py-2 h-10 bg-white focus:outline-none w-full"
                placeholder="Apartment, suite, etc. (optional)"
              />
            </div>
          </div>

          <div className="mb-3 md:mb-6">
            <input
              type="text"
              className="appearance-none border border-lightgray px-3 py-2 h-10 bg-white focus:outline-none w-full"
              placeholder="City"
            />
          </div>

          <div className="md:flex -mx-3">
            <div className="md:w-1/2 mb-3 md:mb-6 px-3">
              <input
                type="text"
                className="appearance-none border border-lightgray px-3 py-2 h-10 bg-white focus:outline-none w-full"
                placeholder="Country"
              />
            </div>

            <div className="md:w-1/2 mb-3 md:mb-6 px-3">
              <input
                type="text"
                className="appearance-none border border-lightgray px-3 py-2 h-10 bg-white focus:outline-none w-full"
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

        <div className="bg-white border border-gainsboro p-3 md:p-6 my-3 md:my-6">
          <div className="flex items-start justify-between">
            <h3 className="text-slategray text-2xl md:text-4xl font-bold mb-6">
              Bill to
            </h3>

            <button className="appearance-none text-primary focus:outline-none">
              Edit
            </button>
          </div>

          <p>Jamie Barton</p>
          <p>123 Address Street, Line 2, Washington, United States, 12345</p>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
