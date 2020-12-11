import React, {useState, useEffect} from "react";

import "../App.css";

function About() {
  return (
    <div className="about">
    <img className="about__avatar" src='https://s15.stc.all.kpcdn.net/russia/wp-content/uploads/2020/05/devushka-v-shlyape.jpg'></img>
    <div className="about__text">
      <h2 className="about__title">Об авторе</h2>
      <p className="about__info">Здесь могла быть ваша реклама</p>
    </div>
   </div>
  )
}

export default About;
