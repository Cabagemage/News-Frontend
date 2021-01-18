import React, { memo } from "react";
import Cards from "../Cards/Cards";
import Header from "../Header/Header";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import "../Cards/cards/cards.css";

function SavedNews({
  loggedIn,
  cards,
  savedCards,
  handleDeleteCard,
  signOut,
  getKeywords,
})
{
  return (
    <>
      <Header signOut={signOut} />
      <SavedNewsHeader getKeywords={getKeywords} savedCards={savedCards} />
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
