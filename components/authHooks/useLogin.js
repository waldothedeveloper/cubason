import { createContext, useContext } from "react";
import { useProvideLogin } from "./useProvideLogin";

const authLoginContext = createContext();

export const ProvideLogin = ({ children }) => {
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
  } = useProvideLogin();

  return (
    <authLoginContext.Provider
      value={{
        values: values,
        handleChange: handleChange,
        handleSubmit: handleSubmit,
        setValues: setValues,
        isOpen: isOpen,
        setIsOpen: setIsOpen,
        phonePrefix: phonePrefix,
        setPhonePrefix: setPhonePrefix,
        errors: errors,
        twilioData: twilioData,
        setCaptcha: setCaptcha,
        captcha: captcha,
      }}
    >
      {children}
    </authLoginContext.Provider>
  );
};

export const useLogin = () => useContext(authLoginContext);
