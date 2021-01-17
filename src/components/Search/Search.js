import React, { useContext } from "react";
import "./search/search.css";
import { currentUserContext } from "../../contexts/currentUserContext";

function Search({handleGetCards}) {
  const currentUser = useContext(currentUserContext);

  function submitSearch(e) {
    e.preventDefault();
    console.log("test");
    handleGetCards();
  }

  return (
    <form className="search">
      <input
        required
        className="search__input"
        placeholder="Найти"
        type="text"
        value={currentUser.keyword}
        onChange={(e) => currentUser.setKeyword(e.target.value)}
      ></input>
      <button onClick={submitSearch} className="button button_place_search">
        Искать
      </button>
    </form>
  );
}

export default Search;
