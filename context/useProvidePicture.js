import { createContext, useContext } from "react";
import { usePicture } from "../components/userHooks/usePicture";

const pictureContext = createContext();

export const ProvideUploadPicture = ({ children }) => {
  const {
    fileInfo,
    handleFiles,
    picErrors,
    setPicErrors,
    progress,
    show,
    setShow,
  } = usePicture();
  return (
    <pictureContext.Provider
      value={{
        fileInfo: fileInfo,
        handleFiles: handleFiles,
        picErrors: picErrors,
        setPicErrors: setPicErrors,
        progress: progress,
        show: show,
        setShow: setShow,
      }}
    >
      {children}
    </pictureContext.Provider>
  );
};

export const useUploadPicture = () => useContext(pictureContext);
