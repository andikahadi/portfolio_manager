import React from "react";
import Card from "./Card";

const InputCard = (props) => {
  let totalTargetPct = 0;

  for (let i = 0; i < props.holdings.length; i++) {
    totalTargetPct = totalTargetPct + props.holdings[i].targetPct;
  }

  let deltaToHundred = 100 - totalTargetPct;

  const checkTotalPct = () => {
    if (deltaToHundred > 0) {
      return <p>Add {deltaToHundred}% to equal 100%</p>;
    } else if (deltaToHundred < 0) {
      return <p>Remove {Math.abs(deltaToHundred)}% to equal 100%</p>;
    }
  };
  return (
    <div className="container">
      <div>{checkTotalPct()}</div>
      <div className="card-header-container">
        <div className="logo-name-header">
          <p>Stock Name</p>
        </div>
        <div className="info-container">
          <p>Position</p>
          <p>Cost basis</p>
          <p>Target %</p>
        </div>
        <div className="value-container">
          <p>Value </p>
        </div>
        <div className="button-container"></div>
      </div>
      {props.holdings.map((d, index) => {
        return (
          <Card
            d={d}
            index={index}
            // isUpdating={isUpdating}
            handleUpdateEntry={props.handleUpdateEntry}
            handleDeleteEntry={props.handleDeleteEntry}
          />
        );
      })}
    </div>
  );
};

export default InputCard;
