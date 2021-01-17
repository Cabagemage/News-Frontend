import React from "react";
import "./search/search.css";

function Search({ handleGetCards, keyword, setKeyword }) {
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
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      ></input>
      <button onClick={submitSearch} className="button button_place_search">
        Искать
      </button>
    </form>
  );
}

export default Search;
