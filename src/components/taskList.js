import React, { useState, useEffect } from "react";
import Task from "./task";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  /*const fetchTasks = async () => {
    const allTasks = await DataStore.query(Task);
    setTasks(allTasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);*/

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
