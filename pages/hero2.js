// import liquid_flag from "../public/cuba_flag_liquid.jpeg";
import Image from "next/image";

const Hero2 = () => {
  return (
    <div
    // style={{ backgroundImage: `url(${girl_jumping})` }}
    // className="h-screen bg-no-repeat bg-center bg-cover"
    >
      <div className="grid items-center grid-cols-2 gap-4 w-full text-center lg:text-left">
        <div className="pl-32">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <span className="block xl:inline text-blue-800 font-sans">
              Recarga <br />
            </span>
            <span className="block text-blue-800 xl:inline">
              {` `}a la velocidad de una chispa...
            </span>
          </h1>
          <div className="mt-5">
            {/* <svg
                className="h-12 w-12 text-blue-800 opacity-25"
                fill="currentColor"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg> */}
            <blockquote className="mt-5 ml-3 font-medium italic max-w-md mx-auto text-md text-gray-500  md:max-w-3xl">
              Por 500 CUP reciben{` `}
              <span className="text-red-700 font-bold text-xl">
                500 CUP + 1GB + 50 minutos + 50 SMS!
              </span>
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
                  <span className="py-0 pl-3 pr-7">
                    <Image
                      src="/cuba2.svg"
                      width={32}
                      height={32}
                      alt="bandera cubana icon"
                    />
                  </span>
                </div>
                <input
                  type="text"
                  name="phone_number"
                  id="phone_number"
                  className="focus:scuba-blue focus:border-blue-700 block w-full pl-14 sm:text-sm border-gray-300 text-base rounded-md py-3"
                  placeholder="+53 (5) 555-5555"
                />
              </div>
            </div>
            <div className="sm:ml-3">
              <button
                type="submit"
                className="block w-full rounded-md border border-transparent px-5 py-3 bg-blue-800 text-base font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-strawberry-ice focus:ring-offset-2 sm:px-10"
              >
                Dale caña
              </button>
            </div>
          </form>
        </div>
        <div className="p-24">
          <img
            className="w-full h-full object-cover"
            src="/cuba_flag_liquid.jpeg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Hero2;
