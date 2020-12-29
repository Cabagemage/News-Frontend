import React from "react";
import "../../App.css";
import "./about/about.css";

function About() {
  return (
    <div className="about">
      <div className="about__content">
        <img
          className="about__avatar"
          src="https://s15.stc.all.kpcdn.net/russia/wp-content/uploads/2020/05/devushka-v-shlyape.jpg"
        />
        <div className="about__text">
          <h2 className="about__title">Об авторе</h2>
          <p className="about__subtitle">
            Это блок с описанием автора проекта. Здесь следует указать, как вас
            зовут, чем вы занимаетесь, какими технологиями разработки владеете.
          </p>
          <p className="about__subtitle">
            Также можно рассказать о процессе обучения в Практикуме, чему вы тут
            научились, и чем можете помочь потенциальным заказчикам.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
