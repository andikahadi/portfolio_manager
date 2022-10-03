import React from "react";
import Card from "./Card";

const InputCard = (props) => {
  return (
    <div className="container">
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
