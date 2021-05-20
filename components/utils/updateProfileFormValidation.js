import { currDate } from "../../pages/helpers/currDate";

const updateProfileFormValidation = (values) => {
  let errors = {};
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  if (values && !values.firstName) {
    errors.firstName = "El nombre no puede estar en blanco";
  }

  if (values && !values.lastName) {
    errors.lastName = "El apellido no puede estar en blanco";
  }

  if (values && !emailRegex.test(values.email)) {
    errors.email = "El correo electronico no es valido";
  }

  if (values && !values.birthDate) {
    errors.birthDate = "Por favor introduzca su fecha de cumpleaños";
  }

  if (values && values.birthDate) {
    const chosenBirthDate = Date.parse(values.birthDate);
    const today = Date.parse(currDate());

    if (chosenBirthDate > today) {
      errors.birthDate = "Usted nacio en el futuro?";
    }
  }

  if (values && values.address) {
    if (values.address.zip.length > 0 && !/^\d+$/.test(values.address.zip)) {
      errors.zip = "El codigo postal debe contener solo numeros";
    }
  }

  return errors;
};

export default updateProfileFormValidation;
