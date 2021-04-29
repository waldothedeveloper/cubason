import { createContext, useContext } from "react";
import { useProvideAuth } from "../config/useProvideAuth";

const authContext = createContext();

export const ProvideAuth = ({ children }) => {
  const {
    logOut,
    user,
    dbUser,
    signInWithPhone,
    confirmSignInWithPhone,
  } = useProvideAuth();

  return (
    <authContext.Provider
      value={{
        user: user,
        dbUser: dbUser,
        logOut: logOut,
        signInWithPhone: signInWithPhone,
        confirmSignInWithPhone: confirmSignInWithPhone,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
