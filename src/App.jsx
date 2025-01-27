import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList.jsx";
import ErrorBoundary from "./ErrorBoundary";

import { FaPlus, FaFile, FaPaperclip } from 'react-icons/fa'; // Importe os ícones



const App = ({ baseUrl }) => {
 const [tasks, setTasks] = useState([]);
 const [taskName, setTaskName] = useState("");

 // Carregar tarefas do localStorage
 useEffect(() => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) setTasks(JSON.parse(savedTasks));
 }, []);

 // Salvar tarefas no localStorage
 useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
 }, [tasks]);

 // Adicionar nova tarefa
 const addTask = () => {
  if (taskName.trim() !== "") {
   setTasks([...tasks, { name: taskName, subtasks: [] }]);
   setTaskName("");
  }
 };

 // Deletar tarefa
 const deleteTask = (taskIndex) => {
  setTasks(tasks.filter((_, index) => index !== taskIndex));
 };

 return (
  <ErrorBoundary>
   <div style={{
    padding: "5px",
    backgroundColor: "var(--primary-color)",
    color: "#fff",
    borderRadius: "3px",
   }}>
    <div style={{
     display: "flex",
     alignItems: "center",
    }}>
    
     <img
      src={`${baseUrl}assets/icon.png`}
      alt="Logo Task"
      style={{
       width: "20px",
       height: "20px",
       margin: "10px",
      }}
     />
     <h3>Tasks</h3>
    </div>

    <div style={{ 
     display: "flex", 
     marginBottom: "10px" 
     }}>
     
     <input
      type="text"
      placeholder="Create Task..."
      value={taskName}
      
      onChange={(e) => setTaskName(e.target.value)}
      
      onKeyDown={(e) => {
          if (e.key === "Enter") setTaskName(e.target.value);
        }}
      style={{
       flex: 1, 
       padding: "5px", 
       marginLeft: "10px",
       marginRight: "10px",
      }} />
      
     <button onClick={addTask} style={{
      color: '#fff',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      marginRight: '5px',
      padding: '8px',
      border: 'none',
      borderRadius: '2px',
      cursor: 'pointer',
      alignItems: 'center',
      justifyContent: 'center',
     }}>
     
      <FaPlus size={12} />
     </button>
     
    </div>
    
    <div style={{
     overflowY: "auto",
     maxHeight: "500px",
    }}>
    
     <TaskList
      tasks={tasks}
      setTasks={setTasks}
      deleteTask={deleteTask} />
    </div>
   </div>
  </ErrorBoundary>
 );
};

export default App;