import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, setTasks, deleteTask }) => {
  return (
    <ul style={{ listStyleType: "none", padding: "0",
     margin: "0",
     
    }}>
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          taskIndex={index}
          setTasks={setTasks}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;