import { Transition } from "@headlessui/react";
import React from "react";
import { usePicture } from "../../components/userHooks/usePicture";

//
const SlideOverOnboarding = ({
  errors,
  slideOver,
  setSlideOver,
  submitUserInfoSteps,
  handleCancelSteps,
  userInfoSteps,
  handleUserInfoSteps,
}) => {
  // ! Handle File Upload
  const uploadFileRef = React.createRef();

  const { handleFiles, picErrors, setPicErrors } = usePicture();

  //
  return userInfoSteps.step1.completed ? (
    <>
      <section
        className={
          slideOver
            ? "transition ease-out duration-1000 fixed inset-0 overflow-hidden bg-gray-100"
            : "transition ease-out duration-1000 hidden"
        }
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* Background overlay, show/hide based on slide-over state. */}
          <div
            className={slideOver ? "absolute inset-0" : "hidden"}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition
              show={slideOver}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
              className="w-screen max-w-md"
              role="dialog"
              aria-modal="true"
            >
              <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                <div className="py-6 px-4 bg-blue-700 sm:px-6">
                  <div className="flex items-center justify-between">
                    <h2
                      className="text-lg font-medium text-white"
                      id="slide-over-title"
                    >
                      {userInfoSteps.step2.panelTitle}
                    </h2>
                    <div className="ml-3 h-7 flex items-center">
                      <button
                        onClick={() => setSlideOver(false)}
                        className="bg-blue-700 rounded-md text-blue-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        <span className="sr-only">Close panel</span>
                        {/* Heroicon name: outline/x */}
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mt-1">
                    <p className="text-sm text-blue-300">
                      {userInfoSteps.step2.panelText}
                    </p>
                  </div>
                </div>
                <div className="relative flex-1 py-6 px-4 sm:px-6">
                  {/* Replace with your content */}
                  <div className="px-4 py-5 sm:p-6 max-w-xs mx-auto">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                      <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={submitUserInfoSteps}>
                          <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="first_name"
                                className={
                                  errors.email
                                    ? "block text-sm font-medium text-red-700"
                                    : "block text-sm font-medium text-gray-700"
                                }
                              >
                                Correo electronico
                              </label>
                              <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                  onChange={handleUserInfoSteps}
                                  value={userInfoSteps.step2.email || ""}
                                  type="text"
                                  name="email"
                                  placeholder="juan@ejemplo.com"
                                  id="email"
                                  autoComplete="email"
                                  className={
                                    errors.email
                                      ? "mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm text-sm border-red-300 rounded-md"
                                      : "mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm text-sm border-gray-300 rounded-md"
                                  }
                                />
                                {errors.email && (
                                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    {/* Heroicon name: solid/exclamation-circle */}
                                    <svg
                                      className="h-5 w-5 text-red-500"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                )}
                              </div>

                              <p
                                className="mt-2 text-sm text-red-600"
                                id="email-error"
                              >
                                {errors.email || ""}
                              </p>
                            </div>
                          </div>
                          <div className="py-5 flex justify-end">
                            <button
                              onClick={() => {
                                setPicErrors({});
                                handleCancelSteps();
                              }}
                              type="button"
                              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Cancelar
                            </button>
                            <button
                              type="submit"
                              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Continuar
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </section>
    </>
  ) : (
    <>
      <section
        className={
          slideOver
            ? "transition ease-out duration-1000 fixed inset-0 overflow-hidden bg-gray-100"
            : "transition ease-out duration-1000 hidden"
        }
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* Background overlay, show/hide based on slide-over state. */}
          <div
            className={slideOver ? "absolute inset-0" : "hidden"}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition
              show={slideOver}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
              className="w-screen max-w-md"
              role="dialog"
              aria-modal="true"
            >
              <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                <div className="py-6 px-4 bg-blue-700 sm:px-6">
                  <div className="flex items-center justify-between">
                    <h2
                      className="text-lg font-medium text-white"
                      id="slide-over-title"
                    >
                      {userInfoSteps.step1.panelTitle}
                    </h2>
                    <div className="ml-3 h-7 flex items-center">
                      <button
                        onClick={() => setSlideOver(false)}
                        className="bg-blue-700 rounded-md text-blue-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        <span className="sr-only">Close panel</span>
                        {/* Heroicon name: outline/x */}
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mt-1">
                    <p className="text-sm text-blue-300">
                      {userInfoSteps.step1.panelText}
                    </p>
                  </div>
                </div>
                <div className="relative flex-1 py-2 px-4 sm:px-6">
                  <div className="px-4 py-5 sm:p-6 max-w-xs mx-auto">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                      <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={submitUserInfoSteps}>
                          <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="first_name"
                                className={
                                  errors.first_name
                                    ? "block text-sm font-medium text-red-700"
                                    : "block text-sm font-medium text-gray-700"
                                }
                              >
                                Nombre&#x00028;s&#x00029;
                              </label>
                              <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                  onChange={handleUserInfoSteps}
                                  value={userInfoSteps.step1.first_name || ""}
                                  type="text"
                                  name="first_name"
                                  id="first_name"
                                  autoComplete="given-name"
                                  className={
                                    errors.first_name
                                      ? "mt-1 focus:ring-blue-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md"
                                      : "mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  }
                                />
                                {errors.first_name && (
                                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    {/* <!-- Heroicon name: solid/exclamation-circle --> */}
                                    <svg
                                      className="h-5 w-5 text-red-500"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <p
                                className="mt-2 text-sm text-red-600"
                                id="email-error"
                              >
                                {errors.first_name || ""}
                              </p>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="last_name"
                                className={
                                  errors.last_name
                                    ? "block text-sm font-medium text-red-700"
                                    : "block text-sm font-medium text-gray-700"
                                }
                              >
                                Apellido&#x00028;s&#x00029;
                              </label>
                              <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                  onChange={handleUserInfoSteps}
                                  value={userInfoSteps.step1.last_name || ""}
                                  type="text"
                                  name="last_name"
                                  id="last_name"
                                  autoComplete="lastname"
                                  className={
                                    errors.last_name
                                      ? "mt-1 focus:ring-blue-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md"
                                      : "mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  }
                                />
                                {errors.last_name && (
                                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    {/* <!-- Heroicon name: solid/exclamation-circle --> */}
                                    <svg
                                      className="h-5 w-5 text-red-500"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <p
                                className="mt-2 text-sm text-red-600"
                                id="email-error"
                              >
                                {errors.last_name || ""}
                              </p>
                            </div>
                            {/* upload user picture OPTIONAL */}
                            <div className="col-span-6">
                              {picErrors.picture ? (
                                <p className="block text-sm font-medium text-red-700 mb-6">
                                  {picErrors.picture}
                                </p>
                              ) : (
                                <p className="block text-sm font-medium text-gray-700 mb-6">
                                  Sube una foto de perfil
                                </p>
                              )}
                              <div
                                className={
                                  picErrors.picture
                                    ? "flex flex-col items-center justify-center border-red-300 border-2 border-dashed p-2 bg-red-100"
                                    : "flex flex-col items-center justify-center border-gray-300 border-2 border-dashed p-2 bg-gray-100"
                                }
                              >
                                <input
                                  onClick={(event) =>
                                    (event.target.value = null)
                                  }
                                  onChange={handleFiles}
                                  id="fileInput"
                                  type="file"
                                  accept="image/*"
                                  hidden
                                  ref={uploadFileRef}
                                />
                                <button
                                  className="focus:outline-none"
                                  type="button"
                                  onClick={(e) =>
                                    uploadFileRef.current &&
                                    uploadFileRef.current.click()
                                  }
                                >
                                  <div className="py-4">
                                    <div
                                      className={
                                        picErrors.picture
                                          ? "relative p-4 bg-red-200 rounded-full"
                                          : "relative p-4 bg-gray-50 rounded-full"
                                      }
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={
                                          picErrors.picture
                                            ? "w-10 h-10 text-red-500 flex-shrink-0 mx-auto"
                                            : "w-10 h-10 text-blue-500 flex-shrink-0 mx-auto"
                                        }
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                                        <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                                      </svg>
                                    </div>
                                  </div>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="py-5 flex justify-end">
                            <button
                              onClick={() => {
                                setPicErrors({});
                                handleCancelSteps();
                              }}
                              type="button"
                              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Cancelar
                            </button>
                            <button
                              type="submit"
                              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Continuar
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </section>
    </>
  );
};

export default SlideOverOnboarding;
