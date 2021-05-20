const OnboardingSteps = ({ color, onboardGuide }) => {
  let component;

  switch (color) {
    case "no_steps_completed":
      component = onboardGuide.map((elem, idx) => (
        <div key={idx}>
          <div
            className={
              idx + 1 !== 1
                ? "transition-all duration-500 ease-in-out relative flex justify-around max-w-xs mx-auto rounded-xl p-4 border-2 border-gray-300 bg-white"
                : "transition-all duration-500 ease-in-out relative flex justify-around max-w-xs mx-auto rounded-xl p-4 border-2 border-blue-500 bg-white"
            }
          >
            <div className="transition-all duration-500 ease-in-out text-gray-700 ml-3 leading-loose space-y-2">
              <h2 className="font-medium text-lg">{elem.header}</h2>
              <p className="transition-all duration-500 ease-in-out text-gray-400 text-sm leading-relaxed">
                {elem.text}
              </p>
            </div>
            {idx + 1 !== 1 ? (
              // Heroicon lock icon
              <svg
                className="h-8 w-auto text-gray-300 inline-flex text-sm -mt-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            ) : (
              <button
                onClick={elem.fn}
                className="transition-all duration-500 ease-in-out flex flex-col items-end text-sm mt-0.5 text-blue-500 font-semibold focus:outline-none"
              >
                Empezar
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 -mt-1 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}

            <div className="absolute top-0 left-0 -ml-4 mt-8">
              {idx + 1 !== 1 ? (
                <span className="transition-all duration-500 ease-in-out bg-white h-8 w-8 text-gray-400 p-2 border-2 border-gray-300 rounded-full font-semibold inline-flex items-center justify-center">
                  {idx + 1}
                </span>
              ) : (
                <span className="transition-all duration-500 ease-in-out bg-white h-8 w-8 text-blue-500 p-2 border-2 border-blue-500 rounded-full font-semibold inline-flex items-center justify-center">
                  {idx + 1}
                </span>
              )}
            </div>
          </div>
        </div>
      ));
      break;
    case "step1_completed":
      component = onboardGuide.map((elem, idx) => (
        <div key={idx}>
          <div
            className={
              idx + 1 !== 1
                ? "transition-all duration-500 ease-in-out relative flex justify-around max-w-xs mx-auto rounded-xl p-4 border-2 border-blue-500 bg-white"
                : "transition-all duration-500 ease-in-out relative flex justify-around max-w-xs mx-auto rounded-xl p-4 border-2 border-green-500 bg-green-100"
            }
          >
            <div
              className={
                idx + 1 !== 1
                  ? "transition-all duration-500 ease-in-out text-gray-700 ml-3 leading-loose space-y-2"
                  : "transition-all duration-500 ease-in-out text-green-700 ml-3 leading-loose"
              }
            >
              <h2 className="font-medium text-lg">{elem.header}</h2>
              <p
                className={
                  idx + 1 !== 1
                    ? "transition-all duration-500 ease-in-out text-gray-400 text-sm leading-relaxed"
                    : "transition-all duration-500 ease-in-out text-green-700 text-sm leading-relaxed"
                }
              >
                {elem.text}
              </p>
            </div>
            {idx + 1 !== 1 ? (
              <button
                onClick={elem.fn}
                className="transition-all duration-500 ease-in-out flex flex-col items-end text-sm mt-0.5 text-blue-500 font-semibold focus:outline-none"
              >
                Comenzar
              </button>
            ) : (
              <p className="transition-all duration-500 ease-in-out flex flex-col items-end text-sm mt-0.5 text-green-500 font-semibold focus:outline-none">
                Completado
              </p>
            )}

            <div className="absolute top-0 left-0 -ml-4 mt-8">
              {idx + 1 !== 1 ? (
                <span className="transition-all duration-500 ease-in-out bg-white h-8 w-8 text-blue-500 p-2 border-2 border-blue-500 rounded-full font-semibold inline-flex items-center justify-center">
                  {idx + 1}
                </span>
              ) : (
                <span className="transition-all duration-500 ease-in-out bg-green-500 h-8 w-8 text-green-400 border-2 border-green-300 rounded-full font-semibold inline-flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </div>
          </div>
        </div>
      ));
      break;
    case "step1_and_step2_completed":
      component = onboardGuide.map((elem, idx) => (
        <div key={idx}>
          <div className="transition-all duration-500 ease-in-out relative flex justify-around max-w-xs mx-auto rounded-xl p-4 border-2 border-green-500 bg-green-100">
            <div className="transition-all duration-500 ease-in-out text-green-700 ml-3 leading-loose space-y-2">
              <h2 className="font-medium text-lg">{elem.header}</h2>
              <p className="transition-all duration-500 ease-in-out text-green-700 text-sm leading-relaxed">
                {elem.text}
              </p>
            </div>

            <p className="transition-all duration-500 ease-in-out flex flex-col items-end text-sm mt-0.5 text-green-500 font-semibold focus:outline-none">
              Completado
            </p>

            <div className="absolute top-0 left-0 -ml-4 mt-8">
              <span className="transition-all duration-500 ease-in-out bg-green-500 h-8 w-8 text-green-400 border-2 border-green-300 rounded-full font-semibold inline-flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      ));
      break;
    default:
      component = null;
      break;
  }

  return component;
};

export default OnboardingSteps;
