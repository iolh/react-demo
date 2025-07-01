// context 跨级传值
import { memo, useMemo } from "react";
import { useContext, createContext, useState } from "react";

const Context = createContext();

function DeepChild() {
  console.log("DeepChild Rendered");
  console.log("==================");
  const { count, setCount } = useContext(Context);
  return <div onClick={() => setCount(count + 1)}>{count}</div>;
}

function GrandChild() {
  console.log("GrandChild Rendered");
  return <DeepChild />;
}

// 优化组件渲染
const Child = memo(() => {
  console.log("Child Rendered");
  return <GrandChild />;
});

export default function App() {
  console.log("App Rendered");
  const [count, setCount] = useState(0);

  // useMemo 优化子组件渲染
  const child = useMemo(() => <Child />, []);
  console.dir(child);

  return (
    <Context.Provider
      value={{
        count,
        setCount,
      }}
    >
      <Child />
    </Context.Provider>
  );
}

// 因为子组件采用 context 依赖注入，没有改变 props 的情况下不会重新渲染
// 对未依赖 context 的子组件进行性能优化
