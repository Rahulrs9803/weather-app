import React from "react";
import "./Header.css";

const Header = ({
  unit,
  setUnit,
  onGetCurrentLocation,
  handleHistoryButton,
  showHistory,
}) => {
  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  return (
    <header className="header">
      <h1>Weather App</h1>
      <div className="unit-switch">
        <label>
          <input
            type="radio"
            value="metric"
            checked={unit === "metric"}
            onChange={handleUnitChange}
          />
          °C
        </label>
        <label>
          <input
            type="radio"
            value="imperial"
            checked={unit === "imperial"}
            onChange={handleUnitChange}
          />
          °F
        </label>
      </div>
      <div>
        <button onClick={handleHistoryButton}>
          {showHistory ? "Show Data" : "Show History"}
        </button>
        <button onClick={onGetCurrentLocation}>Get Current Location</button>
      </div>
    </header>
  );
};

export default Header;
