import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList.jsx";
import ErrorBoundary from "./ErrorBoundary";
import EisenhowerMatrix from "./components/EisenhowerMatrix.jsx";
import { FaPlus, FaThList, FaTable } from "react-icons/fa";

const App = ({ baseUrl }) => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [activeTab, setActiveTab] = useState("tasks");

  // Carregar tarefas do localStorage apenas na primeira renderização
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  // Salvar tarefas no localStorage, evitando reescrita desnecessária
  useEffect(() => {
    const savedTasks = JSON.stringify(tasks);
    if (savedTasks !== localStorage.getItem("tasks")) {
      localStorage.setItem("tasks", savedTasks);
    }
  }, [tasks]);

  // Adicionar nova tarefa com validação
  const addTask = () => {
    const trimmedTask = taskName.trim();
    if (trimmedTask) {
      setTasks([...tasks, { name: trimmedTask, subtasks: [] }]);
      setTaskName("");
    }
  };

  // Deletar tarefa com confirmação
  const deleteTask = (taskIndex) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (confirmed) {
      setTasks(tasks.filter((_, index) => index !== taskIndex));
    }
  };

  return (
    <ErrorBoundary>
      <div
        style={{
          padding: "10px",
          backgroundColor: "var(--primary-color)",
          color: "#fff",
          borderRadius: "5px",
        }}
      >
        {/* Cabeçalho */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={`${baseUrl}assets/icon.png`}
            alt="Logo Task"
            style={{ width: "24px", height: "24px", marginRight: "10px" }}
          />
          <h3>Tasks</h3>
        </div>

        {/* Abas de navegação */}
        <div
          style={{
            display: "flex",
            marginTop: "10px",
            marginBottom: "10px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <button
            onClick={() => setActiveTab("tasks")}
            style={{
              flex: 1,
              padding: "10px",
              backgroundColor: activeTab === "tasks" ? "rgba(255, 255, 255, 0.1)" : "transparent",
              border: "none",
              borderEndStartRadius: "3px",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <FaThList /> Task List
          </button>

          <button
            onClick={() => setActiveTab("matrix")}
            style={{
              flex: 1,
              padding: "10px",
              backgroundColor: activeTab === "matrix" ? "rgba(255, 255, 255, 0.1)" : "transparent",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <FaTable /> Matrix
          </button>
        </div>

        {/* Conteúdo da aba ativa */}
        {activeTab === "tasks" ? (
          <>
            {/* Input e botão para adicionar tarefa */}
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <input
                type="text"
                placeholder="Create Task..."
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: "2px",
                  marginRight: "10px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              />
              
              <button
                onClick={addTask}
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  color: "#fff",
                  border: "1px solid #1db8d5f8",
                  borderRadius: "4px",
                  padding: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaPlus size={16} />
              </button>
              
              
            </div>

            {/* Lista de tarefas */}
            <div style={{ overflowY: "auto", maxHeight: "400px", height: "400px" }}>
              <TaskList tasks={tasks} setTasks={setTasks} deleteTask={deleteTask} />
            </div>
          </>
        ) : (
          // Exibir a matriz de Eisenhower
          <EisenhowerMatrix tasks={tasks} />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;