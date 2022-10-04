import React from "react";

import PortfolioCard from "./PortfolioCard";

const Portfolio = (props) => {
  return (
    <>
      <div className="container">
        {props.holdings.map((d, index) => {
          return (
            <PortfolioCard
              d={d}
              index={index}
              totalValue={props.totalValue}
              // isUpdating={isUpdating}
            />
          );
        })}
      </div>
    </>
  );
};

export default Portfolio;
