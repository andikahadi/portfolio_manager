import React, { useState } from "react";

const Form = (props) => {
  const [symbol, setSymbol] = useState("");
  const [position, setPosition] = useState(0);
  const [cost, setCost] = useState(0);
  const [targetPct, setTargetPct] = useState("");

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const handleCostChange = (event) => {
    setCost(event.target.value);
  };

  const handleTargetPctChange = (event) => {
    setTargetPct(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newHolding = {
      symbol: symbol,
      position: parseFloat(position),
      cost: parseFloat(cost),
      targetPct: parseFloat(targetPct),
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
    };

    props.handleSubmit(newHolding);
    setSymbol("");
    setPosition("");
    setCost("");
    setTargetPct("");
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <div className="formRow">
          <label className="formCol">Stock Symbols: </label>
          <input
            className="formCol"
            onChange={handleSymbolChange}
            value={symbol}
            type="text"
          />
        </div>
        <div className="formRow">
          <label className="formCol">Position: </label>
          <input
            className="formCol"
            onChange={handlePositionChange}
            value={position}
            type="number"
          />
        </div>
        <div className="formRow">
          <label className="formCol">Cost Basis: </label>
          <input
            className="formCol"
            onChange={handleCostChange}
            value={cost}
            type="number"
          />
        </div>
        <div className="formRow">
          <label className="formCol">Target % in Portfolio: </label>
          <input
            className="formCol"
            onChange={handleTargetPctChange}
            value={targetPct}
            type="number"
          />
        </div>
        <div className="formButton">
          <button type="submit" className="formButton">
            Add Stock
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
