import React, { useState, useEffect } from "react";
import '../App.css';
import Header from "./Header/Header";
import Main from "./Main"
import About from "./About"
function App() {
  return (
    <div className="body">
      <Header />
      <Main />
    </div>
  );
}

export default App;
