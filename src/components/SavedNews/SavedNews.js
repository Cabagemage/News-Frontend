import React, { memo } from "react";
import Cards from "../Cards/Cards";
import Header from "../Header/Header";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import "../Cards/cards/cards.css";

function SavedNews({ signOut }) {
  return (
    <>
      <Header signOut={signOut} />
      <SavedNewsHeader />
      <Cards />
    </>
  );
}

export default memo(SavedNews);
