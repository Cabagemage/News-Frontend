import React, { useState, memo, useMemo } from "react";
import Card from "../Card/Card";
import { Route, Switch } from "react-router-dom";
import "./cards/cards.css";

function Cards({ loggedIn, cards, savedCards, handleDeleteCard }) {
  const [toShow, setToShow] = useState(3);
  const itemsToShow = cards.slice(0, toShow);

  console.log(cards);
  console.log(savedCards);
  return (
    <>
      <Switch>
        <Route exact path="/">
          <div className="layout__cards">
            <div className="cards__container">
              {!loggedIn ? null : (
                <h2 className="cards__results">Результаты поиска</h2>
              )}
              {cards.length ? (
                <div className="cards">
                  {itemsToShow.map((card, i) => (
                    <Card
                      keyword={card.title.slice(0, 7)}
                      date={card.publishedAt}
                      handleDeleteCard={handleDeleteCard}
                      id={card.id}
                      text={card.description}
                      title={card.title}
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
        </Route>

        <Route path="/saved-news">
          <div className="layout__cards">
            <div className="cards__container">
              {savedCards.length ? (
                <div className="cards">
                  {savedCards.map((savedCard, i) => (
                    <Card
                      owner={savedCard.owner}
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
                <h2 className="cards__results">
                  Не найдены сохраненные новости
                </h2>
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
        </Route>
      </Switch>
    </>
  );
}

export default memo(Cards);
