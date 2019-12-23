import React from 'react';
import { graphql, useStaticQuery, withPrefix } from 'gatsby';
import { Helmet } from 'react-helmet';

function SEO({ children, pageDescription, pageTitle, pageUrl, image }) {
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
        {image && <meta property="og:image" content={withPrefix(image)} />}

        <meta
          property="twitter:title"
          content={`${pageTitle || siteDescription} | ${siteTitle}`}
        />
        <meta
          property="twitter:card"
          content={image ? 'summary_large_media' : 'summary'}
        />
        {image && <meta property="twitter:image" content={withPrefix(image)} />}
      </Helmet>
      {children}
    </React.Fragment>
  );
}

export default SEO;
