import React, { useState } from "react";

const Budget = (props) => {
  // const [isBudgetUpdate, setIsBudgetUpdate] = useState(false);

  // const handleClick = (event) => {
  //   event.preventDefault();
  //   setIsBudgetUpdate(!isBudgetUpdate);
  // };
  // return (
  //   <div>
  //     <form>
  //       <label>User monthly budget: </label>
  //       <label>{props.userBudget}</label>
  //       <button onClick={handleClick}>set budget</button>
  //     </form>
  //     {console.log(isBudgetUpdate)}
  //   </div>
  // );

  const [budget, setBudget] = useState(props.userBudget);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleInputChange = (event) => {
    setBudget(event.target.value);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    setIsUpdating(!isUpdating);

    props.handleBudgetChange(budget);
    window.localStorage.setItem("userBudget", JSON.stringify(budget));
  };

  if (isUpdating === false) {
    return (
      <div>
        <form>
          <label>User monthly budget: </label>
          <div>
            <label>{props.userBudget}</label>
            <button onClick={handleUpdate}>set budget</button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <form>
          <label>User monthly budget: </label>
          <div>
            <input type="number" onChange={handleInputChange} value={budget} />
            <button onClick={handleUpdate}>update</button>
          </div>
        </form>
      </div>
    );
  }
};

export default Budget;
