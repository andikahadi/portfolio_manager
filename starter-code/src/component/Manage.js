import React, { useState, useEffect, useRef } from "react";
import Form from "./Form";
import InputCard from "./InputCard";

// need to fix loading and error condition

const Manage = (props) => {
  const [newHolding, setNewHolding] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let isMounted = useRef(false);

  // const fetchInfo = async (url1, url2, stateInput, changeOutFn, signal) => {
  //   setIsLoading(true);
  //   setError(false);

  //   try {
  //     const res1 = await fetch(url1, { signal: signal });
  //     const res2 = await fetch(url2, { signal: signal });

  //     if (res1.status !== 200 || res2.status !== 200) {
  //       throw new Error("Something went wrong");
  //     }
  //     const data1 = await res1.json();
  //     const data2 = await res2.json();

  //     const nameRemoveInc = data1.name.slice(0, -4);
  //     const twoDecUnrealizedGain =
  //       Math.round(
  //         parseInt(stateInput.position) *
  //           (data2.c - parseInt(stateInput.cost)) *
  //           100
  //       ) / 100;

  //     const twoDecValue =
  //       Math.round(parseInt(stateInput.position) * data2.c * 100) / 100;

  //     const stockInfo = {
  //       symbol: stateInput.symbol.toUpperCase(),
  //       name: nameRemoveInc,
  //       logo: data1.logo,
  //       position: stateInput.position,
  //       cost: stateInput.cost,
  //       price: data2.c,
  //       value: twoDecValue,
  //       unrealizedGain: twoDecUnrealizedGain,
  //       unrealizedGainPct:
  //         (Math.round(
  //           (twoDecUnrealizedGain / (stateInput.position * stateInput.cost)) *
  //             1000
  //         ) /
  //           1000) *
  //         100,
  //     };

  //     console.log(data2);
  //     changeOutFn(stockInfo);
  //   } catch (err) {
  //     setError(err.message);
  //   }

  //   setIsLoading(false); // turn off loading animation
  // };

  const handleSubmit = (input) => {
    setNewHolding(input);
  };

  useEffect(() => {
    if (isMounted.current) {
      const urlInfo =
        "https://finnhub.io/api/v1/stock/profile2?symbol=" +
        newHolding.symbol +
        "&token=ccprl9aad3idf7jqketgccprl9aad3idf7jqkeu0";

      const urlPrice =
        "https://finnhub.io/api/v1/quote?symbol=" +
        newHolding.symbol.toUpperCase() +
        "&token=ccprl9aad3idf7jqketgccprl9aad3idf7jqkeu0";

      const controller = new AbortController();
      props.fetchInfo(
        urlInfo,
        urlPrice,
        newHolding,
        props.addHoldings,
        controller.signal
      );
      console.log(urlPrice);
      return () => {
        controller.abort();
      };
    } else {
      isMounted.current = true;
      console.log("first mount");
    }
  }, [newHolding]);

  return (
    <div className="manageContainer">
      <Form handleSubmit={handleSubmit} />
      <InputCard
        holdings={props.holdings}
        handleUpdateEntry={props.handleUpdateEntry}
        handleDeleteEntry={props.handleDeleteEntry}
      />
    </div>
  );
};

export default Manage;
