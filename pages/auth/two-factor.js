import { useRef } from "react";
import CountDown from "../../components/utils/countDown";
import { useLogin } from "../../components/authHooks/useLogin";
import { useTwoFactorLogin } from "../../components/authHooks/useTwoFactorLogin";

const TwoFactor = () => {
  const { counter } = CountDown();
  const inputs = useRef([]);
  const { twilioData } = useLogin();
  const {
    codeFill,
    onKeyUp,
    setVerificationCode,
    loginSuccess,
    errors,
    backToLoginStart,
  } = useTwoFactorLogin();

  return (
    <div className="flex flex-col items-center min-h-screen overflow-y-hidden p-8">
      <div className="mt-6">
        <p className="my-2 text-base text-gray-400">verificacion</p>
        <p className="mt-6 text-3xl text-gray-600 font-bold">
          Te enviamos un codigo SMS
        </p>
        <div className="mt-2">
          <p className="text-gray-400 text-base">
            A este numero:{" "}
            <span className="text-blue-500 font-semibold">
              {twilioData.data && twilioData.data.national_format}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-20">
        {errors.error ? (
          <p className="text-base text-red-500 font-medium">{errors.error}</p>
        ) : loginSuccess ? (
          <p className="text-base text-green-500 font-medium">
            Excelente, vamos a tu cuenta!
          </p>
        ) : (
          <div />
        )}
        <label
          htmlFor="phone_number"
          className="block text-sm font-medium text-gray-700"
        ></label>
        <div className="mt-1 relative rounded-md">
          <div className="absolute inset-y-0 left-0 flex items-center">
            <label htmlFor="country" className="sr-only">
              Verification Code
            </label>
          </div>
          <div className="mb-6 text-center">{}</div>

          <form className="flex space-x-3" onSubmit={(e) => e.preventDefault()}>
            {codeFill.map((num, idx) => (
              <input
                key={idx}
                type="text"
                name="phone_number"
                inputMode="numeric"
                maxLength={1}
                ref={(ref) => inputs.current.push(ref)}
                autoFocus={!codeFill[0].length && idx === 0}
                className={
                  errors.code &&
                  errors.code === "auth/invalid-verification-code"
                    ? "shadow-lg text-center text-red-500 text-3xl w-12 h-12 focus:ring-blue-500 focus:border-red-500 border-red-300 rounded-md"
                    : loginSuccess
                    ? "shadow-lg text-center text-green-500 text-3xl w-12 h-12 focus:ring-green-500 focus:border-green-500 border-green-300 rounded-md"
                    : "shadow-lg text-center text-gray-500 text-3xl w-12 h-12 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                }
                onChange={(event) => setVerificationCode(event, idx, inputs)}
                onKeyUp={(event) => onKeyUp(event, idx, inputs)}
                value={num}
              />
            ))}
          </form>

          <div className="text-center mt-12 divide-y-2 divide-y-reverse divide-red-500 divide-dashed">
            {counter !== 0 ? (
              <p className="text-gray-400 text-center font-semibold text-sm py-3">
                El codigo expira en:{" "}
                <span className="text-red-500">{counter} segundos</span>
              </p>
            ) : loginSuccess ? (
              <div className="flex justify-evenly items-center">
                <video
                  className="h-32 w-auto"
                  playsInline
                  autoPlay
                  loop
                  muted="muted"
                >
                  <source type="video/webm" src="/rocket_webm.webm" />
                  <source type="video/mp4" src="/rocket_mp4.mp4" />
                </video>
              </div>
            ) : (
              <div>
                <button
                  onClick={backToLoginStart}
                  className="underline focus:outline-none text-red-500 text-center font-extrabold text-base py-3"
                >
                  Regresar al inicio
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactor;
