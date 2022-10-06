import React from "react";
import BuyingCard from "./BuyingCard";

const Buying = (props) => {
  const newDeltaArr = [];
  for (let i = 0; i < props.holdingsDelta.length; i++) {
    if (props.holdingsDelta[i].isBuyingCandidate) {
      const buyQty =
        Math.round(
          (((props.holdingsDelta[i].deltaPct / props.totalDeltaPct) *
            props.userBudget) /
            props.holdingsDelta[i].price) *
            100
        ) / 100;
      newDeltaArr.push({
        name: props.holdingsDelta[i].name,
        logo: props.holdingsDelta[i].logo,
        symbol: props.holdingsDelta[i].symbol,
        delta: props.holdingsDelta[i].deltaPct,
        holdingsIndex: props.holdingsDelta[i].holdingsIndex,
        price: props.holdingsDelta[i].price,
        buyQty: buyQty,
        buyValue: Math.round(buyQty * props.holdingsDelta[i].price * 100) / 100,
      });
      console.log(buyQty);
    }
  }

  const handleBuyAll = () => {
    for (let i = 0; i < newDeltaArr.length; i++) {
      // const updatedEntry = {
      //   ...props.holdings[newDeltaArr[i].holdingsIndex],
      //   position:
      //     props.holdings[newDeltaArr[i].holdingsIndex].position +
      //     newDeltaArr[i].buyQty,
      // };
      const newPosition =
        props.holdings[newDeltaArr[i].holdingsIndex].position +
        newDeltaArr[i].buyQty;
      const updatedEntry = props.generateNextStockInfo(
        props.holdings[newDeltaArr[i].holdingsIndex],
        newPosition,
        newDeltaArr[i].price
      );
      console.log(updatedEntry);
      props.handleUpdateEntry(updatedEntry, newDeltaArr[i].holdingsIndex);
    }
  };

  return (
    <div className="container">
      <h4>Suggested purchase : </h4>
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
      <div className="formButton">
        <button onClick={handleBuyAll}>I've made the purchase</button>
      </div>
    </div>
  );
};

export default Buying;
