import React from "react";
import Chart from "./Chart";

const Hero = (props) => {
  return (
    <div className="hero">
      <Chart holdings={props.holdings} totalValue={props.totalValue} />
      <div className="total-value">
        <h3>${props.totalValue}</h3>
        {props.totalGain > 0 ? (
          <div className="gain-positive">
            <label>${props.totalGain} </label>
            <div className="icon-positive icon "></div>
            <label>
              {Math.round((props.totalGain / props.totalValue) * 100 * 100) /
                100}
              %
            </label>
          </div>
        ) : (
          <div className="gain-negative">
            <label>-${Math.abs(props.totalGain)} </label>
            <div className="icon-negative icon "></div>
            <label>
              {Math.round((props.totalGain / props.totalValue) * 100 * 100) /
                100}
              %
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
