import React from "react";
import "./search/search.css";

function Search() {
  return (
    <form className="search">
      <input required className="search__input" placeholder="Найти"></input>
      <button className="button button_place_search">Искать</button>
    </form>
  );
}

export default Search;
