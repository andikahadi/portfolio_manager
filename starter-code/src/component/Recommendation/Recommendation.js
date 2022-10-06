import React, { useState } from "react";
import Budget from "./Budget";
import Buying from "./Buying";

//propping down holdings and update for buying
const Recommendation = (props) => {
  const [userBudget, setUserBudget] = useState(
    JSON.parse(window.localStorage.getItem("userBudget"))
  );

  const handleBudgetChange = (input) => {
    setUserBudget(parseFloat(input));
  };

  let totalValue = 0;
  let totalDeltaPct = 0;
  let holdingsDelta = [];

  //calculate totalValue from parent holdings state
  for (let i = 0; i < props.holdings.length; i++) {
    totalValue = totalValue + props.holdings[i].value;
  }
  console.log(`recom totalValue = ${totalValue}`);

  //create new array of delta percentage using above totalValue, and parent holding state
  for (let i = 0; i < props.holdings.length; i++) {
    const deltaPct =
      props.holdings[i].targetPct -
      Math.round(
        ((props.holdings[i].position * props.holdings[i].price) / totalValue) *
          100 *
          100
      ) /
        100;
    console.log(`for item ${i}, delta pct is ${deltaPct}`);

    holdingsDelta.push({
      name: props.holdings[i].name,
      logo: props.holdings[i].logo,
      symbol: props.holdings[i].symbol,
      deltaPct: deltaPct,
      holdingsIndex: i,
      price: props.holdings[i].price,
      isBuyingCandidate: deltaPct >= 0.1 ? true : false,
      // buyQty: buyQty, //need totalDeltaPct, calculate later
      // buyValue: Math.round(buyQty * props.holdings[i].price * 100) / 100,
    });
  }

  for (let i = 0; i < holdingsDelta.length; i++) {
    if (holdingsDelta[i].isBuyingCandidate) {
      totalDeltaPct = totalDeltaPct + holdingsDelta[i].deltaPct;
    }
  }

  console.log(holdingsDelta);
  console.log(totalDeltaPct);

  //check total delta

  return (
    <div>
      <Budget userBudget={userBudget} handleBudgetChange={handleBudgetChange} />
      <Buying
        userBudget={userBudget}
        holdings={props.holdings}
        holdingsDelta={holdingsDelta}
        totalDeltaPct={totalDeltaPct}
        generateNextStockInfo={props.generateNextStockInfo}
        handleUpdateEntry={props.handleUpdateEntry}
      />
    </div>
  );
};

export default Recommendation;
