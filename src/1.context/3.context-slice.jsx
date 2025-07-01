// context 跨级传值
import { useContext, createContext, useState } from "react";

// const Context = createContext();
const Context1 = createContext();
const Context2 = createContext();

function Child1() {
  console.log("Child1 Rendered");
  const { count1, setCount1 } = useContext(Context1);
  return <div onClick={() => setCount1(count1 + 1)}>{count1}</div>;
}

function Child2() {
  console.log("Child2 Rendered");
  const { count2, setCount2 } = useContext(Context2);
  return <div onClick={() => setCount2(count2 + 1)}>{count2}</div>;
}

function Child3() {
  console.log("Child3 Rendered");
  const { setCount2 } = useContext(Context2);
  return <div onClick={() => setCount2((count2) => count2 + 1)}>not used</div>;
}

function Provider1({ children }) {
  const [count1, setCount1] = useState(0);
  return (
    <Context1.Provider value={{ count1, setCount1 }}>
      {children}
    </Context1.Provider>
  );
}

function Provider2({ children }) {
  const [count2, setCount2] = useState(0);
  return (
    <Context2.Provider value={{ count2, setCount2 }}>
      {children}
    </Context2.Provider>
  );
}

export default function App() {
  console.log("App Rendered");

  // 未拆分 context
  // return (
  //   <Context.Provider value={{ count1, setCount1, count2, setCount2 }}>
  //     <Child1 />
  //     <Child2 />
  //   </Context.Provider>
  // );

  // 拆分 context
  return (
    <Provider1>
      <Provider2>
        <Child1 />
        <Child2 />
        <Child3 />
      </Provider2>
    </Provider1>
  );
}

// context 细粒度拆分可以减少不必要的重新渲染
// 理论上拆的越细，性能优化效果越好
