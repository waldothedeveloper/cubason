import { useEffect, useState } from "react";
import firebase from "../config/firebaseClient";

export const useFindOrCreateFireStoreUserAccount = (user) => {
  const [dbUser, setDbUser] = useState(null);
  console.log("dbUser: ", dbUser);
  const [uid, setUid] = useState(null);

  const createNewDbUser = (userDoc) => {
    userDoc
      .set({
        firstName: null,
        lastName: null,
        email: null,
        emailVerified: false,
        phoneNumber: user.phoneNumber,
        photoURL: null,
        currency: "USD",
        updateProfile: { requested: false },
        history: {
          nauta_topUp: [],
          cellphone_topUp: [],
        },
      })
      .then(() => {
        console.log("user created ok");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (user) {
      const { uid } = user;
      setUid(uid);
    }
    if (!uid) return;

    const userDoc = firebase.firestore().doc(`users/${uid}`);
    //
    const unsubscribe = firebase
      .firestore()
      .doc(`users/${uid}`)
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            setDbUser(doc.data());
          } else {
            // create the firestore user
            createNewDbUser(userDoc);
          }
        },
        (err) => console.log("error with snapshot listener", err)
      );

    return () => {
      setUid(null);
      setDbUser(null);
      unsubscribe();
    };
  }, [uid, user]);

  return { dbUser };
};
