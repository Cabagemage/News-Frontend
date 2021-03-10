import React from "react";
import "./search/search.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchCards, getKeyword } from "../../redux/actions";
function Search() {
  const keyword = useSelector((state) => state.news.keyword);

  const dispatch = useDispatch();
  function submitSearch(e) {
    e.preventDefault();
    //  Если есть кейворд, то поиск включается, если кейворда нет - то не включается. 
    if (keyword) {
      dispatch(fetchCards(keyword));
    }
  }
  return (
    <form className="search">
      <input
        className="search__input"
        placeholder="Найти"
        type="text"
        value={keyword}
        onChange={(e) => dispatch(getKeyword(e.target.value))}
      ></input>
      <button onClick={submitSearch} className="button button_place_search">
        Искать
      </button>
    </form>
  );
}
export default Search;
