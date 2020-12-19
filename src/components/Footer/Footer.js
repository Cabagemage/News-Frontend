import React, {useState, useEffect} from "react";
import {Link, NavLink, Route } from 'react-router-dom';
import facebook from "../../images/facebook.svg"
import github from "../../images/github.svg"
import "./footer/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2020 Supersite, Powered by News API</p>
      <nav className="footer__nav">
        <div className="links">
        <Link className="link link_theme_black" exact to="/">Яндекс.Практикум</Link>
        <Link className="link link_theme_black" exact to="/">Главная</Link>
        </div>
        <div>
        <img className="footer__social" src={facebook} />
        <img className="footer__social" src={github} />
        </div>
      </nav>
   </footer>
  )
}

export default Footer;