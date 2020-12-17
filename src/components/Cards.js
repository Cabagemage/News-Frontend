import React, {useState, useEffect} from "react";
import {Link, NavLink, Route } from 'react-router-dom';
import Card from './Card'
import "../App.css";

function Cards() {
  return (
    <>
    <div className="layout__cards">
      <h2>Hello</h2>
    <div className="cards">
      <Card />
      <Card />
      <Card />
   </div>
   </div>
   </>
  )
}

export default Cards;