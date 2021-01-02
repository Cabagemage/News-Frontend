import React, { useState } from "react";
import testImage from "../../images/test.png";
import "./card/card.css";

function Card({ loggedIn }) {
  const [isShown, setIsShown] = useState(false);

  const phrase =
    "В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков";
  const phraseSub = phrase.substring(0, 130) + "...";

  return (
    <div className="card">
      <img className="card__image"
      src={testImage}
      alt="растения"></img>
      {loggedIn ? <span className="card__keyword">Природа</span> : null}

      {loggedIn ? (
        <button
          className="card__icon card__icon_function_remove"
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        ></button>
      ) : (
        <button
          className="card__icon card__icon_function_favorite"
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        ></button>
      )}
      {isShown && (
        <p className="card__hover">Войдите, чтобы сохранять статьи</p>
      )}

      {isShown && loggedIn && (
        <p className="card__hover">Убрать из сохранённых</p>
      )}
      <div className="card__text">
        <p className="card__date">12 августа, 2019</p>
        <h2 className="card__article">OneTwoThree</h2>
        <p className="card__about"> {phraseSub}</p>

        <a href="#" className="card__source">
          Медуза
        </a>
      </div>
    </div>
  );
}

export default Card;
