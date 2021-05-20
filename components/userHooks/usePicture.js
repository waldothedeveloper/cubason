import { useState } from "react";
import firebase from "../../config/firebaseClient";
import { readableFileSize } from "../utils/readableFileSize";

export const usePicture = () => {
  const [show, setShow] = useState(false);
  const [fileInfo, setFileInfo] = useState({});
  const [progress, setProgress] = useState(0);
  const [picErrors, setPicErrors] = useState({});
  const storage = firebase.storage();
  const storageRef = storage.ref();
  const currUser = firebase.auth().currentUser;

  const handleFiles = (event) => {
    const fileList = event.target.files[0];
    // console.log("fileList: ", fileList);
    const metadata = {
      contentType: fileList.type,
    };

    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    if (!allowedExtensions.exec(fileList.name)) {
      setPicErrors({
        // prettier-ignore
        "picture":
          "Este archivo no esta permitido. Escoje una foto con formato .jpg, .jpeg, .png, .gif",
      });
    } else {
      const fileSize = readableFileSize(fileList.size);
      setFileInfo({ size: fileSize, name: fileList.name });
      setShow(true);
      setPicErrors({});
      // start the upload (should I use Cloudinary for asset optimization and better CDN serving?)
      const uploadTask = storageRef
        .child("images/" + fileList.name)
        .put(fileList, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(() => Number.parseInt(progress, 10));
          // console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // eslint-disable-next-line
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              console.log("Upload NOT Authorized", error);
              break;
            case "storage/canceled":
              // User canceled the upload
              console.log("Upload canceled error", error);
              break;
            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              console.log("Unknown error", error.serverResponse);
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            if (currUser.uid) {
              firebase
                .firestore()
                .doc(`users/${currUser.uid}`)
                .update({
                  photoURL: downloadURL,
                })
                .then(() => {
                  console.log("dbUser picture has been updated");
                  currUser
                    .updateProfile({
                      photoURL: downloadURL,
                    })
                    .then(() => {
                      console.log("user picture also updated");
                    })
                    .catch((e) =>
                      console.log(
                        "could not update the current user photoURL",
                        e
                      )
                    );
                })
                .catch((err) =>
                  console.log("Could not update the photoURL of dbUser", err)
                );
            } else {
              console.error("ERROR: check the currUser:", currUser);
            }
          });
        }
      );
    }
  };

  return {
    fileInfo,
    handleFiles,
    picErrors,
    setPicErrors,
    progress,
    show,
    setShow,
  };
};
