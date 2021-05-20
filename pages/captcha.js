import { useRef, useEffect } from "react";
import firebase from "../config/firebaseClient";

const Captcha = ({ setCaptcha }) => {
  const recaptchaRef = useRef(null);

  useEffect(() => {
    setCaptcha(false);
    firebase.auth().languageCode = "es";

    // setup recaptcha
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      recaptchaRef.current && recaptchaRef.current,
      {
        size: "normal",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          setCaptcha(true);
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          setCaptcha(false);
        },
      }
    );

    // It's important to render the recaptcha
    window.recaptchaVerifier.render().then((widgetId) => {
      window.recaptchaWidgetId = widgetId;
    });

    return () => window.recaptchaVerifier.clear();
  }, []);

  return (
    <div
      id="recaptcha-container"
      className="flex items-center justify-center"
      ref={recaptchaRef}
    />
  );
};

export default Captcha;
