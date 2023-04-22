import React, { useState } from "react";
import "./App.scss";
import Radio from "./radio";

function App() {
  const [page, setPage] = useState("radio");

  const handleNavClick = (page) => {
    setPage(page);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <button onClick={() => handleNavClick("radio")}>Home</button>
        <button onClick={() => handleNavClick("contact")}>Contact</button>
      </nav>
      <div className="header">
        <h1>Online Radio</h1>
        <h2>Alege o categorie, selecteaza postul si bucura-te de muzica!</h2>
      </div>
      {page === "radio" ? (
        <Radio />
      ) : (
        <div className="contact">
          <h3>Follow me on Instagram:</h3>
          <a href="https://www.instagram.com/radu.gabriel.mihaila/">
            @radu.gabriel.mihaila
          </a>
          <h3>Visit my website:</h3>
          <a href="http://www.radumihaila.ro">www.radumihaila.ro</a>
        </div>
      )}
    </div>
  );
}

export default App;
