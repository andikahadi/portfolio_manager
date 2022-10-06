import React from "react";
import Hero from "./Hero";
import Portfolio from "./Portfolio";

const Overview = (props) => {
  let totalValue = 0;
  let totalGain = 0;

  for (let i = 0; i < props.holdings.length; i++) {
    totalValue = totalValue + props.holdings[i].value;
    totalGain = totalGain + props.holdings[i].unrealizedGain;
  }
  console.log(totalValue);
  return (
    <div className="overview-container">
      <h2>MyPortfolio</h2>
      <Hero
        holdings={props.holdings}
        totalValue={totalValue}
        totalGain={totalGain}
      />
      <Portfolio holdings={props.holdings} totalValue={totalValue} />
    </div>
  );
};

export default Overview;
