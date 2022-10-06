import React from "react";
import Card from "./Card";

const InputCard = (props) => {
  return (
    <div className="container">
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
