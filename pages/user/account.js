import { useState, Fragment } from "react";
import { useVerifyEmail } from "../../components/userHooks/useVerifyEmail";
import { Transition } from "@headlessui/react";
import VerifyEmailSent from "./verifyEmailSent";
import Link from "next/link";
import React from "react";
import { usePicture } from "../../components/userHooks/usePicture";
import Loader from "../helpers/loader";
import { useAuth } from "../../context/useAuth";
import nookies from "nookies";
import { admin } from "../../config/firebaseAdmin";
import { useRouter } from "next/router";

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
    // const userRecord = await admin
    //   .auth()
    //   .getUser(uid)
    //   .then((userRecord) => JSON.parse(JSON.stringify(userRecord)))
    //   .catch((err) => console.log(err));

    // //
    // return {
    //   props: {
    //     userRecord,
    //   },
    // };
  } catch (error) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
}

const Account = () => {
  const router = useRouter();
  const [sideBarMenu, setSideBarMenu] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const uploadFileRef = React.createRef();
  const { handleFiles, picErrors, setPicErrors } = usePicture();
  const { user, dbUser, logOut } = useAuth();

  //

  const {
    emailSent,
    emailVerifError,
    handleVerifyEmail,
    openEmailVerif,
    setOpenEmailVerif,
  } = useVerifyEmail();

  const openSideBarMenu = () => {
    setSideBarMenu(!sideBarMenu);
  };

  return !user || !dbUser ? (
    <Loader />
  ) : (
    <>
      <div className="h-screen flex overflow-hidden bg-gray-100">
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
            className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-cyan-700"
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
            <div className="flex-shrink-0 flex items-center px-4">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/easywire-logo-cyan-300-mark-white-text.svg"
                alt="Easywire logo"
              />
            </div>
            <nav
              className="mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto"
              aria-label="Sidebar"
            >
              <div className="px-2 space-y-1">
                {/* Current: "bg-cyan-800 text-white", Default: "text-cyan-100 hover:text-white hover:bg-cyan-600" */}
                <a
                  href="#"
                  className="bg-cyan-800 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
                  aria-current="page"
                >
                  {/* Heroicon name: outline/home */}
                  <svg
                    className="mr-4 h-6 w-6 text-cyan-200"
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
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Home
                </a>
                <a
                  href="#"
                  className="text-cyan-100 hover:text-white hover:bg-cyan-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                >
                  {/* Heroicon name: outline/clock */}
                  <svg
                    className="mr-4 h-6 w-6 text-cyan-200"
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  History
                </a>
                <a
                  href="#"
                  className="text-cyan-100 hover:text-white hover:bg-cyan-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                >
                  {/* Heroicon name: outline/scale */}
                  <svg
                    className="mr-4 h-6 w-6 text-cyan-200"
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
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                  Balances
                </a>
                <a
                  href="#"
                  className="text-cyan-100 hover:text-white hover:bg-cyan-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                >
                  {/* Heroicon name: outline/credit-card */}
                  <svg
                    className="mr-4 h-6 w-6 text-cyan-200"
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
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  Cards
                </a>
                <a
                  href="#"
                  className="text-cyan-100 hover:text-white hover:bg-cyan-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                >
                  {/* Heroicon name: outline/user-group */}
                  <svg
                    className="mr-4 h-6 w-6 text-cyan-200"
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Recipients
                </a>
                <a
                  href="#"
                  className="text-cyan-100 hover:text-white hover:bg-cyan-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                >
                  {/* Heroicon name: outline/document-report */}
                  <svg
                    className="mr-4 h-6 w-6 text-cyan-200"
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
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Reports
                </a>
              </div>
              <div className="mt-6 pt-6">
                <div className="px-2 space-y-1">
                  <a
                    href="#"
                    className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                  >
                    {/* Heroicon name: outline/cog */}
                    <svg
                      className="mr-4 h-6 w-6 text-cyan-200"
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
                    Settings
                  </a>
                  <a
                    href="#"
                    className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                  >
                    {/* Heroicon name: outline/question-mark-circle */}
                    <svg
                      className="mr-4 h-6 w-6 text-cyan-200"
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
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Help
                  </a>
                  <a
                    href="#"
                    className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                  >
                    {/* Heroicon name: outline/shield-check */}
                    <svg
                      className="mr-4 h-6 w-6 text-cyan-200"
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    Privacy
                  </a>
                </div>
              </div>
            </nav>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Transition>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/easywire-logo-cyan-300-mark-white-text.svg"
                  alt="Easywire logo"
                />
              </div>
              <nav
                className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto"
                aria-label="Sidebar"
              >
                <div className="px-2 space-y-1">
                  {/* Current: "bg-cyan-800 text-white", Default: "text-cyan-100 hover:text-white hover:bg-cyan-600" */}
                  <a
                    href="#"
                    className="bg-cyan-800 text-white group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                    aria-current="page"
                  >
                    {/* Heroicon name: outline/home */}
                    <svg
                      className="mr-4 h-6 w-6 text-cyan-200"
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
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Home
                  </a>
                  <a
                    href="#"
                    className="text-cyan-100 hover:text-white hover:bg-cyan-600 group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                  >
                    {/* Heroicon name: outline/clock */}
                    <svg
                      className="mr-4 h-6 w-6 text-cyan-200"
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    History
                  </a>
                  <a
                    href="#"
                    className="text-cyan-100 hover:text-white hover:bg-cyan-600 group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                  >
                    {/* Heroicon name: outline/scale */}
                    <svg
                      className="mr-4 h-6 w-6 text-cyan-200"
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
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      />
                    </svg>
                    Balances
                  </a>
                  <a
                    href="#"
                    className="text-cyan-100 hover:text-white hover:bg-cyan-600 group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                  >
                    {/* Heroicon name: outline/credit-card */}
                    <svg
                      className="mr-4 h-6 w-6 text-cyan-200"
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
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    Cards
                  </a>
                  <a
                    href="#"
                    className="text-cyan-100 hover:text-white hover:bg-cyan-600 group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                  >
                    {/* Heroicon name: outline/user-group */}
                    <svg
                      className="mr-4 h-6 w-6 text-cyan-200"
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Recipients
                  </a>
                  <a
                    href="#"
                    className="text-cyan-100 hover:text-white hover:bg-cyan-600 group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                  >
                    {/* Heroicon name: outline/document-report */}
                    <svg
                      className="mr-4 h-6 w-6 text-cyan-200"
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
                        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Reports
                  </a>
                </div>
                <div className="mt-6 pt-6">
                  <div className="px-2 space-y-1">
                    <a
                      href="#"
                      className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                    >
                      {/* Heroicon name: outline/cog */}
                      <svg
                        className="mr-4 h-6 w-6 text-cyan-200"
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
                      Settings
                    </a>
                    <a
                      href="#"
                      className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                    >
                      {/* Heroicon name: outline/question-mark-circle */}
                      <svg
                        className="mr-4 h-6 w-6 text-cyan-200"
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
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Help
                    </a>
                    <a
                      href="#"
                      className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                    >
                      {/* Heroicon name: outline/shield-check */}
                      <svg
                        className="mr-4 h-6 w-6 text-cyan-200"
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
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      Privacy
                    </a>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto focus:outline-none" tabIndex={0}>
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
            <button
              onClick={openSideBarMenu}
              className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              {/* Heroicon name: outline/menu-alt-1 */}
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
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            {/* Search bar */}
            <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="flex-1 flex">
                <form className="w-full flex md:ml-0" action="#" method="GET">
                  <label htmlFor="search_field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div
                      className="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                      aria-hidden="true"
                    >
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
                      id="search_field"
                      name="search_field"
                      className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                      placeholder="Search transactions"
                      type="search"
                    />
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                  <span className="sr-only">View notifications</span>
                  {/* Heroicon name: outline/bell */}
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
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
                {/* Profile dropdown */}
                <div className="ml-3 relative">
                  <div>
                    <button
                      onClick={() => setOpenProfileMenu(!openProfileMenu)}
                      type="button"
                      className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50"
                      id="user-menu"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      {dbUser.photoURL !== null ? (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={dbUser.photoURL}
                          alt="user profile picture"
                        />
                      ) : (
                        <div
                          className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200"
                          alt="user profile picture"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}

                      <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                        <span className="sr-only">Abrir perfil para </span>
                        Emilia Birch
                      </span>
                      {/* Heroicon name: solid/chevron-down */}
                      <svg
                        className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
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
                    </button>
                  </div>

                  <Transition
                    show={openProfileMenu}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <div
                      className="origin-top-right flex flex-col items-start absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <Link href="/user/profile">
                        <a
                          className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-green-500"
                          role="menuitem"
                        >
                          Tu Perfil
                        </a>
                      </Link>
                      <Link href="/">
                        <a
                          className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-green-500"
                          role="menuitem"
                        >
                          Settings
                        </a>
                      </Link>

                      <button
                        onClick={logOut}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-500"
                        role="menuitem"
                      >
                        Logout
                      </button>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
          </div>
          <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
            {/* Page header */}
            <div className="bg-white shadow">
              <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
                <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                  {/* PROFILE  PROFILE  PROFILE  PROFILE  PROFILE  PROFILE  PROFILE  PROFILE */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      {/* picture profile for desktop etc */}
                      {dbUser !== null && (
                        <img
                          className="hidden h-16 w-16 rounded-full sm:block"
                          src={dbUser.photoURL}
                          alt="profile picture for desktop"
                        />
                      )}
                      {/* Small screen section starts here */}
                      <div>
                        <div className="flex items-center">
                          {dbUser.photoURL !== null ? (
                            <>
                              {/* this will show the real update profile picture */}
                              <input
                                onClick={(event) => (event.target.value = null)}
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
                                onClick={() =>
                                  uploadFileRef.current &&
                                  uploadFileRef.current.click()
                                }
                              >
                                <div className="shadow-lg bg-gradient-to-tr from-blue-400 to-green-500 p-1 rounded-full sm:hidden">
                                  <div className="bg-gray-50 p-0.5 rounded-full sm:hidden">
                                    <div className="relative">
                                      <img
                                        className="h-16 w-16 rounded-full sm:hidden"
                                        src={dbUser.photoURL}
                                        alt="user profile picture"
                                      />
                                      <div className="absolute top-0 right-0 -mr-4">
                                        <div className="shadow p-2 bg-gray-100 flex items-center justify-center rounded-full">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
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
                                </div>
                              </button>
                            </>
                          ) : (
                            <>
                              <input
                                onClick={(event) => (event.target.value = null)}
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
                                onClick={() =>
                                  uploadFileRef.current &&
                                  uploadFileRef.current.click()
                                }
                              >
                                <div className="shadow-lg sm:hidden bg-gradient-to-tr from-blue-400 to-green-500 p-1 rounded-full">
                                  <div className="sm:hidden bg-gray-50 p-0.5 rounded-full">
                                    <div className="relative h-16 w-16 bg-gray-200 rounded-full sm:hidden flex items-center justify-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      <div className="absolute top-0 right-0 -mr-4">
                                        <div className="shadow p-2 bg-gray-300 flex items-center justify-center rounded-full">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
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
                                </div>
                              </button>
                            </>
                          )}

                          {dbUser.firstName !== null && (
                            <h1 className="text-gray-700 ml-6 text-2xl font-bold leading-7 sm:leading-9 sm:truncate">
                              Que tal, {dbUser.firstName}
                            </h1>
                          )}
                        </div>
                        {dbUser.email === null ? (
                          <button
                            onClick={() => router.push("/user/onboarding")}
                            type="button"
                            className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-tr from-blue-400 to-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Completa tu perfil
                          </button>
                        ) : (
                          <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                            <dt className="sr-only">email</dt>
                            <dd className="flex items-center text-sm text-gray-400 font-medium sm:mr-6">
                              <svg
                                className="flex-shrink-0 mr-1.5 h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="">{dbUser.email}</span>
                            </dd>
                            <dt className="sr-only">email</dt>
                            <dd className="mt-3 flex items-center text-sm font-medium sm:mr-6 sm:mt-0 capitalize">
                              {/* ENTER AND VERIFY EMAIL ADDRESS */}
                              {dbUser.emailVerified ? (
                                <>
                                  <svg
                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span> Cuenta verificada</span>
                                </>
                              ) : (
                                <div className="flex">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-red-500"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <button
                                    onClick={handleVerifyEmail}
                                    className="text-red-500 underline"
                                  >
                                    Verifica tu correo electronico
                                  </button>
                                </div>
                              )}
                            </dd>
                            <dd className="mt-3 flex items-center text-sm text-gray-400 font-medium sm:mr-6 sm:mt-0 capitalize">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                              </svg>
                              <span>{dbUser.phoneNumber}</span>
                            </dd>
                          </dl>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      Recarga Nauta
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      Recarga Cel
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-lg leading-6 font-medium text-gray-900">
                  Overview
                </h2>
                <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Card */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {/* Heroicon name: outline/scale */}
                          <svg
                            className="h-6 w-6 text-gray-400"
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
                              d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                            />
                          </svg>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Account balance
                            </dt>
                            <dd>
                              <div className="text-lg font-medium text-gray-900">
                                $30,659.45
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                      <div className="text-sm">
                        <a
                          href="#"
                          className="font-medium text-cyan-700 hover:text-cyan-900"
                        >
                          View all
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* More items... */}
                </div>
              </div>
              <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
                Recent activity
              </h2>
              {/* Activity list (smallest breakpoint only) */}
              <div className="shadow sm:hidden">
                <ul className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-4 bg-white hover:bg-gray-50"
                    >
                      <span className="flex items-center space-x-4">
                        <span className="flex-1 flex space-x-2 truncate">
                          {/* Heroicon name: solid/cash */}
                          <svg
                            className="flex-shrink-0 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="flex flex-col text-gray-500 text-sm truncate">
                            <span className="truncate">
                              Payment to Molly Sanders
                            </span>
                            <span>
                              <span className="text-gray-900 font-medium">
                                $20,000
                              </span>{" "}
                              USD
                            </span>
                            <time dateTime="2020-07-11">July 11, 2020</time>
                          </span>
                        </span>
                        {/* Heroicon name: solid/chevron-right */}
                        <svg
                          className="flex-shrink-0 h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </a>
                  </li>
                  {/* More items... */}
                </ul>
                <nav
                  className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
                  aria-label="Pagination"
                >
                  <div className="flex-1 flex justify-between">
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                    >
                      Previous
                    </a>
                    <a
                      href="#"
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                    >
                      Next
                    </a>
                  </div>
                </nav>
              </div>
              {/* Activity table (small breakpoint and up) */}
              <div className="hidden sm:block">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col mt-2">
                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Transaction
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                              Status
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr className="bg-white">
                            <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div className="flex">
                                <a
                                  href="#"
                                  className="group inline-flex space-x-2 truncate text-sm"
                                >
                                  {/* Heroicon name: solid/cash */}
                                  <svg
                                    className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <p className="text-gray-500 truncate group-hover:text-gray-900">
                                    Payment to Molly Sanders
                                  </p>
                                </a>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                              <span className="text-gray-900 font-medium">
                                $20,000{" "}
                              </span>
                              USD
                            </td>
                            <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                                success
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                              <time dateTime="2020-07-11">July 11, 2020</time>
                            </td>
                          </tr>
                          {/* More items... */}
                        </tbody>
                      </table>
                      {/* Pagination */}
                      <nav
                        className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                        aria-label="Pagination"
                      >
                        <div className="hidden sm:block">
                          <p className="text-sm text-gray-700">
                            Showing
                            <span className="font-medium">1</span>
                            to
                            <span className="font-medium">10</span>
                            of
                            <span className="font-medium">20</span>
                            results
                          </p>
                        </div>
                        <div className="flex-1 flex justify-between sm:justify-end">
                          <a
                            href="#"
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Previous
                          </a>
                          <a
                            href="#"
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Next
                          </a>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <VerifyEmailSent
        openEmailVerif={openEmailVerif}
        setOpenEmailVerif={setOpenEmailVerif}
      />
    </>
  );
};

export default Account;
