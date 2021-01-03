import React, {useState, } from "react";
import Card from "../Card/Card";
import "./cards/cards.css";

function Cards({ loggedIn, cards }) {
  const [cardsLength, setCardsLength] = useState(3)


  return (
    <>
      <div className="layout__cards">
        <div className="cards__container">
          {loggedIn ? null : (
            <h2 className="cards__results">Результаты поиска</h2>
          )}

          <div className="cards">
          {cards.map((card) => (
            <Card
             keyword={card.title.slice(0,7)}
             key={card.title}
             date={card.publishedAt}
             description={card.description}
             title={card.title}
             author={card.author}
             link={card.source.name}
             image={card.urlToImage}
             about={card.text}
             loggedIn={loggedIn} />
             ))}
          </div>

          <button className="button button_theme_white button_place_show">
            Показать еще
          </button>

        </div>
      </div>
    </>
  );
}

export default Cards;
