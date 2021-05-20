import { Transition } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useBgPicture } from "../../components/userHooks/useBgPicture";
import Link from "next/link";
import Loader from "../helpers/loader";
import UserProfilePicture from "./userProfilePicture";
import nookies from "nookies";
import { admin } from "../../config/firebaseAdmin";
import { useAuth } from "../../context/useAuth";
//

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);

  try {
    const uid = await admin
      .auth()
      .verifyIdToken(cookies.token)
      .then((decodedToken) => decodedToken.uid)
      .catch((err) => console.log("Error decoding token", err));

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
const UserProfile = () => {
  const [sideBarMenu, setSideBarMenu] = useState(false);
  const [chosenNumber, setChosenNumber] = useState(0);
  const { data, isError } = useBgPicture();
  const { dbUser } = useAuth();

  const birthDate = Date.parse(dbUser && dbUser.birthDate);
  const parsedBirthday = new Date(birthDate);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const openSideBarMenu = () => {
    setSideBarMenu(!sideBarMenu);
  };

  useEffect(() => {
    setChosenNumber(Math.floor(Math.random() * 9) + 1);
  }, []);

  if (isError) return <div>Error trying to get User Profile</div>;
  if (!data || !dbUser) return <Loader />;

  //
  return (
    <div>
      <div className="h-screen flex overflow-hidden bg-white">
        {/* Off-canvas menu for mobile, show/hide based on off-canvas menu state. */}
        <Transition
          show={sideBarMenu}
          enter="transition-opacity ease-linear duration-1000"
          enterFrom="opacity-100"
          enterTo="transform opacity-100 scale-100"
          leave="transition-opacity ease-linear duration-1000"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="fixed inset-0 flex z-40 lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <Transition.Child
            enter="transition-opacity ease-linear duration-1000"
            enterFrom="opacity-100"
            enterTo="transform opacity-100 scale-100"
            leave="transition-opacity ease-linear duration-1000"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              aria-hidden="true"
            />
          </Transition.Child>

          <Transition.Child
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
            className="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none"
          >
            <Transition.Child
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  onClick={() => setSideBarMenu(false)}
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="sr-only">Close sidebar</span>
                  {/* Heroicon name: outline/x */}
                  <svg
                    className="h-6 w-6 text-white"
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
            </Transition.Child>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-pink-500-mark-gray-900-text.svg"
                  alt="testing"
                />
              </div>
              <nav aria-label="Sidebar" className="mt-5">
                <div className="px-2 space-y-1">
                  {/* Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" */}
                  <Link href="/user/update_profile">
                    <a
                      className="bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                      aria-current="page"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-gray-500 mr-4 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Datos Personales
                    </a>
                  </Link>
                  <a
                    href="#"
                    className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-400 group-hover:text-gray-500 mr-4 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Declaracion Electronica
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-400 group-hover:text-gray-500 mr-4 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    Comparte y Gana
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                  >
                    {/* Heroicon name: outline/search-circle */}
                    <svg
                      className="text-gray-400 group-hover:text-gray-500 mr-4 h-6 w-6"
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
                        d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Directorio de Contactos
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                  >
                    {/* Heroicon name: outline/speakerphone */}
                    <svg
                      className="text-gray-400 group-hover:text-gray-500 mr-4 h-6 w-6"
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
                        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                      />
                    </svg>
                    Anuncios
                  </a>
                </div>
                <hr
                  className="border-t border-gray-200 my-5"
                  aria-hidden="true"
                />
                <div className="px-2 space-y-1">
                  <a
                    href="#"
                    className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                  >
                    {/* Heroicon name: outline/view-grid-add */}
                    <svg
                      className="text-gray-400 group-hover:text-gray-500 mr-4 h-6 w-6"
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
                        d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                      />
                    </svg>
                    Apps
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                  >
                    {/* Heroicon name: outline/cog */}
                    <svg
                      className="text-gray-400 group-hover:text-gray-500 mr-4 h-6 w-6"
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
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Configuracion
                  </a>
                </div>
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <button
                onClick={openSideBarMenu}
                className="flex-shrink-0 group block"
              >
                <div className="flex items-center">
                  <div>
                    <img
                      className="inline-block h-10 w-10 rounded-full object-cover"
                      src={dbUser.photoURL}
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                      {`${dbUser.firstName} ${dbUser.lastName}`}
                    </p>
                    <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                      Ver Perfil
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Transition>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-gray-100">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-pink-500-mark-gray-900-text.svg"
                    alt="testing"
                  />
                </div>
                <nav className="mt-5 flex-1" aria-label="Sidebar">
                  <div className="px-2 space-y-1">
                    {/* Current: "bg-gray-200 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" */}
                    <Link href="/user/update_profile">
                      <a className="bg-gray-200 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-gray-500 mr-3 h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Datos Personales
                      </a>
                    </Link>
                    <a
                      href="#"
                      className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Declaracion Electronica
                    </a>
                    <a
                      href="#"
                      className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      Comparte y Gana
                    </a>
                    <a
                      href="#"
                      className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    >
                      {/* Heroicon name: outline/search-circle */}
                      <svg
                        className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
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
                          d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Directorio de Contactos
                    </a>
                    <a
                      href="#"
                      className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    >
                      {/* Heroicon name: outline/speakerphone */}
                      <svg
                        className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
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
                          d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                        />
                      </svg>
                      Anuncios
                    </a>
                  </div>
                  <hr
                    className="border-t border-gray-200 my-5"
                    aria-hidden="true"
                  />
                  <div className="flex-1 px-2 space-y-1">
                    <a
                      href="#"
                      className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    >
                      {/* Heroicon name: outline/view-grid-add */}
                      <svg
                        className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
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
                          d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                        />
                      </svg>
                      Apps
                    </a>
                    <a
                      href="#"
                      className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    >
                      {/* Heroicon name: outline/cog */}
                      <svg
                        className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
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
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Configuracion
                    </a>
                  </div>
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <button
                  onClick={openSideBarMenu}
                  className="flex-shrink-0 w-full group block"
                >
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block h-9 w-9 rounded-full object-cover"
                        src={dbUser.photoURL}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                        {`${dbUser.firstName} ${dbUser.lastName}`}
                      </p>
                      <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                        Ver Perfil
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <div className="lg:hidden">
            <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
              <div>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-pink-500.svg"
                  alt="testing"
                />
              </div>
              <div>
                <button
                  onClick={openSideBarMenu}
                  type="button"
                  className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600"
                >
                  <span className="sr-only">Open sidebar</span>
                  {/* Heroicon name: outline/menu */}
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
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 relative z-0 flex overflow-hidden">
            <main
              className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last"
              tabIndex={0}
            >
              {/* Breadcrumb */}
              <nav
                className="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden"
                aria-label="Breadcrumb"
              >
                <Link href="/user/account">
                  <a className="inline-flex items-center text-sm font-medium text-gray-900">
                    {/* Heroicon name: solid/chevron-left */}
                    <svg
                      className="h-5 w-5 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                      Salir
                    </span>
                  </a>
                </Link>
              </nav>
              <article>
                {/* Profile header */}
                <div>
                  <div>
                    {/* background image that we can use random Cuba photos from Unsplash API */}
                    {data && data.results.length > 0 ? (
                      <img
                        className="h-32 w-full object-cover lg:h-48"
                        src={data.results[chosenNumber].urls.regular}
                        alt="testing"
                      />
                    ) : (
                      <div className="h-32 w-full object-cover lg:h-48 bg-gray-200" />
                    )}
                  </div>
                  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5 z-50">
                      <div className="flex">
                        <UserProfilePicture
                          imgClass="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 object-cover"
                          photo={dbUser.photoURL}
                        />
                      </div>
                      <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                          <h1 className="text-2xl font-bold text-gray-900 truncate">
                            {`${dbUser.firstName} ${dbUser.lastName}`}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                      <h1 className="text-2xl font-bold text-gray-900 truncate">
                        {`${dbUser.firstName} ${dbUser.lastName}`}
                      </h1>
                    </div>
                  </div>
                </div>
                {/* Tabs */}
                <div className="mt-6 sm:mt-2 2xl:mt-5">
                  <div className="border-b border-gray-200">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {/* Current: "border-pink-500 text-gray-900", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
                        <a
                          href="#"
                          className="border-pink-500 text-gray-900 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                          aria-current="page"
                        >
                          Perfil
                        </a>
                        <a
                          href="#"
                          className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                        >
                          Historial
                        </a>
                        <a
                          href="#"
                          className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                        >
                          Recognition
                        </a>
                      </nav>
                    </div>
                  </div>
                </div>
                {/* Description list */}
                <div className="my-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Telefono
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {dbUser.phoneNumber}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Correo electronico
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {dbUser.email}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Ubicacion
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {(dbUser.address && dbUser.address.city) || ""}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Cumpleaños
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {parsedBirthday.toLocaleDateString("es-ES", options)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </article>
            </main>
            <aside className="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
              <div className="px-6 pt-6 pb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Directorio de Contactos
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Search directory of 3,018 employees
                </p>
                <form className="mt-6 flex space-x-4" action="#">
                  <div className="flex-1 min-w-0">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {/* Heroicon name: solid/search */}
                        <svg
                          className="h-5 w-5 text-gray-400"
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
                        type="search"
                        name="search"
                        id="search"
                        className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    {/* Heroicon name: solid/filter */}
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="sr-only">Search</span>
                  </button>
                </form>
              </div>
              {/* Directorio de Contactos list */}
              <nav
                className="flex-1 min-h-0 overflow-y-auto"
                aria-label="Directorio de Contactos"
              >
                <div className="relative">
                  <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                    <h3>A</h3>
                  </div>
                  <ul className="relative z-0 divide-y divide-gray-200">
                    <li>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=z8fxgF208C&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="testing"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              Leslie Abbott
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              Co-Founder / CEO
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixqx=z8fxgF208C&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="testing"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              Hector Adams
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              VP, Marketing
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-1.2.1&ixqx=z8fxgF208C&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="testing"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              Blake Alexander
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              Account Coordinator
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixqx=z8fxgF208C&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="testing"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              Fabricio Andrews
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              Senior Art Director
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                    <h3>B</h3>
                  </div>
                  <ul className="relative z-0 divide-y divide-gray-200">
                    <li>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixqx=z8fxgF208C&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="testing"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              Angela Beaver
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              Chief Strategy Officer
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1506980595904-70325b7fdd90?ixlib=rb-1.2.1&ixqx=z8fxgF208C&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="testing"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              Yvette Blanchard
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              Studio Artist
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixqx=z8fxgF208C&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="testing"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              Lawrence Brooks
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              Content Specialist
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                    <h3>C</h3>
                  </div>
                  <ul className="relative z-0 divide-y divide-gray-200">
                    <li>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixqx=z8fxgF208C&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="testing"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              Jeffrey Clark
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              Senior Art Director
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixqx=z8fxgF208C&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="testing"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              Kathryn Cooper
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              Associate Creative Director
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                    <h3>E</h3>
                  </div>
                  <ul className="relative z-0 divide-y divide-gray-200">
                    <li>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixqx=z8fxgF208C&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="testing"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              Alicia Edwards
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              Junior Copywriter
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixqx=z8fxgF208C&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="testing"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              Benjamin Emerson
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              Director, Print Operations
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&ixqx=z8fxgF208C&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="testing"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              Jillian Erics
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              Designer
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixqx=z8fxgF208C&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="testing"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              Chelsea Evans
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              Human Resources Manager
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                    <h3>G</h3>
                  </div>
                  <ul className="relative z-0 divide-y divide-gray-200">
                    <li>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixqx=z8fxgF208C&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="testing"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              Michael Gillard
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              Co-Founder / CTO
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixqx=z8fxgF208C&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="testing"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              Dries Giuessepe
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              Manager, Business Relations
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                    <h3>M</h3>
                  </div>
                  <ul className="relative z-0 divide-y divide-gray-200">
                    <li>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-1.2.1&ixqx=z8fxgF208C&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="testing"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              Jenny Harrison
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              Studio Artist
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixqx=z8fxgF208C&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="testing"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              Lindsay Hatley
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              Front-end Developer
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixqx=z8fxgF208C&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="testing"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              Anna Hill
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              Partner, Creative
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                    <h3>S</h3>
                  </div>
                  <ul className="relative z-0 divide-y divide-gray-200">
                    <li>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixqx=z8fxgF208C&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="testing"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              Courtney Samuels
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              Designer
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=z8fxgF208C&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="testing"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              Tom Simpson
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              Director, Product Development
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                    <h3>T</h3>
                  </div>
                  <ul className="relative z-0 divide-y divide-gray-200">
                    <li>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixqx=z8fxgF208C&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="testing"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              Floyd Thompson
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              Principal Designer
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixqx=z8fxgF208C&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="testing"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              Leonard Timmons
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              Senior Designer
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=z8fxgF208C&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="testing"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              Whitney Trudeau
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              Copywriter
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                    <h3>W</h3>
                  </div>
                  <ul className="relative z-0 divide-y divide-gray-200">
                    <li>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixqx=z8fxgF208C&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="testing"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              Kristin Watson
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              VP, Human Resources
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixqx=z8fxgF208C&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="testing"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              Emily Wilson
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              VP, User Experience
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                    <h3>Y</h3>
                  </div>
                  <ul className="relative z-0 divide-y divide-gray-200">
                    <li>
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixqx=z8fxgF208C&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="testing"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              Emma Young
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              Senior Front-end Developer
                            </p>
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </nav>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
