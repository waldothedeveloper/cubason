import React from "react";
import cuba_flag from "../public/cuba2.svg";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative">
      <main className="lg:relative">
        <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
          <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block xl:inline text-strawberry-ice font-sans">
                Recarga a Cuba <br />
              </span>
              <span className="block text-scuba-blue xl:inline">
                {` `}a la velocidad de una chispa...
              </span>
            </h1>
            <div className="mt-5">
              {/* <svg
                className="h-12 w-12 text-scuba-blue opacity-25"
                fill="currentColor"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg> */}
              <blockquote className="mt-5 ml-3 font-medium italic max-w-md mx-auto text-md text-gray-500  md:max-w-3xl">
                Estaremos donando las ganancias de las primeras{" "}
                <span className="text-strawberry-ice font-bold text-lg">
                  100
                </span>{" "}
                recargas para apoyar al Movimiento San Isidro.
              </blockquote>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-12 sm:max-w-lg w-full flex items-center justify-center"
            >
              <div className="min-w-0 flex-1">
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <label htmlFor="country" className="sr-only">
                      Country
                    </label>

                    <Image
                      className="py-0 pl-3 pr-7"
                      src={cuba_flag}
                      width={32}
                      height={32}
                      alt="bandera cubana icon"
                    />
                  </div>
                  <input
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    className="focus:scuba-blue focus:border-scuba-blue block w-full pl-14 sm:text-sm border-gray-300 text-base rounded-md py-3"
                    placeholder="+53 (5) 555-5555"
                  />
                </div>
              </div>
              <div className="sm:ml-3">
                <button
                  type="submit"
                  className="block w-full rounded-md border border-transparent px-5 py-3 bg-scuba-blue text-base font-medium text-white shadow hover:bg-strawberry-ice focus:outline-none focus:ring-2 focus:ring-strawberry-ice focus:ring-offset-2 sm:px-10"
                >
                  Dale caña
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
          <div>
            {/* <img
              className="absolute inset-0 w-full h-full object-cover"
              alt=""
              src="/cuba_girl.jpeg"
            /> */}

            <Image
              style={{ objectFit: "cover" }}
              src="/cuba_girl.jpeg"
              alt=""
              layout="responsive"
              width={448}
              height={878}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hero;
