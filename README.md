# gatsby-graphcms-ecommerce-starter

> Minimalist dropshipping swag store built with GraphCMS, Stripe, Gatsby, Postmark and Printful.

[Read more](https://graphcms.com/blog/delivering-a-diy-store-powered-by-a-headless-cms-for-ecommerce/)

## The stack

Why settle for monolithic ecommerce platforms when you can make the most of the best APIs to build what you want. In this example we use a variety of services to perform your typical ecommerce tasks. #DIYCommerce

- **[GraphCMS](https://graphcms.com)**: Localised product content, reviews, and order management.
- **[Stripe](https://stripe.com)**: Used to securely process payments and Strong Customer Authentication.
- **[Gatsby](https://gatsbyjs.org)**: Statically build product pages and handle cart/checkout logic.
- **[Postmark](https://postmarkapp.com)**: Deliver order received and dispatched email notifications to customers.
- **[Printful](https://printful.com)**: Create inventory and drop ship with ease.

## How it works

1. Gatsby will source products from Printful, and together with GraphCMS, Gatsby will enrich the product nodes. This means we can use Printful for inventory and GraphCMS for presentation data.

2. The "Add to Cart" function is handled client side, this is typically where you might reach to implement your own commerce API if you want to perform sophisticated logic around item taxes and handling discount codes.

3. The checkout is handled by a custom GraphQL server which creates an order with Printful, handles 3D Secure 2 payments with Stripe and sends the order details onto GraphCMS.

4. Orders are then automatically fulfilled with Printful once a payment is received, and in return updates GraphCMS via a webhook to set the order to fulfilled.

⚠️ You must have a payment method registered with Printful for orders to be fulfilled automatically. You will be charged for Printful orders once they are created via the API, it's your responsibility to capture payments/manage payouts any funds from the customer via Stripe.

## How to use

If you wish to extend and work with this example locally, follow the instructions below.

If you'd rather check out a [demo](https://gatsby-graphcms-ecommerce-starter.netlify.com) or deploy to your own Netlify, you can do that too.

First, you will need accounts at GraphCMS, Stripe, Gatsby, Postmark and Printful.

### 1. Download and install dependencies

```bash
git clone git@github.com:graphcms/gatsby-graphcms-ecommerce-starter.git
cd gatsby-graphcms-ecommerce-starter
yarn # npm install
cp .env.sample .env
```

### 2. Setup development environment variables

You will need to [create a project from template](https://docs.graphcms.com/docs/getting-started/start-from-scratch#start-from-template) inside GraphCMS to carefully match what is expected from GraphCMS.

You'll need an account with GraphCMS, Stripe and Printful for this demo to fully work. It's recommended you use separate API keys for development and production.

Add the necessary variables to `.env`.

### 3. (optional): Configure Stripe/Printful webhooks

More details coming soon

### 4. Run locally

Once all dependencies and environment variables are satisfied, you can run Gatsby locally to build in development:

```bash
yarn dev
```
