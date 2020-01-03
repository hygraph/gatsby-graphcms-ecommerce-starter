# gatsby-graphcms-ecommerce-starter

> Minimalist dropshipping swag store built with GraphCMS, Stripe, Gatsby, Postmark and Printful.

## The stack

Why settle for monolithic ecommerce platforms when you can make the most of the best APIs to build what you want. In this example we use a variety of services to perform your typical ecommerce tasks. #DIYCommerce

- **[GraphCMS]()**: Localised product content, reviews, and order management.
- **[Stripe]()**: Used to securely process payments and Strong Customer Authentication.
- **[Gatsby]()**: Statically build product pages and handle cart/checkout logic.
- **[Postmark]()**: Deliver order received and dispatched email notifications to customers.
- **[Printful]()**: Drop ship product inventory dynamically.

--- DIAGRAM ---

## How it works

... Describe how the overall architecture works and outputs a functioning ecommerce store.

## How to use

If you wish to extend and work with this example locally, follow the instructions below.

If you'd rather check out a [demo]() or deploy to your own Netlify, you can do that too.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/graphcms/gatsby-graphcms-ecommerce-starter)

### 1. Download and install dependencies

```
git clone --single-branch git@github.com:graphcms/gatsby-graphcms-ecommerce-starter.git
cd gatsby-graphcms-ecommerce-starter
yarn # npm install
cp .env.sample .env
```

### 2. Setup development environment variables

You'll need an account with GraphCMS, Stripe and Printful for this demo to fully work. It's recommended you use separate API keys for development and production.

Add the necessary variables to `.env`.

### 3. (optional): Configure Stripe/Printful webhooks

... Configure hooks... Configure ngrok for local testing...

### 4. Run locally

Once all dependencies and environment variables are satisfied, you can run Gatsby locally to build in development:

```dosini
yarn dev
```

## Contributing

## Support
