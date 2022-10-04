import React from "react";
import Chart from "./Chart";

const Hero = (props) => {
  return (
    <div>
      <Chart holdings={props.holdings} totalValue={props.totalValue} />
    </div>
  );
};

export default Hero;
