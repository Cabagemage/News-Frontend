import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./card/card.css";
import { options } from "../../utils/utils";
import { createSaveNews } from "../../redux/actions";
import { useSelector } from "react-redux";
function Card({
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
  const login = useSelector((state) => state.app.loggedIn);
  const [isShown, setIsShown] = useState(false); // Сокрытие и показ всплывающего сообщения
  const [isFavorite, setFavorite] = useState(false); // likes
  const newsDate = new Date(date); // Время
  const path = useLocation();
  const savedCardsPath = path.pathname === "/saved-news";

  // Выставление класса иконки лайка в зависимости от условий.
  const cardFavoritedClassName = `card__icon ${
    isFavorite && login && !savedCardsPath
      ? "card__icon_status_bookmarked"
      : "card__icon_function_favorite"
  }`;

  // Убираем флажок, после чего удаляем карточка по айдишнику
  function handleDelete() {
    setFavorite(false);
    handleDeleteCard(id);
  }
  function handleSubmit() {
    handleSaveCard({
      keyword: keyword ? keyword : "Разное", // "Разное" будет добавляться в качестве ключевого слова, в случае пустого поискового запроса
      title: title.substring(0, 80) + "...", // Сокращаем размер строки до 80 символов + добавляем троеточие
      text: text.substring(0, 72) + "...", // Тоже самое
      date: newsDate, // Дата
      source: source, // Источник
      link: link, // Ссылка
      image: image, // Изображение
      owner: owner, // Владелец.
    });
    createSaveNews(handleSaveCard)
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
            : "Войдите, чтобы сохранять статьи" && login
            ? "Сохранить статью"
            : "Войдите, чтобы сохранять статьи"}
        </p>
      ) : null}

      <div className="card__text">
        <p className="card__date">{newsDate.toLocaleString("ru", options)}</p>
        <a href={link} target="_blank" className="card__link">
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
