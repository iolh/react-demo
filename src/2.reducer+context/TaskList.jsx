import { useState } from "react";
import { useTasks, useTasksDispatch } from "./TasksContext.jsx";

export default function TaskList() {
  const tasks = useTasks();
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} style={{ marginBottom: 10 }}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            dispatch({
              type: "changed",
              task: {
                ...task,
                text: e.target.value,
              },
            });
          }}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={() => setIsEditing(false)}>保存</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={() => setIsEditing(true)}>编辑</button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          dispatch({
            type: "changed",
            task: {
              ...task,
              done: e.target.checked,
            },
          });
        }}
      />
      {taskContent}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button
        onClick={() => {
          debugger;
          dispatch({
            type: "deleted",
            id: task.id,
          });
        }}
      >
        删除
      </button>
    </label>
  );
}
