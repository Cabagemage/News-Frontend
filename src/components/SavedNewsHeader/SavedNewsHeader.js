import React, {useState, useEffect} from "react";
import { NavLink, Route } from 'react-router-dom';
import "./savednews/savednews.css";

function SavedNewsHeader() {
  return (
   <div className="savednews">
   <h2 className="savednews__saved">Сохраненные статьи</h2>
   <h3 className="savednews__name" placeholder="Найти"></h3>
   <p className="savednews__keywords">По ключевым словам: <span>One, two, three</span></p>
   </div>
  )
}

export default SavedNewsHeader