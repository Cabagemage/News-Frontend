import React, {useState, useEffect} from "react";
import {Link, NavLink, Route } from 'react-router-dom';
import Card from '../Card/Card'
import "./cards/cards.css";

function Cards({loggedIn}) {
  return (
    <>
    <div className="layout__cards">
      <h2 className="cards__results">Результаты поиска</h2>
    <div className="cards">
      <Card loggedIn={loggedIn} />
      <Card loggedIn={loggedIn} />
      <Card loggedIn={loggedIn} />
      <Card loggedIn={loggedIn} />
      <Card loggedIn={loggedIn} />
      <Card loggedIn={loggedIn} />
   </div>
   </div>
   </>
  )
}

export default Cards;