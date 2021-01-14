import React, { useState, useContext } from "react";
import testImage from "../../images/test.png";
import { useLocation } from "react-router-dom";

import "./card/card.css";
import { currentUserContext } from "../../contexts/currentUserContext";

function Card({
  loggedIn,
  keyword,
  source,
  savedCard,
  title,
  image,
  text,
  link,
  date,
  id,
  owner,
  handleDeleteCard,
}) {
  const [isShown, setIsShown] = useState(false);
  const [isFavorite, setFavorite] = useState(false);
  const phraseSub = text.substring(0, 20) + "...";
  const titleCut = title.substring(0, 20) + "...";
  const options = { day: "numeric", month: "long", year: "numeric" };
  const newsDate = new Date(date);
  const currentUser = useContext(currentUserContext);
  const { path } = useLocation();
  const cardFavoritedClassName = `card__icon ${
    isFavorite ? "card__icon_status_bookmarked" : "card__icon_function_favorite"
  }`;

  function handleDelete() {
    setFavorite(false);
    console.log(id)
    handleDeleteCard(id);
  }

  function handleSubmit() {
    currentUser.handleSaveCard({
      keyword: keyword,
      title: titleCut,
      text: phraseSub,
      date: newsDate,
      source: source,
      link: link,
      image: image,
    });
    console.log({
      keyword: keyword,
      title: title,
      text: phraseSub,
      date: newsDate,
      source: link,
      link: link,
      image: image,
    });
    setFavorite(true);
  }

  return (
    <div className="card">
      <img className="card__image" src={image} alt={title}></img>
      {!loggedIn ? <span className="card__keyword">{keyword}</span> : null}

      {!loggedIn ? (
        <button
          className="card__icon card__icon_function_remove"
          onClick={handleDelete}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        ></button>
      ) : (
        <button
          className={cardFavoritedClassName}
          onClick={isFavorite ? handleDelete : handleSubmit}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        ></button>
      )}
      {isShown && !loggedIn ? (
        <p className="card__hover">Войдите, чтобы сохранять статьи</p>
      ) : null}

      {isShown && !loggedIn && (
        <p className="card__hover">Убрать из сохранённых</p>
      )}
      <div className="card__text">
        <p className="card__date">{newsDate.toLocaleString("ru", options)}</p>
        <h2 className="card__article">{titleCut}</h2>
        <p className="card__about"> {phraseSub}</p>

        <a href={link} className="card__source">
          {source}
        </a>
      </div>
    </div>
  );
}

export default Card;
