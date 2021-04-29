import { useState } from "react";
import firebase from "../../config/firebaseClient";

export const useVerifyEmail = () => {
  const currUser = firebase.auth().currentUser;
  const [openEmailVerif, setOpenEmailVerif] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerifError, setEmailVerifError] = useState({});

  const handleVerifyEmail = () => {
    setOpenEmailVerif(true);
    //
    currUser
      .sendEmailVerification()
      .then(() => {
        setEmailSent(true);
      })
      .catch((err) => {
        setEmailVerifError(err);
      });
  };

  return {
    emailSent,
    emailVerifError,
    handleVerifyEmail,
    openEmailVerif,
    setOpenEmailVerif,
  };
};
