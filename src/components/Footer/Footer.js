import React from "react";
import "./footer/footer.css";
import "../../App.css";
import { footerLinks, footerSocialIcons } from "../../utils/utils";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2020 Supersite, Powered by News API</p>
      <div className="footer__menu">
        <nav className="footer__nav">
          <ul className="footer__links">
            {footerLinks.map(({ name, link, id }) => {
              return (
                <>
                  <li key={id} className="footer__list-item">
                    <a
                      className="link link_theme_black footer__link"
                      href={link}
                    >
                      {name}
                    </a>
                  </li>
                </>
              );
            })}
          </ul>
        </nav>

        <div className="footer__icons">
          {footerSocialIcons.map(({ name, link, src, id }) => {
            return (
              <a target="_blank" rel="noreferrer"  href={link} key={id}>
                <img className="footer__social" src={src} alt={name} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
