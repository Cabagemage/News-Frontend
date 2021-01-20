import React, { useState, memo } from "react";
import Card from "../Card/Card";
import { useLocation } from "react-router-dom";

import "./cards/cards.css";
import "../../App.css";
function Cards({
  loggedIn,
  cards,
  savedCards,
  handleDeleteCard,
  handleSaveCard,
  keyword,
}) {
  const [toShow, setToShow] = useState(3);
  const itemsToShow = cards.slice(0, toShow);
  const path = useLocation();
  const savedCardsPath = path.pathname === "/saved-news";
  const findCards = path.pathname === "/";

  return (
    <>
      {findCards ? (
        <div className="layout__cards">
          <div className="cards__container">
            {cards ? (
              <h2 className="cards__results">Результаты поиска</h2>
            ) : null}
            {cards.length ? (
              <div className="cards">
                {itemsToShow.map((card, i) => (
                  <Card
                    keyword={keyword}
                    owner={card.owner}
                    date={card.publishedAt}
                    handleSaveCard={handleSaveCard}
                    handleDeleteCard={handleDeleteCard}
                    id={card.id}
                    text={card.description.substring(0, 87)}
                    title={card.title.substring(0, 60)}
                    key={i}
                    link={card.url}
                    source={card.source.name}
                    image={card.urlToImage}
                    loggedIn={loggedIn}
                  />
                ))}
              </div>
            ) : (
              <h2 className="cards__results">Новости не найдены</h2>
            )}

            <button
              className="button button_theme_white button_place_show"
              onClick={(_) => setToShow(toShow + 3)}
            >
              Показать еще
            </button>
          </div>
        </div>
      ) : null}

      {savedCardsPath ? (
        <div className="layout__cards">
          <div className="cards__container">
            {savedCards.length ? (
              <div className="cards">
                {savedCards.map((savedCard, i) => (
                  <Card
                    handleDeleteCard={handleDeleteCard}
                    keyword={savedCard.keyword}
                    key={i}
                    date={savedCard.date}
                    text={savedCard.text}
                    title={savedCard.title}
                    id={savedCard._id}
                    image={savedCard.image}
                    loggedIn={loggedIn}
                  />
                ))}
              </div>
            ) : (
              <h2 className="cards__results">Не найдены сохраненные новости</h2>
            )}
            {/* <button
                className="button button_theme_white button_place_show"
                onClick={(_) => setToShow(toShow + 3)}
              >
                Показать еще
              </button> */}
          </div>
          ) )
        </div>
      ) : null}
    </>
  );
}

export default memo(Cards);
