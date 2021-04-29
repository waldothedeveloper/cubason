import { useEffect, useState } from "react";
import firebase from "../config/firebaseClient";
import nookies from "nookies";
import { useRouter } from "next/router";
import { useFindOrCreateFireStoreUserAccount } from "./useFindOrCreateFireStoreUserAccount";

export const useProvideAuth = (redirectUrl = "/auth/login") => {
  const [user, setUser] = useState(null);
  console.log("user: ", user);
  const { dbUser } = useFindOrCreateFireStoreUserAccount(user);
  const router = useRouter();

  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        router.push(redirectUrl);
      })
      .catch((e) => console.log(e));
  };

  const signInWithPhone = async (phoneNumber, appVerifier) => {
    await firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        return;
      })
      .catch((err) => {
        // SMS not sent...if this fails, remember to reset the recaptcha object
        console.log(err);
        return err;
      });
  };

  const confirmSignInWithPhone = async (code) => {
    await window.confirmationResult.confirm(code);
  };

  useEffect(() => {
    // listen to auth user
    const unsubscriber = firebase.auth().onIdTokenChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, "token", token, {
          path: "/",
          sameSite: "strict",
        });
      } else {
        setUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
      }
    });

    return () => unsubscriber();
  }, []);

  return {
    user,
    dbUser,
    logOut,
    signInWithPhone,
    confirmSignInWithPhone,
  };
};
