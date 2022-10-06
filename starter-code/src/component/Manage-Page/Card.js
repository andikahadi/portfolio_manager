import React, { useState } from "react";

const Card = (props) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [position, setPosition] = useState(props.d.position);
  const [cost, setCost] = useState(props.d.cost);
  const [targetPct, setTargetPct] = useState(props.d.targetPct);

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };
  const handleCostChange = (event) => {
    setCost(event.target.value);
  };

  const handleTargetPctChange = (event) => {
    setTargetPct(event.target.value);
  };

  const handleUpdate = () => {
    setIsUpdating(!isUpdating);

    const twoDecUnrealizedGain =
      Math.round(
        parseFloat(position) * (props.d.price - parseFloat(cost)) * 100
      ) / 100;

    const updatedEntry = {
      ...props.d,
      position: parseFloat(position),
      cost: parseFloat(cost),
      targetPct: parseFloat(targetPct),
      value: Math.round(parseFloat(position) * props.d.price * 100) / 100,
      unrealizedGain: twoDecUnrealizedGain,
      unrealizedGainPct:
        Math.round(
          ((position * (props.d.price - cost)) / (position * cost)) * 100 * 100
        ) / 100,
    };
    props.handleUpdateEntry(updatedEntry, props.index);
  };

  const handleRemove = () => {
    props.handleDeleteEntry(props.index);
  };

  if (isUpdating === false) {
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
          <label>
            {props.d.position} <span>shares</span>
          </label>
          <label>
            ${props.d.cost} <span>/share</span>
          </label>
          <label>{props.d.targetPct}%</label>
        </div>
        <div className="value-container">
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
        </div>
        <div className="button-container">
          <button type="submit" onClick={handleUpdate}>
            Update
          </button>

          <button type="submit" onClick={handleRemove}>
            Remove
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card-container" id={props.index}>
        <div className="logo-container">
          <img src={props.d.logo} />
        </div>
        <div className="name-container ">
          <label>{props.d.symbol} </label>
          <label className="company-name">{props.d.name}</label>
        </div>
        <div className="info-container">
          <div>
            <input
              value={position}
              type="number"
              onChange={handlePositionChange}
              step="0.01"
            />
            <span>shares</span>
          </div>
          <div>
            <input
              value={cost}
              type="number"
              onChange={handleCostChange}
              step="0.01"
            />
            <span>/share</span>
          </div>
          <div>
            <input
              value={targetPct}
              type="number"
              onChange={handleTargetPctChange}
              step="0.01"
            />
            <span>%</span>
          </div>
        </div>
        <div className="value-container">
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
        </div>
        <div className="button-container">
          <button type="submit" onClick={handleUpdate}>
            Update
          </button>

          <button type="submit" onClick={handleRemove}>
            Remove
          </button>
        </div>
      </div>

      // <div className="card-container" id={props.index}>
      //   <div className="logo-container">
      //     <img src={props.d.logo} />
      //   </div>
      //   <div className="info-container">
      //     <label>{props.d.symbol} </label>
      //     <label>{props.d.name}</label>
      //   </div>
      //   <div className="info-container">
      //     <input
      //       value={position}
      //       type="number"
      //       onChange={handlePositionChange}
      //     />
      //     <input value={cost} type="number" onChange={handleCostChange} />
      //   </div>
      //   <div className="info-container"></div>
      //   <div className="info-container">
      //     <button type="submit" onClick={handleUpdate}>
      //       Update
      //     </button>

      //     <button type="submit" onClick={handleRemove}>
      //       Remove
      //     </button>
      //   </div>
      // </div>
    );
  }
};

export default Card;
