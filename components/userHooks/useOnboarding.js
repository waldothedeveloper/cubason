import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import firebase from "../../config/firebaseClient";
import { useGlobalError } from "../../context/useGlobalErrorNotification";

export const useOnboarding = (validate) => {
  const currUser = firebase.auth().currentUser;

  const router = useRouter();
  const [slideOver, setSlideOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log("isSubmitting: ", isSubmitting);
  const [errors, setErrors] = useState({});
  console.log("errors: ", errors);
  const { setShow, setMessage } = useGlobalError();

  const [userInfoSteps, setUserInfoSteps] = useState({
    step1: {
      completed: false,
      panelTitle: "PASO 1 - Informacion Personal",
      panelText:
        "Otorgarle una experiencia fantastica es nuestra prioridad. Queremos conocerte.",
    },
    step2: {
      completed: false,
      panelTitle: "PASO 2 - Informacion de Contacto",
      panelText:
        "Esto nos permite ofrecerle ofertas exclusivas. Usted es nuestra prioridad.",
    },
  });

  console.log("userInfoSteps", userInfoSteps);
  // validate erros while user type
  useEffect(() => {
    setIsSubmitting(false);
    if (
      userInfoSteps.step1.first_name !== undefined ||
      userInfoSteps.step1.last_name !== undefined ||
      userInfoSteps.step2.email !== undefined
    ) {
      setErrors(validate(userInfoSteps));
    }
  }, [userInfoSteps]);

  // if no errors on the form then allow submit
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      allowOnboarding();
    }
  }, [errors]);

  // handle changes for two steps
  const handleUserInfoSteps = (event) => {
    if (event) event.persist();

    if (
      event.target.name === "first_name" ||
      event.target.name === "last_name"
    ) {
      setUserInfoSteps((prevState) => ({
        ...prevState,
        step1: { ...prevState.step1, [event.target.name]: event.target.value },
      }));
    }

    //! only if step1 is completed
    if (event.target.name === "email" && userInfoSteps.step1.completed) {
      setUserInfoSteps((prevState) => ({
        ...prevState,
        step2: { ...prevState.step2, [event.target.name]: event.target.value },
      }));
    }
  };

  // cancel progress form for either steps
  const handleCancelSteps = (event) => {
    if (event) event.persist();

    if (userInfoSteps.step1.completed) {
      setUserInfoSteps((prevState) => ({
        ...prevState,

        step2: {
          completed: false,
          panelTitle: "PASO 2 - Informacion de Contacto",
          panelText:
            "Esto nos permite ofrecerle ofertas exclusivas. Recompensamos a nuestros clientes fieles",
        },
      }));
      setErrors({});
      setSlideOver(false);
    } else {
      setUserInfoSteps({
        step1: {
          completed: false,
          panelTitle: "PASO 1 - Informacion Personal",
          panelText:
            "Otorgarle una experiencia fantastica es nuestra prioridad. Queremos conocerte.",
        },
        step2: {
          completed: false,
          panelTitle: "PASO 2 - Informacion de Contacto",
          panelText:
            "Esto nos permite ofrecerle ofertas exclusivas. Recompensamos a nuestros clientes fieles",
        },
      });
      setErrors({});
      setSlideOver(false);
    }
  };

  const allowOnboarding = () => {
    if (userInfoSteps.step1.first_name && userInfoSteps.step1.last_name) {
      setSlideOver(false);
      // then complete the step
      setUserInfoSteps((prevState) => ({
        ...prevState,
        step1: { ...prevState.step1, completed: true },
      }));
      //
      firebase
        .firestore()
        .doc(`users/${currUser.uid}`)
        .update({
          firstName: userInfoSteps.step1.first_name,
          lastName: userInfoSteps.step1.last_name,
        })
        .then(() => {
          console.log("onboarding user first and lastname updated");
          // update user first and last name
          currUser
            .updateProfile({
              displayName: `${userInfoSteps.step1.first_name} ${userInfoSteps.step1.last_name}`,
            })
            .then(() => {
              setIsSubmitting(false);
            })
            .catch((err) =>
              console.log("error trying to update currUser", err)
            );
        })
        .catch((err) =>
          console.log("could not update the onboarding user", err)
        );
    }

    //! only if step1 is completed
    if (userInfoSteps.step1.completed && userInfoSteps.step2.email) {
      firebase
        .firestore()
        .doc(`users/${currUser.uid}`)
        .update({
          email: userInfoSteps.step2.email,
        })
        .then(() => {
          console.log("email for onboarding user updated!");
          //! FIX THIS BRO
          // {code: "auth/requires-recent-login", message: "This operation is sensitive and requires recent au…ation. Log in again before retrying this request.", a: null}
          // a: null
          // code: "auth/requires-recent-login"
          // message: "This operation is sensitive and requires recent authentication. Log in again before retrying this request."
          // __proto__: Error

          currUser
            .updateEmail(userInfoSteps.step2.email)
            .then(() => {
              // then mark step2 as completed
              setUserInfoSteps((prevState) => ({
                ...prevState,
                step2: { ...prevState.step2, completed: true },
              }));
              setIsSubmitting(false);
              setSlideOver(false);

              //
              router.push("/user/account");
            })
            .catch((err) => {
              console.log("could not update currentUser email", err);
              if (err.code === "auth/requires-recent-login") {
                setShow(true);
                setMessage(
                  "Actualizar el correo es una operacion sensible. Por favor entre a su cuenta nuevamente para completar este paso"
                );
                router.push("/auth/login");
              }
            });
        })
        .catch((err) =>
          console.log("could not update the onboarding user", err)
        );
    }
  };

  // Submit form for two steps
  const submitUserInfoSteps = (event) => {
    if (event) event.preventDefault();

    setErrors(validate(userInfoSteps));
    setIsSubmitting(true);
  };

  return {
    userInfoSteps,
    errors,
    handleUserInfoSteps,
    submitUserInfoSteps,
    handleCancelSteps,
    slideOver,
    setSlideOver,
  };
};
