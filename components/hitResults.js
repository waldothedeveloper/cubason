import React from "react";
import PropTypes from "prop-types";
import { connectHits } from "react-instantsearch-dom";

const HitResults = ({ hits, setPhonePrefix, setIsOpen, setValues }) => {
  return hits.map((hit) => (
    <button
      onClick={() => {
        setPhonePrefix(hit);
        setIsOpen(false);
        setValues({});
      }}
      key={hit.objectID}
      className="w-full text-gray-900 flex cursor-default select-none relative py-2 pl-3 pr-9 group hover:bg-blue-500 transition-colors duration-300 ease-in-out"
      id="listbox-option-0"
      role="option"
    >
      <span className="font-normal whitespace-nowrap group-hover:text-blue-50 transition-colors duration-300 ease-in-out">
        {hit.country_name}
      </span>

      <span className="text-gray-500 ml-5 group-hover:text-blue-100 transition-colors duration-300 ease-in-out">
        +{hit.phone_code}
      </span>
    </button>
  ));
};

export const CustomHits = connectHits(HitResults);

// ...
HitResults.propTypes = {
  hit: PropTypes.object,
};
