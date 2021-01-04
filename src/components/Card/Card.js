import React, { useState } from "react";
import testImage from "../../images/test.png";
import "./card/card.css";

function Card({ loggedIn, keyword, title,  image, description, link, date}) {
  const [isShown, setIsShown] = useState(false);




  const phraseSub = description.substring(0, 130) + "...";
  const titleCut = title.substring(0, 64) + "...";

  return (
    <div className="card">
      <img className="card__image"
      src={image}
      alt={title}></img>
      {loggedIn ? <span className="card__keyword">{keyword}</span> : null}

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
        <p className="card__date">{date}</p>
        <h2 className="card__article">{titleCut}</h2>
        <p className="card__about"> {phraseSub}</p>

        <a href={link} className="card__source">
         {link}
        </a>
      </div>
    </div>
  );
}

export default Card;
