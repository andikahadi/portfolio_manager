import React from "react";
import { BrowserRouter } from "react-router-dom";
import StateContainer from "./component/StateContainer";

function App() {
  return (
    <BrowserRouter>
      <StateContainer />
    </BrowserRouter>
  );
}

export default App;
