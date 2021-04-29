import { createContext, useContext } from "react";
import { useProvideGlobalError } from "../components/utils/useProvideGlobalErrorNotification";
const errorContext = createContext();
export const ProvideErrorNotification = ({ children }) => {
  const { show, setShow, message, setMessage } = useProvideGlobalError();
  console.log("show: ", show);
  console.log("message: ", message);

  return (
    <errorContext.Provider
      value={{
        show: show,
        setShow: setShow,
        message: message,
        setMessage: setMessage,
      }}
    >
      {children}
    </errorContext.Provider>
  );
};

export const useGlobalError = () => useContext(errorContext);
