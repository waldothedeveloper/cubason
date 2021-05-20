import { Fragment } from "react";
import { Transition } from "@headlessui/react";

const Loader = () => {
  return (
    <Transition
      as={Fragment}
      show={true}
      enter="transition ease-out duration-100"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div className="min-h-screen overflow-y-hidden flex items-center justify-center">
        <svg
          className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span className="animate-pulse text-transparent text-lg bg-gradient-to-r from-blue-400 via-red-500 to-pink-500 bg-clip-text">
          Procesando...
        </span>
      </div>
    </Transition>
  );
};

export default Loader;
