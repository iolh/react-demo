import { useState } from 'react';
import { useTasksDispatch } from './TasksContext.jsx';

export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useTasksDispatch();
  return (
    <>
      <input
        placeholder="添加任务"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={() => {
        setText('');
        dispatch({
          type: 'added',
          id: nextId++,
          text: text,
        }); 
      }}>添加</button>
    </>
  );
}

let nextId = 3;
