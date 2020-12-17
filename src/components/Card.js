import React, {useState, useEffect} from "react";
import {Link, NavLink, Route } from 'react-router-dom';
import testImage from '../images/test.png'
import "../App.css";

function Card() {
  return (
    <div className="card">
      <img className="card__image" src={testImage}></img>
      <span className="card__keyword">Природа</span>
      <button className="card__remove"></button>
      <p className="card__date">12 августа</p>
      <h2 className="card__article">OneTwoThree</h2>
      <p className="card__text">История этой карточки очень любопытная</p>
      <p className="card__source">me</p>
   </div>
  )
}

export default Card;