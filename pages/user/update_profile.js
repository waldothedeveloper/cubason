import Link from "next/link";
import { useUpdateUserProfileForm } from "../../components/userHooks/useUpdateUserProfileForm";
import nookies from "nookies";
import { admin } from "../../config/firebaseAdmin";
// import BirthDayPicker from "../user/birthdayPicker";
import { currDate } from "../helpers/currDate";
import GlobalErrorNotifications from "../helpers/globalErrorNotifications";
import SelectUserCountry from "./selectUserCountry";

//
export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);

  try {
    const uid = await admin
      .auth()
      .verifyIdToken(cookies.token)
      .then((decodedToken) => decodedToken.uid);

    if (!uid) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }

    return { props: {} };
  } catch (error) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
}

//
const UpdateProfile = () => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    show,
    setShow,
    message,
    setMessage,
  } = useUpdateUserProfileForm();

  //
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="px-5 py-2 space-y-8 divide-y divide-gray-200"
      >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
            <div className="flex space-x-20">
              <Link href="/user/profile">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <div className="flex flex-col items-center justify-center">
                <h3 className="mb-8 text-lg leading-6 font-medium text-gray-900">
                  Datos Personales
                </h3>
                {/* image */}
                {values && values.photoURL ? (
                  <img
                    className="h-24 w-24 object-cover rounded-md shadow-xl"
                    src={values.photoURL}
                    alt="user profile picture"
                  />
                ) : (
                  <div className="animate-pulse h-24 w-24 bg-gray-100 rounded-lg shadow-lg">
                    <div className="relative">
                      <div className="absolute top-20 left-20">
                        <div className="p-0.5 bg-gray-200 rounded-lg border-4 border-gray-50 shadow-2xl">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-50"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="first_name"
                  className={
                    errors.firstName
                      ? "block text-sm font-medium text-red-700 sm:mt-px sm:pt-2"
                      : "block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  }
                >
                  Nombre
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    value={(values && values.firstName) || ""}
                    id="first_name"
                    autoComplete="given-name"
                    className={
                      errors.firstName
                        ? "max-w-lg block w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                        : "max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    }
                  />
                </div>
                <p className="mt-2 text-sm text-red-600" id="firstName-error">
                  {errors.firstName || ""}
                </p>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="last_name"
                  className={
                    errors.lastName
                      ? "block text-sm font-medium text-red-700 sm:mt-px sm:pt-2"
                      : "block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  }
                >
                  Apellidos
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    value={(values && values.lastName) || ""}
                    id="last_name"
                    autoComplete="family-name"
                    className={
                      errors.lastName
                        ? "max-w-lg block w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                        : "max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    }
                  />
                </div>
                <p className="mt-2 text-sm text-red-600" id="lastName-error">
                  {errors.lastName || ""}
                </p>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="email"
                  className={
                    errors.email
                      ? "block text-sm font-medium text-red-700 sm:mt-px sm:pt-2"
                      : "block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  }
                >
                  Correo electronico
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    id="email"
                    name="email"
                    onChange={handleChange}
                    value={(values && values.email) || ""}
                    type="email"
                    autoComplete="email"
                    className={
                      errors.email
                        ? "text-red-500 max-w-lg block w-full shadow-sm sm:max-w-xs sm:text-sm border-red-300 rounded-md focus:ring-red-500 focus:border-red-500"
                        : "max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    }
                  />
                </div>
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors.email || ""}
                </p>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="street_address"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Fecha de Cumpleaños
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  {/* We will work later on a custom date picker component */}
                  {/* <BirthDayPicker /> */}
                  <input
                    type="date"
                    name="birthDate"
                    id="birthDate"
                    max={currDate()}
                    value={(values && values.birthDate) || ""}
                    onChange={handleChange}
                    className={
                      errors.birthDate
                        ? "shadow-sm focus:red-500 focus:border-red-500 block w-full sm:text-sm border-red-300 rounded-md text-red-500"
                        : "shadow-sm focus:blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    }
                  />
                </div>
                <p className="mt-2 text-sm text-red-600" id="birthDate-error">
                  {errors.birthDate || ""}
                </p>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="street_address"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Direccion/Calle
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    value={
                      values && values.address ? values.address.street : ""
                    }
                    type="text"
                    name="street"
                    id="street_address"
                    autoComplete="street-address"
                    onChange={handleChange}
                    className="block max-w-lg w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Ciudad
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    value={values && values.address ? values.address.city : ""}
                    type="text"
                    name="city"
                    id="city"
                    onChange={handleChange}
                    className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Estado / Provincia
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    value={values && values.address ? values.address.state : ""}
                    type="text"
                    name="state"
                    onChange={handleChange}
                    id="state"
                    className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Codigo Postal
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    value={values && values.address ? values.address.zip : ""}
                    type="text"
                    name="zip"
                    id="zip"
                    onChange={handleChange}
                    autoComplete="postal-code"
                    className={
                      errors.zip
                        ? "max-w-lg block w-full shadow-sm focus:ring-red-500 focus:border-red-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        : "max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    }
                  />
                </div>
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors.zip || ""}
                </p>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Pais / Region
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <SelectUserCountry
                    values={values}
                    handleChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <Link href="/user/profile">
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
            </Link>
            <button
              disabled={
                Object.keys(errors).length === 0 && values ? false : true
              }
              type="submit"
              className={
                Object.keys(errors).length > 0
                  ? "ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  : "ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              }
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
      <GlobalErrorNotifications
        show={show}
        setShow={setShow}
        message={message}
        setMessage={setMessage}
      />
    </>
  );
};

export default UpdateProfile;
