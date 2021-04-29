import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import validate from "../authHooks/phoneLoginValidation";
import { useTwilioLookUp } from "../authHooks/useTwilioLookUp";
import { useAuth } from "../../context/useAuth";
import firebase from "../../config/firebaseClient";

export const useProvideLogin = () => {
  const router = useRouter();
  const onlyNums = /^[\+][0-9\b]+$/g;
  const [values, setValues] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [phonePrefix, setPhonePrefix] = useState({
    country_name: "Estados Unidos",
    ISO2: "US",
    phone_code: 1,
  });
  const [errors, setErrors] = useState(null);
  const twilioData = useTwilioLookUp(values.phone || "");
  const [captcha, setCaptcha] = useState(false);
  const { signInWithPhone } = useAuth();

  //
  useEffect(() => {
    if (values.phone) {
      setErrors(validate(values));
    }
  }, [values]);

  const handleChange = (event) => {
    if (event) event.persist();

    const inputValue = event.target.value;
    const valueSplit = inputValue.split("");
    const prefix = "+";
    const updatedInput = prefix + phonePrefix.phone_code;

    // this makes possible that the country code is not editable
    if (inputValue.slice(0, updatedInput.length) !== updatedInput) return;

    if (
      values === {} ||
      (onlyNums.test(inputValue) && valueSplit.length <= 15)
    ) {
      setValues({ [event.target.name]: inputValue });
    }
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    if (
      Object.keys(errors).length === 0 &&
      twilioData.data &&
      twilioData.data.national_format &&
      captcha
    ) {
      const appVerifier = window.recaptchaVerifier;

      //
      signInWithPhone(values.phone, appVerifier)
        .then(() => {
          setErrors(null);
          router.push("/auth/two-factor");
          console.log(
            "passed the routing to two-factor but still rendering login"
          );
        })
        .catch((err) => console.log(err));
    }
  };

  return {
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
  };
};
