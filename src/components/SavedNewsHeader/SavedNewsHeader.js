import React from "react";
import "./savednews/savednews.css";
import { useSelector} from "react-redux";
function SavedNewsHeader() {
  const savedCards = useSelector((state) => state.news.savedCards);
  const curUser = useSelector((state) => state.currentUser.userInfo);

  const arrayCopy = [...savedCards];
  arrayCopy.sort((a, b) => (a.keyword > b.keyword ? -1 : 1)); // сортируем копию

  const keywords = arrayCopy.reduce((sum, item) => {
    sum[item.keyword] = (sum[item.keyword] || 0) + 1;
    return sum;
  }, {});

  const keysSorted = Object.keys(keywords).sort(function (a, b) {
    return keywords[a] > keywords[b] ? -1 : 1;
  });

  function handlerMainText(arr) {
    if (arr.length >= 3) {
      return arr.splice(0, 2) + " ";
    } else if (arr.length < 3) {
      return arr.join(", ").split("");
    }
  }

  return (
    <div className="savednews">
      <div className="savednews__content">
        <h2 className="savednews__title">Сохраненные статьи</h2>
        <h3 className="savednews__subtitle">
          {curUser.name}, у вас {savedCards.length}{" "}
          {savedCards.length >= 3
            ? "сохраненных статей"
            : "сохраненные статьи" && savedCards.length === 0
            ? "сохраненных статей"
            : "сохраненные статьи"}
        </h3>
        <p className="savednews__keywords">
          {savedCards.length >= 2
            ? " По ключевым словам:"
            : " По ключевому слову:"}{" "}
          <span className="savednews__keyword">
            {handlerMainText(keysSorted)}и {savedCards.length - 2} другим
          </span>
        </p>
      </div>
    </div>
  );
}

export default SavedNewsHeader;
