import { useRouter } from "next/router";

const FinishAccount = () => {
  const router = useRouter();
  return (
    <>
      <div>FINISH THE ACCOUNT</div>
      <button onClick={() => router.push("/user/onboarding")}>
        FInish here
      </button>
    </>
  );
};

export default FinishAccount;
