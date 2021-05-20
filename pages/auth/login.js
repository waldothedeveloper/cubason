import { Transition } from "@headlessui/react";
import { Fragment } from "react";
import CountriesPhoneCodes from "../../components/countriesPhoneCodes";
import { useLogin } from "../../components/authHooks/useLogin";
import Captcha from "../captcha";
import GlobalErrorNotifications from "../helpers/globalErrorNotifications";
import { useGlobalError } from "../../context/useGlobalErrorNotification";
//
const Login = () => {
  const {
    values,
    setValues,
    handleChange,
    handleSubmit,
    isOpen,
    setIsOpen,
    phonePrefix,
    setPhonePrefix,
    errors,
    twilioData,
    setCaptcha,
    captcha,
  } = useLogin();

  const { show, message } = useGlobalError();

  //
  return (
    <>
      <div className="min-h-screen bg-white flex flex-col sm:px-6 lg:px-8">
        <img
          className="my-6 px-12 h-52 w-auto"
          src="/instagram_post.svg"
          alt="sign up image"
        />
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-12 text-center text-3xl font-extrabold text-gray-800 px-4">
            Hola, cual es tu telefono?
          </h2>
        </div>
        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="py-8 px-4 sm:rounded-lg sm:px-10">
            <form className="space-y-12" onSubmit={handleSubmit}>
              <div>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <label htmlFor="country" className="sr-only">
                      Phone Number
                    </label>
                    <div>
                      <button
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className="inline-flex justify-center items-center text-sm font-medium focus:outline-none h-full px-4 py-2 border-transparent bg-transparent sm:text-sm rounded-md"
                        id="options-menu"
                        aria-expanded="true"
                        aria-haspopup="true"
                      >
                        <span className="text-gray-600 text-sm">
                          {phonePrefix && phonePrefix.ISO2}
                        </span>

                        {isOpen ? (
                          <Transition
                            as={Fragment}
                            show={isOpen}
                            enter="transition ease-out duration-100"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                          >
                            <svg
                              className="-mr-1 ml-1 h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </Transition>
                        ) : (
                          <Transition
                            as={Fragment}
                            show={!isOpen}
                            enter="transition ease-out duration-100"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                          >
                            <svg
                              className="-mr-1 ml-1 h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </Transition>
                        )}
                      </button>
                      <CountriesPhoneCodes
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        setValues={setValues}
                        setPhonePrefix={setPhonePrefix}
                      />
                    </div>
                  </div>
                  <input
                    className={
                      errors === null
                        ? "shadow-lg focus:ring-gray-500 focus:border-gray-500 block w-full pl-16 py-3 sm:text-sm border-gray-300 rounded-md text-gray-700"
                        : errors.phone ||
                          (twilioData.data && twilioData.data.code)
                        ? "shadow-lg focus:ring-red-500 focus:border-red-500 block w-full pl-16 py-3 sm:text-sm border-red-400 rounded-md text-red-500"
                        : "shadow-lg focus:ring-green-500 focus:border-green-500 block w-full pl-16 py-3 sm:text-sm border-green-300 rounded-md text-green-700"
                    }
                    id="phone"
                    name="phone"
                    type="tel"
                    value={
                      values.phone
                        ? values.phone
                        : `+${phonePrefix && phonePrefix.phone_code}`
                    }
                    onChange={handleChange}
                    placeholder="telefono"
                    autoComplete="phone"
                  />
                </div>
                <p className="mt-2 text-sm text-red-600">
                  {errors !== null && errors.phone
                    ? errors.phone
                    : twilioData.data && twilioData.data.code
                    ? "El numero de telefono no existe."
                    : ""}
                </p>
              </div>
              {/* !  DO NOT DELETE GOOGLE RECAPTCHA */}
              <div>
                <Captcha setCaptcha={setCaptcha} />
                {/* <p className="mt-1 text-sm text-red-600 text-right">
                {errors.captchaValidation || ""}
              </p> */}
              </div>

              <div className="flex flex-col items-center justify-center">
                <button
                  disabled={
                    errors === null
                      ? true
                      : errors !== null && errors.phone
                      ? true
                      : twilioData.data && twilioData.data.code
                      ? true
                      : !captcha
                      ? true
                      : false
                  }
                  id="sign-in-button"
                  type="submit"
                  className={
                    errors === null
                      ? "transition-all duration-500 mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-300 focus:outline-none shadow-2xl"
                      : errors.phone ||
                        (twilioData.data && twilioData.data.code)
                      ? "mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-300 focus:outline-none shadow-2xl"
                      : !captcha
                      ? "transition-all duration-500 mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-300 focus:outline-none shadow-2xl"
                      : "transition-all duration-500 mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-500 focus:outline-none shadow-2xl"
                  }
                >
                  <svg
                    className="text-white w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <span
                  className={
                    errors === null
                      ? "mt-2 text-gray-300 font-semibold text-lg"
                      : errors.phone
                      ? "mt-2 text-gray-300 font-semibold text-lg"
                      : twilioData.data && twilioData.data.code
                      ? "mt-2 text-gray-300 font-semibold text-lg"
                      : !captcha
                      ? "mt-2 text-gray-300 font-semibold text-lg"
                      : "transition-all duration-500 mt-2 text-green-500 font-semibold text-lg"
                  }
                >
                  Continuar
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <GlobalErrorNotifications show={show} message={message} />
    </>
  );
};

export default Login;
