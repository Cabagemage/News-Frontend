import React, { useState, memo, useMemo } from "react";
import Card from "../Card/Card";
import { Route, Switch } from "react-router-dom";
import "./cards/cards.css";

function Cards({ loggedIn, cards }) {
  const [toShow, setToShow] = useState(3);
  const itemsToShow = cards.slice(0, toShow);

  return (
    <>
      <Switch>
        <Route exact path="/">
          <div className="layout__cards">
            <div className="cards__container">
              {!loggedIn ? null : (
                <h2 className="cards__results">Результаты поиска</h2>
              )}

              <div className="cards">
                {itemsToShow.map((card) => (
                  <Card
                    keyword={card.title.slice(0, 7)}
                    key={card.title}
                    date={card.publishedAt}
                    description={card.description}
                    title={card.title}
                    author={card.author}
                    id={card.source.id}
                    link={card.source.name}
                    image={card.urlToImage}
                    about={card.text}
                    loggedIn={loggedIn}
                  />
                ))}
              </div>

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
              <div className="cards">
                {itemsToShow.map((card) => (
                  <Card
                    keyword={card.title.slice(0, 7)}
                    key={card.title}
                    date={card.publishedAt}
                    description={card.description}
                    title={card.title}
                    author={card.author}
                    //  id={card.source.id}
                    link={card.source.name}
                    image={card.urlToImage}
                    about={card.text}
                    loggedIn={loggedIn}
                  />
                ))}
              </div>

              <button
                className="button button_theme_white button_place_show"
                onClick={(_) => setToShow(toShow + 3)}
              >
                Показать еще
              </button>
            </div>
          </div>
        </Route>
      </Switch>
    </>
  );
}

export default memo(Cards);
