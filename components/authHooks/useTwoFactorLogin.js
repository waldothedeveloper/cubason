import { useState, useEffect } from "react";
import { useAuth } from "../../context/useAuth";
import { useRouter } from "next/router";
import { useLogin } from "../authHooks/useLogin";
export const useTwoFactorLogin = () => {
  const router = useRouter();
  const [codeFill, setCodeFill] = useState([...Array(6)].map(() => ""));
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { confirmSignInWithPhone } = useAuth();
  const [errors, setErrors] = useState({});
  const { setValues } = useLogin();

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

  const backToLoginStart = () => {
    router.push("/auth/login");
  };

  // ! ROUTE THE USER TO ITS ACCOUNT
  useEffect(() => {
    const finalCode = codeFill.join("");

    if (finalCode.match(/[\d]{6}/)) {
      confirmSignInWithPhone(finalCode)
        .then(() => {
          // console.log("result: ", result);
          setLoginSuccess(true);
          setValues({});
          setErrors({});
          // console.log("you did it Johnny");
          router.push("/user/account");
        })
        .catch((err) => {
          console.log("err: ", err);
          switch (err.code) {
            case "auth/invalid-verification-code":
              setErrors({
                error:
                  "Codigo incorrecto, revise los numeros nuevamente, o pida un nuevo codigo.",
              });
              break;
            case "auth/code-expired":
              setErrors({
                error: "El codigo ha expirado! Pida un nuevo codigo",
              });
            case "auth/too-many-requests":
              setErrors({
                error:
                  "Hemos detectado actividad inusual. Por favor contacte a nuestro equipo de support",
              });
            case "auth/missing-verification-code":
              setErrors({
                error:
                  "El codigo de verificacion esta en blanco. Llene los cuadros",
              });
            default:
              setErrors({
                error: "Error desconocido. Por favor regrese al inicio",
              });
          }
        });
    }
  }, [codeFill]);

  return {
    codeFill,
    onKeyUp,
    setVerificationCode,
    loginSuccess,
    errors,
    backToLoginStart,
  };
};
