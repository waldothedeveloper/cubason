const validate = (values, captcha) => {
  let errors = {};

  // ...
  if (!values.phone) {
    errors.phone = "El telefono no es valido.";
  }

  if (values.phone && values.phone.replace("+", "").length < 5) {
    errors.phone = "El telefono debe tener minimo 5 caracteres";
  }

  // if (captcha === false) {
  //   errors.captchaValidation = "Por favor complete esta validacion";
  // }

  return errors;
};

export default validate;
