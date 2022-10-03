import React, { useState, useEffect } from "react";
import Manage from "./Manage";

const StateContainer = () => {
  const [holdings, setHoldings] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [temp, setTemp] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setTemp((prevTemp) => prevTemp + 1);
    }, 60000);
  }, []);

  const fetchInfo = async (url1, url2, stateInput, changeOutFn, signal) => {
    setIsLoading(true);
    setError(false);

    try {
      const res1 = await fetch(url1, { signal: signal });
      const res2 = await fetch(url2, { signal: signal });

      if (res1.status !== 200 || res2.status !== 200) {
        throw new Error("Something went wrong");
      }
      const data1 = await res1.json();
      const data2 = await res2.json();

      const nameRemoveInc = data1.name.slice(0, -4);
      const twoDecUnrealizedGain =
        Math.round(
          parseInt(stateInput.position) *
            (data2.c - parseInt(stateInput.cost)) *
            100
        ) / 100;

      const twoDecValue =
        Math.round(parseInt(stateInput.position) * data2.c * 100) / 100;

      const stockInfo = {
        symbol: stateInput.symbol.toUpperCase(),
        name: nameRemoveInc,
        logo: data1.logo,
        position: stateInput.position,
        cost: stateInput.cost,
        price: data2.c,
        value: twoDecValue,
        unrealizedGain: twoDecUnrealizedGain,
        unrealizedGainPct:
          (Math.round(
            (twoDecUnrealizedGain / (stateInput.position * stateInput.cost)) *
              1000
          ) /
            1000) *
          100,
      };

      console.log(data2);
      changeOutFn(stockInfo);
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false); // turn off loading animation
  };

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
      {console.log(temp)}
      <Manage
        fetchInfo={fetchInfo}
        holdings={holdings}
        addHoldings={addHoldings}
        handleUpdateEntry={handleUpdateEntry}
        handleDeleteEntry={handleDeleteEntry}
      />
    </>
  );
};

export default StateContainer;
