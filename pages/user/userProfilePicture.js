import { createRef, Fragment } from "react";
import { useUploadPicture } from "../../context/useProvidePicture";

//
const UserProfilePicture = (props) => {
  const { imgClass, photo } = props;
  const uploadFileRef = createRef();
  const { handleFiles } = useUploadPicture();

  //
  return (
    <Fragment>
      <input
        onClick={(event) => (event.target.value = null)}
        onChange={handleFiles}
        id="fileInput"
        type="file"
        accept="image/*"
        hidden
        ref={uploadFileRef}
      />

      <button
        className="focus:outline-none"
        type="button"
        onClick={() => uploadFileRef.current && uploadFileRef.current.click()}
      >
        <div className="shadow-lg bg-gradient-to-tr from-blue-400 to-green-500 p-1 rounded-full sm:hidden">
          {photo !== null ? (
            <div className="bg-gray-50 p-0.5 rounded-full sm:hidden">
              <div className="relative">
                <img
                  className={imgClass}
                  src={photo}
                  alt="user profile picture"
                />
                <div className="absolute top-0 right-0 -mr-4">
                  <div className="shadow p-2 bg-gray-100 flex items-center justify-center rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="sm:hidden bg-gray-50 p-0.5 rounded-full">
              <div className="relative h-16 w-16 bg-gray-200 rounded-full sm:hidden flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="absolute top-0 right-0 -mr-4">
                  <div className="shadow p-2 bg-gray-300 flex items-center justify-center rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </button>
    </Fragment>
  );
};

export default UserProfilePicture;
