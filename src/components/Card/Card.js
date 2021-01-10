import React, { useState, useContext } from "react";
import testImage from "../../images/test.png";
import "./card/card.css";
import { currentUserContext } from "../../contexts/currentUserContext";

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
}) {
  const [isShown, setIsShown] = useState(false);
  const phraseSub = text.substring(0, 20) + "...";
  const titleCut = title.substring(0, 20) + "...";
  const options = { day: "numeric", month: "long", year: "numeric" };
  const newsDate = new Date(date);
  const currentUser = useContext(currentUserContext);
  const handleDelete = (e) => {
    e.preventDefault();
    currentUser.handleDeleteCard(id);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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
  };
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
          className="card__icon card__icon_function_favorite"
          onClick={handleSubmit}
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
