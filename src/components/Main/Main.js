import React, {useState, useEffect} from "react";
import { NavLink, Route } from 'react-router-dom';
import Search from "../Search/Search"
import "./main/main.css";

function Main() {
  return (
    <div className="main">
   <h2 className="main__title">Что творится в мире?</h2>
   <h3 className="main__info">Находите самые свежие статьи на любую тему
   и сохраняйте в своем личном кабинете</h3>
   <Search />
   </div>
  )
}

export default Main;
