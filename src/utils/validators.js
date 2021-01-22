export const validators = {
  search: {
    required: (value) => {
      return value === "";
    },
    minLength: (value) => {
      return value.length < 3;
    },
    name: {
      required: (value) => {
        return value === "";
      },
      minLength: (value) => {
        return value < 2;
      },
    },
    email: {
      required: (value) => {
        return value === "";
      },
      isEmail: (value) => {
        return value === "\b[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}\b";
      },
    },
    password: {
      required: (value) => {
        return value === "";
      },
      minLength: (value) => {
        return value.length < 3;
      },
    },
  },
};
