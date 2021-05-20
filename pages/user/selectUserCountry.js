import { useState } from "react";
import { Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import CustomSearchBox from "../../components/customSearchBox";
import { connectHits } from "react-instantsearch-dom";
import PropTypes from "prop-types";
import { classNames } from "../helpers/joinClasses";

const UserCountries = ({ hits, handleChange, values, setOpenCountry }) => {
  return (
    <div className="relative">
      <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
        {hits.map((hit) => (
          <li
            onClick={(event) => {
              handleChange(event, hit.country_name);
              setOpenCountry(false);
            }}
            key={hit.objectID}
            className={classNames(
              values.address.country === hit.country_name
                ? "text-gray-900"
                : "text-gray-500",
              "cursor-default select-none relative py-2 pl-3 pr-9"
            )}
          >
            <span
              className={classNames(
                values.address.country === hit.country_name
                  ? "font-semibold"
                  : "font-normal",
                "block truncate"
              )}
            >
              {hit.country_name}
            </span>

            {values.address.country === hit.country_name ? (
              <span className="text-blue-500 absolute inset-y-0 right-0 flex items-center pr-4">
                <CheckIcon className="h-5 w-5" aria-hidden="true" />
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

const CustomUserCountries = connectHits(UserCountries);

const SelectUserCountry = ({ values, handleChange }) => {
  const [openCountry, setOpenCountry] = useState(false);

  return (
    <div className="mt-1 relative">
      <button
        type="button"
        onClick={() => setOpenCountry(!openCountry)}
        className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <span className="block truncate">
          {values && values.address ? values.address.country : "Estados Unidos"}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </button>

      <Transition
        show={openCountry}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {/* here custom hits */}
        <CustomSearchBox defaultRefinement="" />
        <CustomUserCountries
          handleChange={handleChange}
          values={values}
          setOpenCountry={setOpenCountry}
        />
      </Transition>
    </div>
  );
};

export default SelectUserCountry;

UserCountries.propTypes = {
  hit: PropTypes.object,
};
