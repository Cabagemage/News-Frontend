import React from "react";
import "../../App.css";
import "./about/about.css";

function About() {
  return (
    <div className="about">
      <div className="about__content">
        <img
          className="about__avatar"
          src="https://ichef.bbci.co.uk/news/800/cpsprodpb/169F6/production/_91026629_gettyimages-519508400.jpg"
          alt="Панда"
        />
        <div className="about__text">
          <h2 className="about__title">Об авторе</h2>
          <p className="about__subtitle">
            Меня зовут Андрей. Я создал данное приложение на стеке: React.js,
            Express.js, Mongo.db.
          </p>
          <p className="about__subtitle">
            Данное SPA-приложение выполняет функцию "поисковика" новостей на
            основе ключевых слов на news-api. Также можно сохранять
            понравившиеся карточки в свой профиль и при необходимости их
            удалять.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
