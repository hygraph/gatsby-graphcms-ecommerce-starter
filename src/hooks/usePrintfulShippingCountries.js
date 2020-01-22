import { graphql, useStaticQuery } from 'gatsby';

function usePrintfulShippingCountries() {
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

  return { shippingCountries };
}

export default usePrintfulShippingCountries;
