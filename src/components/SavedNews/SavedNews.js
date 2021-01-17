import React, { useState, memo, useContext } from "react";
import Cards from "../Cards/Cards";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import "../Cards/cards/cards.css";

function SavedNews({ loggedIn, cards, savedCards, handleDeleteCard }) {
  return (
    <>
      <SavedNewsHeader />
      <Cards
        loggedIn={loggedIn}
        cards={cards}
        savedCards={savedCards}
        handleDeleteCard={handleDeleteCard}
      />
    </>
  );
}

export default memo(SavedNews);
