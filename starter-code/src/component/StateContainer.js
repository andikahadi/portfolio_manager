import React, { useState, useEffect } from "react";
import Manage from "./Manage-Page/Manage";
import Overview from "./Overview-Page/Overview";

const StateContainer = () => {
  const [holdings, setHoldings] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalValue, setTotalValue] = useState(0);

  const [temp, setTemp] = useState(0);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < holdings.length; i++) {
      sum = sum + holdings[i].value;
    }
    setTotalValue(sum);
  }, [holdings]);

  useEffect(() => {
    setInterval(() => {
      setTemp((prevTemp) => prevTemp + 1);
    }, 30000);
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

      const nameRemoveInc = data1.name.slice(0, -3);
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
          Math.round(
            (twoDecUnrealizedGain / (stateInput.position * stateInput.cost)) *
              100 *
              100
          ) / 100,
        color: stateInput.color,
      };

      console.log(data2);
      changeOutFn(stockInfo);
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false); // turn off loading animation
  };

  useEffect(() => {
    holdings.map((d, i) => {
      console.log("refreshing item");
      const urlInfo =
        "https://finnhub.io/api/v1/stock/profile2?symbol=" +
        d.symbol.toUpperCase() +
        "&token=ccprl9aad3idf7jqketgccprl9aad3idf7jqkeu0";

      const urlPrice =
        "https://finnhub.io/api/v1/quote?symbol=" +
        d.symbol.toUpperCase() +
        "&token=ccprl9aad3idf7jqketgccprl9aad3idf7jqkeu0";

      fetchInfo(urlInfo, urlPrice, d, handleUpdateEntry);
    });
  }, [temp]);

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

  const handleUpdateEntry = (updatedItem, index) => {
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
      {console.log(holdings)}
      <Overview holdings={holdings} totalValue={totalValue} />
    </>
  );
};

export default StateContainer;
