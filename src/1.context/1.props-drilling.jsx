// props drilling 逐级传值
import { useState } from "react";

function DeepChild({ count, setCount }) {
  console.log("DeepChild Rendered");
  return <div onClick={() => setCount(count + 1)}>{count}</div>;
}

function GrandChild({ count, setCount }) {
  console.log("GrandChild Rendered");
  return <DeepChild count={count} setCount={setCount} />;
}

function Child({ count, setCount }) {
  console.log("Child Rendered");
  return <GrandChild count={count} setCount={setCount} />;
}

export default function App() {
  console.log("App Rendered");
  const [count, setCount] = useState(0);

  return <Child count={count} setCount={setCount} />;
}

// 无法对子组件 re-render 进行性能优化，因为 props 变化会导致所有子组件重新渲染
// UI = render(Props)
