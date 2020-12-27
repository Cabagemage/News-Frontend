import React, {useState, useEffect} from "react";
import facebook from "../../images/facebook.svg"
import github from "../../images/github.svg"
import { Link } from 'react-router-dom';
import "./footer/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2020 Supersite, Powered by News API</p>
      <nav className="footer__nav">
        <div className="footer__links">
        <a className="link link_theme_black" href="/">Главная</a>
        <a className="link link_theme_black" target="_blank" href='https://praktikum.yandex.ru'>Яндекс.Практикум</a>
        </div>
        <div className="footer__icons">
        <a target="_blank" href='https://facebook.com'> <img className="footer__social" src={facebook} /> </a>
        <a target="_blank" href="https://github.com/Cabagemage">
        <img className="footer__social" src={github} />
        </a>
        </div>
      </nav>
   </footer>
  )
}

export default Footer;