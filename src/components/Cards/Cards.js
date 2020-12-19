import React, {useState, useEffect} from "react";
import {Link, NavLink, Route } from 'react-router-dom';
import Card from '../Card/Card'
import "./cards/cards.css";

function Cards() {
  return (
    <>
    <div className="layout__cards">
    <div className="cards">
      <Card />
      <Card />
      <Card />
      <Card />
   </div>
   </div>
   </>
  )
}

export default Cards;