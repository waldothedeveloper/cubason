import { useState } from "react";

export const useProvideGlobalError = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  return { show, setShow, message, setMessage };
};
