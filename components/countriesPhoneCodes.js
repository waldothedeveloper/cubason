import React, { Fragment } from "react";
import { Transition } from "@headlessui/react";
import CustomSearchBox from "./customSearchBox";
import { CustomHits } from "./hitResults";

const CountriesPhoneCodes = ({
  setPhonePrefix,
  isOpen,
  setIsOpen,
  setValues,
}) => {
  //
  return (
    <Transition
      as={Fragment}
      show={isOpen}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div
        className="origin-top-right absolute left-0 mt-2 w-72 rounded-md shadow-lg bg-gray-50 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <CustomSearchBox defaultRefinement="" />
        {/* HITS */}
        <div className="max-h-36 overflow-y-scroll overflow-x-hidden">
          <CustomHits
            setPhonePrefix={setPhonePrefix}
            setIsOpen={setIsOpen}
            setValues={setValues}
          />
        </div>
      </div>
    </Transition>
  );
};

export default CountriesPhoneCodes;
