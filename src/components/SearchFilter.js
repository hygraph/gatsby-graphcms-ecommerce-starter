import React from 'react';
import {
  SearchBox,
  RefinementList,
  ToggleRefinement,
} from 'react-instantsearch-dom';

const SearchFilter = () => (
  <React.Fragment>
    <div className="mb-6">
      <SearchBox />
    </div>

    <div className="mb-6">
      <h3 className="block text-sm font-bold tracking-widest uppercase mb-2 text-slategray">
        Category
      </h3>
      <RefinementList attribute="category" />
    </div>

    <div className="mb-6">
      <h3 className="block text-sm font-bold tracking-widest uppercase mb-2 text-slategray">
        Collection
      </h3>
      <RefinementList attribute="collections" />
    </div>

    <div className="mb-6">
      <h3 className="block text-sm font-bold tracking-widest uppercase mb-2 text-slategray">
        Misc
      </h3>

      <ToggleRefinement
        attribute="hasReviews"
        label="Has reviews"
        value={true}
      />
    </div>
  </React.Fragment>
);

export default SearchFilter;
