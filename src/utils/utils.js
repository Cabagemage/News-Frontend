import facebook from "../images/facebook.svg";
import github from "../images/github.svg";
// Опции для времени
export const optionsForDate = { day: "numeric", month: "long", year: "numeric" };

export const footerLinks = [
  {
    name: "Главная",
    link: "/",
    id: 1
  },
  {
    name: "Яндекс.Практикум",
    link: "http://praktikum.yandex.ru",
    id: 2
  },
];

export const footerSocialIcons = [
  {
    name: "Facebook",
    link: "https://www.facebook.com/cabagemage",
    src: facebook,
    alt: "facebook",
    id: 1
  },
  {
    name: "Github",
    link: "http://github.com/Cabagemage",
    src: github,
    alt: "github",
    id: 2
  },
];
