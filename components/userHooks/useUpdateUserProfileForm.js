import { useState, useEffect } from "react";
import updateProfileFormValidation from "../utils/updateProfileFormValidation";
import { useAuth } from "../../context/useAuth";
import firebase from "../../config/firebaseClient";
import { useRouter } from "next/router";
import { verifyAddress } from "../utils/verifyAddress";
import { useGlobalError } from "../../context/useGlobalErrorNotification";

//
export const useUpdateUserProfileForm = () => {
  const router = useRouter();
  const currUser = firebase.auth().currentUser;
  const [values, setValues] = useState({});
  const { dbUser } = useAuth();
  const [errors, setErrors] = useState({});
  // console.log("errors: ", errors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { show, setShow, message, setMessage } = useGlobalError();

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      // proceed tp update the user
      firebase
        .firestore()
        .doc(`users/${currUser.uid}`)
        .update({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          birthDate: values.birthDate,
          address: {
            street: values.address.street,
            city: values.address.city,
            state: values.address.state,
            zip: values.address.zip,
            country: values.address.country,
          },
        })
        .then(() => {
          console.log("user profile updated!");
          router.push("/user/profile");
        })
        .catch((err) => {
          console.log(err);
          setShow(true);
          setMessage(
            "No hemos podido actualizar el usuario, intentelo de nuevo"
          );
        });
    }
  }, [errors, isSubmitting]);

  useEffect(() => {
    setValues(dbUser);
    setIsSubmitting(false);
  }, []);

  useEffect(() => {
    setErrors(updateProfileFormValidation(values));
    // verifyAddress(values);
    setIsSubmitting(false);
  }, [values]);

  const handleChange = (event, country) => {
    if (event) event.persist();
    const name = event.target.name;

    if (country) {
      setValues((values) => ({
        ...values,
        address: {
          ...values.address,
          country: country,
        },
      }));
    }

    const updateUserState = () => {
      return setValues((values) => ({
        ...values,
        address: {
          ...values.address,
          [name]: event.target.value,
        },
      }));
    };

    switch (name) {
      case "street":
        updateUserState();
        break;
      case "city":
        updateUserState();
        break;
      case "state":
        updateUserState();
        break;
      case "zip":
        updateUserState();
        break;
      default:
        setValues((values) => ({
          ...values,
          [name]: event.target.value,
        }));
        break;
    }
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    // console.log("submitting form");
    setIsSubmitting(true);
  };

  return {
    errors,
    values,
    handleChange,
    handleSubmit,
    show,
    setShow,
    message,
    setMessage,
  };
};
