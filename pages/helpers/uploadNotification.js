import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { useUploadPicture } from "../../context/useProvidePicture";

const UploadNotification = () => {
  const { fileInfo, progress, show, setShow } = useUploadPicture();

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="z-50 fixed inset-0 flex px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div
                className="bg-blue-500 bg-opacity-80"
                style={{ width: `${progress}%` }}
              >
                <div className="p-4">
                  <div className="flex items-center">
                    <div className="w-0 flex-1 flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-auto w-5 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="flex flex-col justify-center">
                        <p className="pl-2 text-sm font-medium text-gray-50 w-56 truncate">
                          {fileInfo.name ? fileInfo.name : ""}
                        </p>
                        <p className="pl-2 text-xs pt-1 text-gray-200 font-medium">
                          {fileInfo.size ? fileInfo.size : ""}
                        </p>
                      </div>
                      {/* <button className="ml-3 flex-shrink-0 rounded-md text-sm font-medium text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Cancelar
                      </button> */}
                    </div>

                    <div className="ml-4 flex-shrink-0 flex">
                      <button
                        className="rounded-md inline-flex text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        onClick={() => {
                          setShow(false);
                        }}
                      >
                        <span className="sr-only">Close</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};
export default UploadNotification;
