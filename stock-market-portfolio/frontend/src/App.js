import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import "./App.css";

// random color function
const getRandomColor = () => {
  const colors = ["#ff0000", "#00ff00"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Header = ({ title }) => {
  return (
    <>
      <h1>Stock Market Tracker MERN Stack</h1>
      <h2>{title}</h2>
    </>
  );
};

const Stocks = ({ addToWatchlist }) => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/stocks")
      .then((res) => res.json())
      .then((data) => setStocks(data))
      .catch((error) => console.error("Error fetching stocks: ", error));
  }, []);
  console.log(setStocks, "stocksdata");

  return (
    <div className="App">
      <Header title="Stocks" />
      <ul>
        {stocks.map((stock) => (
          <li key={stock.symbol}>
            {stock.company} ({stock.symbol}) -{" "}
            <span style={{ color: getRandomColor() }}>
              {" "}
              ${stock.initial_price}
            </span>
            <button onClick={() => addToWatchlist(stock)}>
              Add to My Watchlist
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Watchlist = ({ watchlist }) => {
  const getRandomColor = () => {
    const colors = ["#ff0000", "#00ff00"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="App">
      <Header title="My Watchlist" />
      <ul>
        {watchlist.map((stock) => (
          <li key={stock.symbol}>
            {stock.company} ({stock.symbol}) -
            <span style={{ color: getRandomColor() }}>
              {" "}
              ${stock.initial_price}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (stock) => {
    fetch("http://localhost:5000/api/watchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stock),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setWatchlist([...watchlist, data]);
      })
      .catch((error) => console.error("Error adding to watchlist: ", error));
  };

  return (
    <Router>
      <nav>
        <NavLink to="/">Stocks</NavLink>
        <NavLink to="/watchlist">Watchlist</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Stocks addToWatchlist={addToWatchlist} />} />
        <Route
          path="/watchlist"
          element={<Watchlist watchlist={watchlist} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
