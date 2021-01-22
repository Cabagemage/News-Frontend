import React, { useState, useEffect, useCallback } from "react";
const formContext = React.createContext({});

export const Form = ({
  children,
  className,
  onSubmit,
  validators,
  onChange,
}) => {
  const [formValues, setFormValue] = useState({});
  const [isInvalid, setIsInvalid] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  // поменять на тру
  const onChangeInput = useCallback((name, value) => {
    setFormValue((prevValues) => ({ ...prevValues, [name]: value }));
  }, []);
  // вызов onChange на каждый ввод в форму
  useEffect(() => {
    onChange(formValues);
  }, [formValues, onChange]);
  // вызов валидации на каждый ввод в форму
  useEffect(() => {
    const formKeys = Object.keys(formValues);

    const allErrors = formKeys
      .map((key) => {
        const valueByKey = formValues[key];
        if (!validators[key]) {
          return {};
        }

        const errors = Object.entries(validators[key])

          .map(([errorKey, validatorFn]) => {
            return { [errorKey]: validatorFn(valueByKey) };
          })

          .reduce((acc, item) => ({
            ...acc,
            ...item,
          }));
        return { [key]: errors };
      })

      .reduce(
        (acc, item) => ({
          ...acc,
          ...item,
        }),
        {}
      );
    setFormErrors(allErrors);
  }, [formValues, setFormErrors]);
  //  in - massive
  // of - not index
  useEffect(() => {
    for (const fieldKey in formErrors) {
      const keyErrors = formErrors[fieldKey];
      for (const errorKey in keyErrors) {
        if (keyErrors[errorKey] === true) {
          return setIsInvalid(true);
        }
      }
    }
    setIsInvalid(false);
    return;
  }, [formErrors, setIsInvalid]);
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formValues);
  }
  const formContextValue = { onChangeInput, isInvalid, formErrors };
  return (
    <form onSubmit={handleSubmit} className={className}>
      <formContext.Provider value={formContextValue}>
        {children}
      </formContext.Provider>
    </form>
  );
};

export const Field = ({ children, name, className }) => {
  const [value, setValue] = useState("");
  const { onChangeInput, formErrors } = React.useContext(formContext);

  useEffect(() => {
    onChangeInput(name, value);
  }, [value, name, onChangeInput]);

  return (
    <div>
      {children({
        className,
        type: "text",
        name,
        value,
        onChange: setValue,
        errors: formErrors[name],
      })}
    </div>
  );
};
export const Submit = ({ children }) => {
  const { isInvalid } = React.useContext(formContext);
  return children(isInvalid);
};
