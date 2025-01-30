import React, { useState, useEffect } from "react";

const EisenhowerMatrix = () => {
  const [tasks, setTasks] = useState([]);

  // Carregar tarefas do localStorage ao iniciar
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Função para classificar as tarefas nos quadrantes
  const classifyTasks = (tasks) => {
    const quadrants = {
      urgentImportant: [],
      notUrgentImportant: [],
      urgentNotImportant: [],
      notUrgentNotImportant: [],
    };

    tasks.forEach((task) => {
      const isImportant = task.subtasks.length > 3;
      const isUrgent = task.subtasks.some((subtask) => !subtask.completed);

      if (isUrgent && isImportant) {
        quadrants.urgentImportant.push(task);
      } else if (!isUrgent && isImportant) {
        quadrants.notUrgentImportant.push(task);
      } else if (isUrgent && !isImportant) {
        quadrants.urgentNotImportant.push(task);
      } else {
        quadrants.notUrgentNotImportant.push(task);
      }
    });

    return quadrants;
  };

  const quadrants = classifyTasks(tasks);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h5>Matriz de Eisenhower</h5>

      <div
        style={{
          // display: "grid",
          // gridTemplateColumns: "1fr 1fr",
          // gridTemplateRows: "1fr 1fr",
          
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: "10px",
          width: "100%",
          margin: "10px auto",
          color: 'gray',
        }}
      >
        <Quadrant title="Urgente e Importante" tasks={quadrants.urgentImportant} />
        
        <Quadrant title="Não Urgente, mas Importante" tasks={quadrants.notUrgentImportant} />
        
        <Quadrant title="Urgente, mas Não Importante" tasks={quadrants.urgentNotImportant} />
        
        <Quadrant title="Não Urgente e Não Importante" tasks={quadrants.notUrgentNotImportant} />
      </div>
    </div>
  );
};

// Componente reutilizável para cada quadrante
const Quadrant = ({ title, tasks }) => (
  <div style={{ 
   border: "1px solid #ccc", 
   padding: "5px", 
   borderRadius: "2px",
   backgroundColor: "#f9f9f9",
   width: "100%",
   
  }}>
    <h2
    style={{
     fontSize: "10px",
    }}
    >{title}</h2>
    {tasks.length > 0 ? (
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <strong>{task.name}</strong>
            <ul>
              {task.subtasks.map((subtask, subIndex) => (
                <li key={subIndex} style={{ color: subtask.completed ? "green" : "red" }}>
                  {subtask.name} - {subtask.completed ? "Concluída" : "Pendente"}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    ) : (
      <p style={{ fontStyle: "italic", color: "#999" }}>Nenhuma tarefa aqui</p>
    )}
  </div>
);

export default EisenhowerMatrix;