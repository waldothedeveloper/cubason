import { useState, useEffect } from "react";
import firebase from "../../config/firebaseClient";

export const FireStoreUser = (user) => {
  const [fireStUser, setFireStUser] = useState(null);
  console.log("fireStUser: ", fireStUser);
  const [gettingFireStUser, setGettingFireStUser] = useState(true);
  console.log("gettingFireStUser: ", gettingFireStUser);
  const db = firebase.firestore();

  useEffect(() => {
    if (user && user.uid !== null) {
      const unsubscriber = db
        .collection("users")
        .doc(user.uid)
        .onSnapshot((doc) => {
          try {
            if (doc.exists) {
              // doc.data()
              setFireStUser(doc.data());
            } else {
              // create the new user
              console.log("The user does not exist");
            }
          } catch (error) {
            console.log("error getting the FireStoreUser data");
          } finally {
            setGettingFireStUser(false);
          }
        });

      return () => unsubscriber();
    }
  }, [user]);

  return { gettingFireStUser, fireStUser };
};
