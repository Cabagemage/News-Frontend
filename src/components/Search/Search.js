import React from "react";
import "./search/search.css";

function Search() {
  return (
    <div className="search">
      <input className="search__input" placeholder="Найти"></input>
      <button className="button button_place_search">Искать</button>
    </div>
  );
}

export default Search;
