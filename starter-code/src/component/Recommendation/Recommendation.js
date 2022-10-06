import React, { useState } from "react";
import Budget from "./Budget";
import Buying from "./Buying";

//propping down holdings and update for buying
const Recommendation = (props) => {
  console.log(`recommendation page read total value: ${props.totalValue}`);
  const [userBudget, setUserBudget] = useState(
    JSON.parse(window.localStorage.getItem("userBudget"))
  );

  const handleBudgetChange = (input) => {
    setUserBudget(parseFloat(input));
  };

  //check total delta

  return (
    <div>
      <Budget userBudget={userBudget} handleBudgetChange={handleBudgetChange} />
      <Buying
        userBudget={userBudget}
        holdings={props.holdings}
        totalDeltaPct={props.totalDeltaPct}
        handleUpdateEntry={props.handleUpdateEntry}
      />
    </div>
  );
};

export default Recommendation;
