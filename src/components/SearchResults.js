import React from 'react';
import { Hits } from 'react-instantsearch-dom';

import SearchFilter from './SearchFilter';
import SearchHit from './SearchHit';

const SearchResults = () => (
  <div className="flex flex-wrap -mx-6">
    <aside className="w-full md:w-1/4 px-6">
      <SearchFilter />
    </aside>

    <main className="w-full md:w-3/4 flex flex-wrap px-6">
      <Hits hitComponent={SearchHit} />
    </main>
  </div>
);

export default SearchResults;
