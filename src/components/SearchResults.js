import React from 'react';
import { Hits } from 'react-instantsearch-dom';

import SearchFilter from './SearchFilter';

const SearchResults = () => (
  <div className="flex flex-wrap -mx-6">
    <aside className="w-full md:w-1/4 px-6">
      <SearchFilter />
    </aside>

    <main className="w-full md:w-3/4 flex flex-wrap px-6">
      <Hits hitComponent={hit => <pre>{JSON.stringify(hit, null, 2)}</pre>} />
    </main>
  </div>
);

export default SearchResults;
