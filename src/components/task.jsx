import React from 'react';

const Task = ({ task }) => {
  return (
    <div className="task">
      <p className={task.completed ? 'completed' : ''}>{task.title}</p>
      <button onClick={() => { /* Implement toggle completion functionality */ }}>
        {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
      </button>
    </div>
  );
};

export default Task;
