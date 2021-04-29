import { useOnboarding } from "../../components/userHooks/useOnboarding";
import SlideOverOnboarding from "./onboarding_slideOver";
import OnboardingSteps from "./onboarding_steps";
import OnboardingStepsFormValidation from "../../components/userHooks/onboardingStepsFormValidation";
import { useRequireAuth } from "../../config/useRequireAuth";
import { useRouter } from "next/router";

const Onboarding = () => {
  const router = useRouter();
  const {
    userInfoSteps,
    errors,
    handleUserInfoSteps,
    submitUserInfoSteps,
    handleCancelSteps,
    slideOver,
    setSlideOver,
  } = useOnboarding(OnboardingStepsFormValidation);

  const onboardGuide = [
    {
      header: "Informacion Personal",
      text: "Nos ayuda a personalizar ofertas exclusivas para ti.",

      fn: () => setSlideOver(true),
    },
    {
      header: "Contacto",
      text: "Nos ayuda a contactarte en eventos inesperados.",

      fn: () => setSlideOver(true),
    },
  ];

  const { user } = useRequireAuth();
  console.log("user on onboarding: ", user);

  //
  return (
    <>
      <div>
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-center mt-12">
            <img
              src="/young_men.gif"
              className="w-auto h-20 object-cover"
              alt="young men"
            />
            <img
              src="/young_women.gif"
              className="w-auto h-20 object-cover"
              alt="young women"
            />
          </div>
          <h3 className="tracking-wider mt-6 mb-12 text-center text-3xl font-bold leading-8 text-gray-700 px-3">
            Solo 2 pasos mas para tener tu cuenta lista!
          </h3>
        </div>
        <div className="bg-blue-50 pb-16 pt-6 space-y-12">
          {!userInfoSteps.step1.completed && !userInfoSteps.step2.completed ? (
            <OnboardingSteps
              onboardGuide={onboardGuide}
              color="no_steps_completed"
            />
          ) : !userInfoSteps.step2.completed ? (
            <OnboardingSteps
              onboardGuide={onboardGuide}
              color="step1_completed"
            />
          ) : userInfoSteps.step1.completed && userInfoSteps.step2.completed ? (
            <OnboardingSteps
              onboardGuide={onboardGuide}
              color="step1_and_step2_completed"
            />
          ) : (
            <div />
          )}
        </div>
      </div>
      <SlideOverOnboarding
        errors={errors}
        slideOver={slideOver}
        setSlideOver={setSlideOver}
        userInfoSteps={userInfoSteps}
        handleUserInfoSteps={handleUserInfoSteps}
        submitUserInfoSteps={submitUserInfoSteps}
        handleCancelSteps={handleCancelSteps}
      />
    </>
  );
};

export default Onboarding;
