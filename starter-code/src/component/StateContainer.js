import React, { useState, useEffect, useRef, Suspense } from "react";
import Manage from "./Manage-Page/Manage";
import Overview from "./Overview-Page/Overview";
import NavBar from "./NavBar";
import { Route, Routes, Navigate, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Recommendation from "./Recommendation/Recommendation";

const StateContainer = () => {
  const [holdings, setHoldings] = useState(
    JSON.parse(window.localStorage.getItem("initHolding")) || []
  );

  // const [totalValue, setTotalValue] = useState(0);
  let totalValue = useRef(0); // using useRef for totalValue to prevent rendering, since it actually only read data form holdings.
  let totalDeltaPct = useRef(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let isMounted = useRef(false);

  const [temp, setTemp] = useState(0);

  useEffect(() => {
    let sum = 0;
    let deltaPctSum = 0;
    for (let i = 0; i < holdings.length; i++) {
      sum = sum + holdings[i].value;
      if (holdings[i].isBuyingCandidate)
        deltaPctSum = deltaPctSum + holdings[i].deltaPct;
    }

    totalValue.current = sum;
    totalDeltaPct.current = deltaPctSum;

    console.log(`totalValue update: ${totalValue.current}`);
    console.log(`holding update: `);
    console.log(holdings);
  }, [holdings]);

  // useEffect(() => {
  //   setInterval(() => {
  //     setTemp((prevTemp) => prevTemp + 1);
  //   }, 60000);
  // }, []);

  const fetchInfo = async (
    url1,
    url2,
    stateInput,
    handleUpdateEntry,
    index,
    signal
  ) => {
    console.log(`fetching stock ${stateInput.name}`);
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
        Math.round(stateInput.position * (data2.c - stateInput.cost) * 100) /
        100;

      const twoDecValue = Math.round(stateInput.position * data2.c * 100) / 100;
      const deltaPct =
        stateInput.targetPct -
        Math.round(
          ((stateInput.position * data2.c) / totalValue.current) * 100 * 100
        ) /
          100;

      const stockInfo = {
        symbol: stateInput.symbol.toUpperCase(),
        name: nameRemoveInc,
        logo: data1.logo,
        position: stateInput.position,
        cost: stateInput.cost,
        targetPct: stateInput.targetPct,
        price: data2.c,
        value: Math.round(stateInput.position * data2.c * 100) / 100,
        unrealizedGain: twoDecUnrealizedGain,
        unrealizedGainPct:
          Math.round(
            (twoDecUnrealizedGain / (stateInput.position * stateInput.cost)) *
              100 *
              100
          ) / 100,
        color: stateInput.color,
      };

      const nextStockInfo = { ...stockInfo, position: stockInfo.position + 1 };

      handleUpdateEntry(stockInfo, index);
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false); // turn off loading animation
  };

  const generateNextStockInfo = (
    prevHoldings,
    nextPosition,
    newPurchaseCost
  ) => {
    const newCost =
      (prevHoldings.position * prevHoldings.cost +
        (nextPosition - prevHoldings.position) * newPurchaseCost) /
      nextPosition;
    return {
      ...prevHoldings,
      position: nextPosition,
      cost: newCost,

      value: Math.round(nextPosition * prevHoldings.price * 100) / 100,
      unrealizedGain:
        Math.round(nextPosition * (prevHoldings.price - newCost) * 100) / 100,
      unrealizedGainPct:
        Math.round(
          ((nextPosition * (prevHoldings.price - newCost)) /
            (nextPosition * newCost)) *
            100 *
            100
        ) / 100,
    };
  };

  useEffect(() => {
    holdings.map((d, i) => {
      const urlInfo =
        "https://finnhub.io/api/v1/stock/profile2?symbol=" +
        d.symbol.toUpperCase() +
        "&token=ccprl9aad3idf7jqketgccprl9aad3idf7jqkeu0";

      const urlPrice =
        "https://finnhub.io/api/v1/quote?symbol=" +
        d.symbol.toUpperCase() +
        "&token=ccprl9aad3idf7jqketgccprl9aad3idf7jqkeu0";

      fetchInfo(urlInfo, urlPrice, d, handleUpdateEntry, i);
    });

    window.localStorage.setItem("initHolding", JSON.stringify(holdings));
  }, []);

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
      <Switch>
        <Route exact path="/">
          <Redirect to="/overview" />
        </Route>

        <Route exact path="/overview">
          <Overview holdings={holdings} totalValue={totalValue} />
        </Route>

        <Route exact path="/manage">
          <Manage
            fetchInfo={fetchInfo}
            holdings={holdings}
            addHoldings={addHoldings}
            handleUpdateEntry={handleUpdateEntry}
            handleDeleteEntry={handleDeleteEntry}
          />
        </Route>

        <Route exact path="/recommendation">
          <Recommendation
            handleUpdateEntry={handleUpdateEntry}
            holdings={holdings}
            totalDeltaPct={totalDeltaPct}
            totalValue={totalValue.current}
            generateNextStockInfo={generateNextStockInfo}
          />
        </Route>
      </Switch>
      <NavBar />
    </>
  );
};

export default StateContainer;
