import { useEffect, useState } from "react";

const CountDown = () => {
  const [counter, setCounter] = useState(22);

  useEffect(() => {
    const theCounter =
      counter > 0 &&
      setInterval(() => setCounter((counter) => counter - 1), 1000);

    return () => clearInterval(theCounter);
  }, [counter]);

  return { counter };
};

export default CountDown;
