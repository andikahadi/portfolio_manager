import React from "react";

const BuyingCard = (props) => {
  return (
    <div className="card-container" id={props.index}>
      <div className="logo-container">
        <img src={props.d.logo} />
      </div>
      <div className="name-container">
        <label>{props.d.symbol} </label>
        <label className="company-name">{props.d.name}</label>
      </div>
      <div className="info-container">
        <label>{props.d.buyQty} shares</label>
      </div>
      <div className="info-container">
        <label>${props.d.buyValue}</label>
      </div>
      {/* <div className="value-container">
        <div className="value">
          <label>${props.d.value} </label>
        </div>
        {props.d.unrealizedGain >= 0 ? (
          <div class="gain-container gain-positive">
            <label>+${props.d.unrealizedGain} </label>
            <div className="icon-positive icon "></div>
            <label>{props.d.unrealizedGainPct}% </label>
          </div>
        ) : (
          <div class="gain-container gain-negative">
            <label>-${Math.abs(props.d.unrealizedGain)} </label>
            <div className="icon-negative icon "></div>
            <label>{Math.abs(props.d.unrealizedGainPct)}% </label>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default BuyingCard;
