import React from "react";
import facebook from "../../images/facebook.svg";
import github from "../../images/github.svg";
import "./footer/footer.css";
import "../../App.css";
function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2020 Supersite, Powered by News API</p>
      <div className="footer__menu">
        <nav className="footer__nav">
          <ul className="footer__links">
            <li className="footer__list-item">
              <a className="link link_theme_black footer__link" href="/">
                Главная
              </a>
            </li>
            <li className="footer__list-item">
              <a
                className="link link_theme_black footer__link"
                target="_blank"
                href="https://praktikum.yandex.ru"
              >
                Яндекс.Практикум
              </a>
            </li>
          </ul>
        </nav>
        <div className="footer__icons">
          <a target="_blank" href="https://facebook.com">
            <img className="footer__social" src={facebook} alt="facebook" />
          </a>
          <a target="_blank" href="https://github.com/Cabagemage">
            <img className="footer__social" src={github} alt="github" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
