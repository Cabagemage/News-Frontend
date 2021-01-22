import React, { useState } from "react";
import { useLocation} from "react-router-dom";
import "./card/card.css";

function Card({
  loggedIn,
  keyword,
  source,
  title,
  image,
  text,
  link,
  date,
  id,
  owner,
  handleDeleteCard,
  handleSaveCard,
}) {
  const [isShown, setIsShown] = useState(false);
  const [isFavorite, setFavorite] = useState(false);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const newsDate = new Date(date);
  const path = useLocation();
  const savedCardsPath = path.pathname === "/saved-news";

  const cardFavoritedClassName = `card__icon ${
    isFavorite && loggedIn && !savedCardsPath
      ? "card__icon_status_bookmarked"
      : "card__icon_function_favorite"
  }`;

  function handleDelete() {
    setFavorite(false);
    console.log(id);
    handleDeleteCard(id);
  }

  function handleSubmit() {
    handleSaveCard({
      keyword: keyword,
      title: title.substring(0, 80) + "...",
      text: text.substring(0, 72) + "...",
      date: newsDate,
      source: source,
      link: link,
      image: image,
      owner: owner,
    });
    console.log(source, link);
    setFavorite(true);
  }

  return (
    <div className="card">
      <img className="card__image" src={image} alt={title}></img>
      {savedCardsPath ? <span className="card__keyword">{keyword}</span> : null}

      {savedCardsPath ? (
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
      {isShown ? (
        <p className="card__hover">
          {savedCardsPath
            ? "Убрать из сохранённых"
            : "Войдите, чтобы сохранять статьи" && loggedIn
            ? "Сохранить статью"
            : "Войдите, чтобы сохранять статьи" }
        </p>
      ) : null}

      <div className="card__text">
        <p className="card__date">{newsDate.toLocaleString("ru", options)}</p>
        <a href={link} target="_blank"  className="card__link" >
        <h2 className="card__article">{title}</h2>
        </a>
        <p className="card__about"> {text}</p>

        <a href={link} target="_blank" className="card__source">
          {source}
        </a>
      </div>
    </div>
  );
}

export default Card;
