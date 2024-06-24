import React from "react";
import "./History.css";

const History = ({ searchHistory, handleHistoryItemClick }) => {

  if (searchHistory.length === 0) {
    return (
      <div>
        <h2>Search History</h2>
        Empty Result, please search by city first.
      </div>
    );
  }

  return (
    <div className="history">
      <h2>Search History</h2>
      <ul className="history-list">
        {searchHistory.map((city, index) => (
          <li key={index} onClick={() => handleHistoryItemClick(city)} className="history-item">
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
