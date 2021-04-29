import firebase from "../config/firebaseClient";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const usePhoneLogin = (validate) => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState({});
  const [captcha, setCaptcha] = useState(false);
  const [saveAppVerifier, setSaveAppVerifier] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmiting, setIsSubmitting] = useState(false);
  const [twilioError, setTwilioError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [nationalNumber, setNationalNumber] = useState(0);
  const [googleConfirmationResult, setGoogleConfirmationResult] = useState({});
  const [codeFill, setCodeFill] = useState([...Array(6)].map(() => ""));
  const [verifCodeErrors, setVerifCodeErrors] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [gooError, setGooError] = useState({});

  let myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Basic ${process.env.NEXT_PUBLIC_TWILIO_BASE64_AUTH}`
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  // If there's no errors continue the Sign In process
  //! THIS ONE SHOULD CALL THE FN TO CONTINUE THE SIGN IN PROCESS
  useEffect(() => {
    // console.log("RUNNING ONSIGNINSUBMIT USE-EFFECT");
    if (Object.keys(errors).length === 0 && isSubmiting) {
      onSignInSubmit();
    }
  }, [errors]);

  //! if the form is being submitted, captcha fn changes, or phoneNumber state make sure you have no errors
  useEffect(() => {
    // console.log("RUNNING ISSUBMITTING USE-EFFECT");
    if (isSubmiting) {
      setErrors(validate(phoneNumber, captcha));
    }
  }, [captcha, phoneNumber, isSubmiting]);

  // No errors, then this fn will fire
  const onSignInSubmit = () => {
    const appVerifier = window.recaptchaVerifier;

    if (captcha) {
      // put a loader...
      setIsLoading(true);
      // ask the Twilio LookUp API if the phone is valid
      fetch(
        `https://lookups.twilio.com/v1/PhoneNumbers/${phoneNumber.phone}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.status && result.status === 404) {
            // if NOT, then back
            console.log("Error the phone is not valid");
            setTwilioError({
              message: "El telefono no es valido, intentelo otra vez",
            });
            setIsLoading(false);
          }

          // if valid, then stop the loader, then push to code verification page

          if (result.national_format) {
            setIsLoading(false);
            setTwilioError({});
            // !CONTINUE TO VERIFICATION CODE

            firebase
              .auth()
              .signInWithPhoneNumber(phoneNumber.phone, appVerifier)
              .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                setGoogleConfirmationResult(confirmationResult);
                setSaveAppVerifier(appVerifier);
                setNationalNumber(result.national_format);
                router.push(`/login`, `/login?method=two-factor`, {
                  shallow: true,
                });
              })
              .catch((error) => {
                console.log("error: ", error);
                // Error; SMS not sent
              });
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setIsSubmitting(true);
    setErrors(validate(phoneNumber, captcha));
  };

  const handleChange = (event) => {
    // console.log("event: ", event);
    event.persist();
    const value = event.target.value;
    const valueSplit = value.split("");
    // console.log("valueSplit: ", valueSplit.length);
    const onlyNums = /^[\+][0-9\b]+$/g;

    // the reason why I'm doing this is:
    //! 1. make sure only numbers are being entered if visiting the site from a computer or other keyboard enabled device
    //! 2. there are no phone numbers greater than 15 characters if I'm not mistaken according to the E.164 formatting standard
    if (value === "" || (onlyNums.test(value) && valueSplit.length <= 15)) {
      setPhoneNumber({ [event.target.name]: value });
    } else {
      event.preventDefault();
    }
  };

  // ! THIS WILL ROUTE TO USER ACCOUNT IF THE CODE IS CORRECT
  useEffect(() => {
    // console.log("RUNNING FINAL-CODE CONFIRMATION USE-EFFECT");
    const finalCode = codeFill.join("");

    if (finalCode.match(/[\d]{6}/)) {
      googleConfirmationResult
        .confirm(finalCode)
        .then((result) => {
          // User signed in successfully.
          const resetStates = () => {
            setVerifCodeErrors({});
            setLoginSuccess(true);
            setGooError({});
            router.push("/user/account");
          };

          resetStates();
        })
        .catch((error) => {
          console.log(
            "error trying to finish the phone Sign In process: ",
            error
          );
          setVerifCodeErrors(error);
          setLoginSuccess(false);
        });
      // ...
    }
  }, [codeFill]);

  const setVerificationCode = (event, slot, inputs) => {
    const num = event.target.value;

    // if the code entered is not a number show some error message
    if (/[^0-9]/.test(num)) return;

    const newCode = [...codeFill];
    newCode[slot] = num;
    setCodeFill(newCode);

    if (slot !== 6 - 1) {
      inputs.current[slot + 1].focus();
    }

    if (newCode.every((num) => num !== "")) {
      newCode.join("");
    }
  };

  const onKeyUp = (event, slot, inputs) => {
    if (event.keyCode === 8 && !codeFill[slot] && slot !== 0) {
      const newCode = [...codeFill];
      newCode[slot - 1] = "";
      setCodeFill(newCode);
      inputs.current[slot - 1].focus();
    }
  };

  useEffect(() => {
    switch (verifCodeErrors.code) {
      case "auth/invalid-verification-code":
        setGooError({
          error:
            "Codigo incorrecto, revise los numeros nuevamente, o pida un nuevo codigo.",
        });
        break;
      case "auth/code-expired":
        setGooError({ error: "El codigo ha expirado! Pida un nuevo codigo" });
      case "auth/too-many-requests":
        setGooError({
          error:
            "Hemos detectado actividad inusual. Por favor contacte a nuestro equipo de support",
        });
      case "auth/missing-verification-code":
        setGooError({
          error: "El codigo de verificacion esta en blanco. Llene los cuadros",
        });
      default:
        break;
    }
  }, [verifCodeErrors]);

  return {
    setCaptcha,
    setCodeFill,
    twilioError,
    handleChange,
    setPhoneNumber,
    handleSubmit,
    phoneNumber,
    errors,
    isLoading,
    saveAppVerifier,
    nationalNumber,
    setVerificationCode,
    codeFill,
    onKeyUp,
    verifCodeErrors,
    setSaveAppVerifier,
    setVerifCodeErrors,
    loginSuccess,
    gooError,
  };
};

export default usePhoneLogin;
