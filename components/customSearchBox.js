import React from "react";
import { connectSearchBox } from "react-instantsearch-dom";

const SearchBox = ({ currentRefinement, refine }) => {
  return (
    <div className="py-1" role="none">
      <div className="group flex items-center py-2 text-sm text-gray-700 hover:text-gray-900">
        <div className="flex-1 px-2 flex justify-center lg:justify-end">
          <div className="w-full">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative text-gray-400 focus-within:text-gray-600">
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                {/* Heroicon name: solid/search */}
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                onChange={(event) => refine(event.currentTarget.value)}
                value={currentRefinement}
                id="search"
                className="block w-full bg-gray-100 focus:bg-white py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white focus:border-white sm:text-sm"
                placeholder="Buscar"
                type="search"
                name="search"
                autoFocus={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;
