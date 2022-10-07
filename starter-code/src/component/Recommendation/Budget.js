import React, { useState } from "react";

const Budget = (props) => {
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
      <div className="budget-container">
        <form>
          <h3>Allocation for the next purchase: </h3>
          <div className="budget-row">
            <div>
              <label>${props.userBudget}</label>
            </div>
            <div className="formButton">
              <button onClick={handleUpdate}>Edit</button>
            </div>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="budget-container">
        <form>
          <h3>Allocation for the next purchase: </h3>
          <div className="budget-row">
            <div>
              <input
                type="number"
                onChange={handleInputChange}
                value={budget}
              />
            </div>
            <div className="formButton">
              <button onClick={handleUpdate}>Update</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default Budget;
