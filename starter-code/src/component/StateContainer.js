import React, { useState } from "react";
import Manage from "./Manage";

const StateContainer = () => {
  const initHoldings = [
    // { symbol: "aapl", position: 25, cost: 132 },
    // { symbol: "fb", position: 30, cost: 92 },
    // { symbol: "amzn", position: 3, cost: 1500 },
  ];
  const [holdings, setHoldings] = useState(initHoldings);

  const addHoldings = (input) => {
    setHoldings((prevState) => [...prevState, input]);
  };

  const handleDeleteEntry = (index) => {
    setHoldings((prevEntry) => {
      const arr = [...prevEntry];
      const filtered = arr.filter((d, i) => i !== index);
      return filtered;
    });
  };

  const handleUpdateEntry = (index, updatedItem) => {
    setHoldings((prevEntry) => {
      const arr = [...prevEntry];
      arr[index] = updatedItem;
      return arr;
    });
  };
  return (
    <>
      <Manage
        holdings={holdings}
        addHoldings={addHoldings}
        handleUpdateEntry={handleUpdateEntry}
        handleDeleteEntry={handleDeleteEntry}
      />
    </>
  );
};

export default StateContainer;
