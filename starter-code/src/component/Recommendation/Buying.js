import React from "react";
import BuyingCard from "./BuyingCard";

const Buying = (props) => {
  const newDeltaArr = [];
  for (let i = 0; i < props.holdings.length; i++) {
    if (props.holdings[i].isBuyingCandidate) {
      const buyQty =
        Math.round(
          (((props.holdings[i].deltaPct / props.totalDeltaPct.current) *
            props.userBudget) /
            props.holdings[i].price) *
            100
        ) / 100;
      newDeltaArr.push({
        name: props.holdings[i].name,
        logo: props.holdings[i].logo,
        symbol: props.holdings[i].symbol,
        delta: props.holdings[i].deltaPct,
        holdingsIndex: i,
        price: props.holdings[i].price,
        buyQty: buyQty,
        buyValue: Math.round(buyQty * props.holdings[i].price * 100) / 100,
      });
    }
  }
  // const handleUpdateEntry = (updatedItem, index) => {
  //   setHoldings((prevEntry) => {
  //     const arr = [...prevEntry];
  //     arr[index] = updatedItem;
  //     return arr;
  //   });
  // };

  const handleBuyAll = () => {
    for (let i = 0; i < newDeltaArr.length; i++) {
      const updatedEntry = {
        ...props.holdings[newDeltaArr[i].holdingsIndex],
        position:
          props.holdings[newDeltaArr[i].holdingsIndex].position +
          newDeltaArr[i].buyQty,
      };
      props.handleUpdateEntry(updatedEntry, newDeltaArr[i].holdingsIndex);
    }
  };

  return (
    <div className="container">
      {newDeltaArr.map((d, index) => {
        return (
          <BuyingCard
            d={d}
            index={index}
            // isUpdating={isUpdating}
            handleUpdateEntry={props.handleUpdateEntry}
          />
        );
      })}
      <button onClick={handleBuyAll}>Buy All</button>
    </div>
  );
};

export default Buying;
