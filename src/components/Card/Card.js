import React from "react";
import testImage from '../../images/test.png'
import "./card/card.css";

function Card({loggedIn}) {
  return (
    <div className="card">
      <img className="card__image" src={testImage}></img>
      {loggedIn ? <span className="card__keyword">Природа</span> : null}
      {loggedIn ?
      <button className="card__icon card__icon_function_remove"></button>
      : <button className="card__icon card__icon_function_favorite"></button>
      }

      <div className="card__text">
      <p className="card__date">12 августа, 2019</p>
      <h2 className="card__article">OneTwoThree</h2>
      <p className="card__about">
      История этой карточки очень любопытная
      </p>
      <p className="card__source">Медуза</p>
      </div>
   </div>
  )
}

export default Card;