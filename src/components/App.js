import React, { useState, useEffect } from "react";
import '../App.css';
import Header from "./Header/Header";
import Main from "./Main"
import About from "./About"
function App() {
  return (
    <div className="body">
      <div className="layout">
      <Header />
      <Main />
      </div>
      <About />
    </div>
  );
}

export default App;
