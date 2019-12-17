import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';

function SEO({ children, pageDescription, pageTitle, pageUrl }) {
  const {
    site: {
      siteMetadata: { description: siteDescription, siteUrl, title: siteTitle },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          description
          siteUrl
          title
        }
      }
    }
  `);

  return (
    <React.Fragment>
      <Helmet
        defaultTitle={siteTitle}
        htmlAttributes={{ lang: 'en' }}
        titleTemplate={`%s | ${siteTitle}`}
      >
        <title>{pageTitle || siteDescription}</title>
        <meta name="description" content={pageDescription || siteDescription} />

        <meta property="og:url" content={pageUrl || siteUrl} />
        <meta
          property="og:description"
          content={pageDescription || siteDescription}
        />
        <meta
          property="og:title"
          content={`${pageTitle || siteDescription} | ${siteTitle}`}
        />
      </Helmet>
      {children}
    </React.Fragment>
  );
}

export default SEO;
