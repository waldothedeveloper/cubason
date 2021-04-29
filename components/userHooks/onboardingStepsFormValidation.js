const OnboardingStepsFormValidation = (values) => {
  // console.log("values: ", values);
  let errors = {};
  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  if (!values.step1.first_name) {
    errors.first_name = "Por favor entre su nombre";
  }

  if (values.step1.first_name && values.step1.first_name.length === 0) {
    errors.first_name = "El nombre no puede estar en blanco";
  }

  if (!values.step1.last_name) {
    errors.last_name = "Por favor entre su apellido";
  }

  if (values.step1.last_name && values.step1.last_name.length === 0) {
    errors.first_name = "El apellido no puede estar en blanco";
  }

  if (values.step1.completed && !emailRegex.test(values.step2.email)) {
    errors.email = "El correo electronico no es valido";
  }

  return errors;
};

export default OnboardingStepsFormValidation;
