import React from "react";
import Search from "../Search/Search";
import "./main/main.css";

function Main({ handleGetCards, keyword, setKeyword }) {
  return (
    <div className="main">
      <h1 className="main__title">Что творится в мире?</h1>
      <h3 className="main__info">
        Находите самые свежие статьи на любую тему и сохраняйте в своем личном
        кабинете
      </h3>
      <Search
        keyword={keyword}
        setKeyword={setKeyword}
        handleGetCards={handleGetCards}
      />
    </div>
  );
}

export default Main;
