import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';

import SEO from '../components/SEO';
import SearchResults from '../components/SearchResults';

const client = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_API_KEY
);

function SearchPage() {
  return (
    <InstantSearch
      searchClient={client}
      indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
    >
      <SEO pageTitle="Search" />
      <div className="mb-6">
        <h1 className="font-bold text-3xl md:text-6xl mb-3 text-primary">
          Search
        </h1>

        <hr className="border-b border-gainsboro w-10" />
      </div>

      <SearchResults />
    </InstantSearch>
  );
}

export default SearchPage;
