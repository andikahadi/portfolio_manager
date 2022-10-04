import React, { useState } from "react";

const Card = (props) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [position, setPosition] = useState(props.d.position);
  const [cost, setCost] = useState(props.d.cost);

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };
  const handleCostChange = (event) => {
    setCost(event.target.value);
  };

  const handleUpdate = () => {
    setIsUpdating(!isUpdating);

    const twoDecUnrealizedGain =
      Math.round(parseInt(position) * (props.d.price - parseInt(cost)) * 100) /
      100;

    const updatedEntry = {
      ...props.d,
      position: position,
      
      cost: cost,
      value: Math.round(parseInt(position) * props.d.price * 100) / 100,
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
        <div className="info-container">
          <label>{props.d.symbol} </label>
          <label>{props.d.name}</label>
        </div>
        <div className="info-container">
          <label>{props.d.position} shares</label>
          <label>${props.d.cost}</label>
        </div>
        <div className="info-container">
          <div>
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
        <div className="info-container">
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
        <div className="info-container">
          <label>{props.d.symbol} </label>
          <label>{props.d.name}</label>
        </div>
        <div className="info-container">
          <input
            value={position}
            type="number"
            onChange={handlePositionChange}
          />
          <input value={cost} type="number" onChange={handleCostChange} />
        </div>
        <div className="info-container">
          <div>
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
        <div className="info-container">
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
