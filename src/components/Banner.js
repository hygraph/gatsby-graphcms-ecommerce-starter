import React from 'react';

function Banner() {
  return (
    <a
      className="bg-primary flex px-6 py-2"
      href="https://graphcms.com/blog/delivering-a-diy-store-powered-by-a-headless-cms-for-ecommerce/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <p className="text-sm text-white">
        Learn more about the tools and services powering this store &#8594;
      </p>
    </a>
  );
}

export default Banner;
