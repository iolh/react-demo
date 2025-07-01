import React, { useState } from "react";
import { createContext, useContextSelector } from "../useContextSelector";

const context = createContext(null);

const Count1 = () => {
  const count1 = useContextSelector(context, (state) => state.count1);
  const setCount1 = useContextSelector(context, (state) => state.setCount1);
  console.log("Count1 render");
  return <div onClick={() => setCount1(count1 + 1)}>count1: {count1}</div>;
};

const Count2 = () => {
  const count2 = useContextSelector(context, (state) => state.count2);
  console.log("Count2 render");
  return <div>count2: {count2}</div>;
};

const Provider = ({ children }) => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  return (
    <context.Provider
      value={{
        count1,
        count2,
        setCount1,
        setCount2,
      }}
    >
      {children}
    </context.Provider>
  );
};

const App = () => (
  <Provider>
    <Count1 />
    <Count2 />
  </Provider>
);

export default App;

