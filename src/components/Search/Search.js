import React, { useState } from "react";
import "./search/search.css";
import { Form, Field, Submit } from "../../hooks/Validator";

function Search({ handleGetCards, keyword, setKeyword }) {
  const [error, setError] = useState(false);
  const validators = {
    search: {
      required: (value) => {
        return value === "";
      },
      minLength: (value) => {
        return value.length < 3;
      },
    },
    name: {
      required: (value) => {
        return value === "";
      },
      minLength: (value) => {
        return value.length < 3;
      },
    },
  };
  // const settingErrors = (err) => {
  //   if (err === undefined) {
  //     return setError({});
  //   }
  //   if (err.required) {
  //     return setError("Пошел нахуй");
  //   }
  // };

  const formMarkup = (
    <Form
      className="search"
      onSubmit={(values) => {
        setKeyword(values.keyword);
        handleGetCards(values.keyword);
      }}
      validators={validators}
      onChange={(values) => {
        setKeyword(values.search);
      }}
    >
      <Field className="search__input" name="search">
        {({ onChange, errors, ...inputProps }) => {
          return (
            <div>
              <input
                onChange={(e) => onChange(e.target.value, setError(true))}
                {...inputProps}
              />
              {errors === undefined
                ? ""
                : errors.required &&
                  error && (
                    <span className="search__error">Поле нужно заполнить</span>
                  )}
              {errors === undefined
                ? ""
                : errors.minLength &&
                  !errors.required &&
                  error && (
                    <span className="search__error">Минимум три символа</span>
                  )}
            </div>
          );
        }}
      </Field>
      <Submit>
        {(isFormInvalid) => (
          <button
            disabled={isFormInvalid}
            type="submit"
            className={isFormInvalid ? "button button_place_search_disabled" :"button button_place_search"}
          >
            Искать
          </button>
        )}
      </Submit>
    </Form>
  );
  return formMarkup;
  // return (
  //   <form className="search">
  //     <input
  //       required
  //       className="search__input"
  //       placeholder="Найти"
  //       type="text"
  //       value={keyword}
  //       onChange={(e) => setKeyword(e.target.value)}
  //     ></input>
  //     <button onClick={submitSearch} className="button button_place_search">
  //       Искать
  //     </button>
  //   </form>
  // );
}

export default Search;
