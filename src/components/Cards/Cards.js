import React from "react";
import Card from "../Card/Card";
import "./cards/cards.css";

function Cards({ loggedIn }) {
  return (
    <>
      <div className="layout__cards">
        <div className="cards__container">
          {loggedIn ? null : (
            <h2 className="cards__results">Результаты поиска</h2>
          )}
          <div className="cards">
            <Card loggedIn={loggedIn} />
            <Card loggedIn={loggedIn} />
            <Card loggedIn={loggedIn} />
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
