export default function validate(values) {
  let errors = {};
  if (!values.search) {
    errors.search = 'Pole obyazatelno k zapolneniyu';
  } else if (values.search.length < 3) {
    errors.email = 'Мало символов блять';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be 8 or more characters';
  }
  return errors;
};