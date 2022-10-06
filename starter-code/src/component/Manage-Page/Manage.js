import React, { useState, useEffect, useRef } from "react";
import Form from "./Form";
import InputCard from "./InputCard";

// need to fix loading and error condition

const Manage = (props) => {
  const [newHolding, setNewHolding] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let isMounted = useRef(false);

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
