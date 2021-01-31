import React from "react";
import "./search/search.css";
import {useDispatch} from 'react-redux'
import {fetchCards} from '../../redux/actions'
function Search({keyword, setKeyword }) {

  const dispatch = useDispatch()
  function submitSearch(e){
    e.preventDefault();
    if(keyword){
      dispatch(fetchCards(keyword))
    }
  }
  return (
    <form className="search">
      <input
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
  )
  }
export default Search;