import React from "react";
import Hero from "./Hero";
import Portfolio from "./Portfolio";

const Overview = (props) => {
  return (
    <div className="overview-container">
      <h2>MyPortfolio</h2>
      <div>total sum: {props.totalValue.current}</div>
      <Hero holdings={props.holdings} totalValue={props.totalValue} />
      <Portfolio holdings={props.holdings} totalValue={props.totalValue} />
    </div>
  );
};

export default Overview;
