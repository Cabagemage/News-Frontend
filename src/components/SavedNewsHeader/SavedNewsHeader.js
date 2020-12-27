import React, { useState, useEffect } from "react";
import { NavLink, Route } from "react-router-dom";
import "./savednews/savednews.css";

function SavedNewsHeader() {
  return (
    <div className="savednews">
      <div className="savednews__content">
        <h2 className="savednews__title">Сохраненные статьи</h2>
        <h3 className="savednews__subtitle">
          Грета, у вас 3 сохраненные статьи
        </h3>
        <p className="savednews__keywords">
          По ключевым словам:{" "}
          <span className="savednews__keyword">Природа, Авиация, Поезда</span>
        </p>
      </div>
    </div>
  );
}

export default SavedNewsHeader;
