// export const validators = {
//   search: {
//     required: (value) => {
//       return value === "";
//     },
//     minLength: (value) => {
//       return value.length < 3;
//     },
//     name: {
//       required: (value) => {
//         return value === "";
//       },
//       minLength: (value) => {
//         return value < 2;
//       },
//     },
//     email: {
//       required: (value) => {
//         return value === "";
//       },
//       isEmail: (value) => {
//         return value === "\b[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}\b";
//       },
//     },
//     password: {
//       required: (value) => {
//         return value === "";
//       },
//       minLength: (value) => {
//         return value.length < 3;
//       },
//     },
//   },
// };

export default function validate(values) {
  let errors = {};
  if (!values.email) {
    errors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be 8 or more characters";
  }
  return errors;
}
