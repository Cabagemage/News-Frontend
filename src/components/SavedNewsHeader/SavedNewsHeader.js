import React from "react";
import "./savednews/savednews.css";

function SavedNewsHeader({savedCards}) {

  return (
    <div className="savednews">
      <div className="savednews__content">
        <h2 className="savednews__title">Сохраненные статьи</h2>
        <h3 className="savednews__subtitle">
          Грета, у вас {savedCards.length} сохраненные статьи
        </h3>
        <p className="savednews__keywords">
          По ключевым словам:{" "}
          <span className="savednews__keyword"></span>
        </p>
      </div>
    </div>
  );
}

export default SavedNewsHeader;
