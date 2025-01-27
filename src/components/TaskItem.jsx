import React, { useState } from "react";
import {
 FaTrash,
 
 FaPaperclip,
 FaSave,
 FaChevronDown,
 FaChevronRight,

} from "react-icons/fa";
import { VscCombine , VscCheck ,VscNote, VscAdd} from "react-icons/vsc";

import { LuPencilLine } from "react-icons/lu";

import { MdMoveDown, MdMoveUp } from "react-icons/md";

const buttonStyle = {
 color: "#fff",
 backgroundColor: 'rgba(0, 0, 0, 0.1)',
 marginRight: "5px",
 marginBottom: "0",
 marginTop: "0",
 padding: "8px",
 border: "none",
 borderRadius: "4px",
 cursor: "pointer",
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
 transition: "background-color 0.3s, opacity 0.3s",
};

const textInputStyle = {
 flex: 1,
 padding: "8px",
 marginRight: "5px",
 backgroundColor: 'rgba(0, 0, 0, 0.1)',
 color: "#f8f8f2",
 borderBottom: "1px solid #555",
 borderRadius: "2px",
};

const progressBarStyle = {
 height: "4px",
 backgroundColor: "#ddd",
 borderRadius: "2px",
 overflow: "hidden",
 margin: "5px",
};

const progressStyle = (percentage) => ({
 height: "100%",
 width: `${percentage}%`,
 backgroundColor: percentage === 100 ? "#5bddf5" : "#3b82f6",
 transition: "width 0.3s",
});


const TaskItem = ({ task, taskIndex, setTasks, deleteTask }) => {
 const [subtaskName, setSubtaskName] = useState("");

 const [showDetails, setShowDetails] = useState(false);

 const addSubtask = () => {
  if (subtaskName.trim()) {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[taskIndex].subtasks.push({
        name: subtaskName,
        completed: false,
        note: "",
        isEditingNote: false,
        isNoteVisible: true, // Adiciona o estado de visibilidade da nota
      });
      return updatedTasks;
    });
    setSubtaskName("");
  }
};

 const toggleSubtaskCompletion = (subtaskIndex) => {
  setTasks((prevTasks) => {

   const updatedTasks = [...prevTasks];
   const subtask = updatedTasks[taskIndex].subtasks[subtaskIndex];

   subtask.completed = !subtask.completed;
   return updatedTasks;
  });
 };

 const deleteSubtask = (subtaskIndex) => {
  const confirmDelete = window.confirm("Tem certeza de que deseja excluir esta subtask?");

  if (confirmDelete) {
   setTasks((prevTasks) => {
    const updatedTasks = [...prevTasks];
    updatedTasks[taskIndex].subtasks.splice(subtaskIndex, 1);
    return updatedTasks;
   });
  }
 };





 const saveNote = (subtaskIndex, noteText) => {
  setTasks((prevTasks) => {
   const updatedTasks = [...prevTasks];
   updatedTasks[taskIndex].subtasks[subtaskIndex].note = noteText;
   updatedTasks[taskIndex].subtasks[subtaskIndex].isEditingNote = false;
   return updatedTasks;
  });
 };

 const handleClipClick = (subtaskIndex) => {
  setTasks((prevTasks) => {
   const updatedTasks = [...prevTasks];
   updatedTasks[taskIndex].subtasks[subtaskIndex].isEditingNote =
    !updatedTasks[taskIndex].subtasks[subtaskIndex].isEditingNote;
   return updatedTasks;
  });
 };
 
 
 const [isNoteVisible, setIsNoteVisible] = useState(true);
 
 const hiddenNote = (subtaskIndex) => {
  setTasks((prevTasks) => {
    const updatedTasks = [...prevTasks];
    const subtask = updatedTasks[taskIndex].subtasks[subtaskIndex];
    subtask.isNoteVisible = !subtask.isNoteVisible; // Alterna a visibilidade da nota
    return updatedTasks;
  });
};
 

 const hasNotes = task.subtasks.some((subtask) => subtask.note && subtask.note.trim() !== "");

 // Calcula progresso
 const completedSubtasks = task.subtasks.filter((s) => s.completed).length;
 const totalSubtasks = task.subtasks.length;
 const progressPercentage = totalSubtasks
  ? (completedSubtasks / totalSubtasks) * 100
  : 0;

 // Verifica se todas as subtarefas estão concluídas
 const allCompleted =
  task.subtasks.length > 0 && task.subtasks.every((s) => s.completed);

 const [text, setText] = useState(""); // Estado para armazenar o conteúdo do textarea
 const [checkboxes, setCheckboxes] = useState([]); // Estado para armazenar os checkboxes gerados

 // Função para capturar os elementos DENTRO DO textarea e criar os checkboxes EM NOTES
 const generateCheckboxes = (noteIndex) => {
  const regex = /#\s*(.+?)\./g;
  const subtaskNote = task.subtasks[noteIndex].note; // Corrigido para acessar a nota correta
  const matches = [...subtaskNote.matchAll(regex)].map(match => match[1]);

  if (matches.length === 0) {
   alert("Nenhum texto no formato '# TEXTO.' foi encontrado.");
   return;
  }

  setTasks((prevTasks) => {
   const updatedTasks = [...prevTasks];
   updatedTasks[taskIndex].subtasks[noteIndex].checkboxes = matches;
   return updatedTasks;
  });
 };

 return (

  // task principal
  <li
   style={{
    marginBottom: "5px",
    padding: "5px",
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    color: "#fff",
    borderRadius: "2px",
    border: allCompleted ? "1px solid #5bddf5" : "1px solid #06f471d5",
   }}>

   {/*container da task*/}
   <div
    style={{
     display: "flex",
     justifyContent: "space-between",
     alignItems: "center",

    }}>
    {/* task Name*/}
    <span
     style={{
      marginLeft: "10px",
      color: allCompleted ? "#5bddf5" : "#fff",
      fontWeight: allCompleted ? "bold" : "normal",
     }}>
     {task.name}
    </span>
    {/*tarefa concuilda  check icon */}
    <div
     style={{
      display: "flex",
      alignItems: "center",
      marginRigth: "5px"
     }}>

     {allCompleted && (
      <VscCheck
       style={{
        color: "#5bddf5",
        marginRigth: "10px",
        fontSize: "12px",
        padding: "5px"
       }}
       aria-label="All Subtasks Completed"
      />
     )}

     {/*notificaçoes de anotações presentes*/}
     <span
      style={{
       ...buttonStyle,

       color: hasNotes ? "#FFD700" : "#fff",
      }}
      aria-label="Attach Note" >
      <VscNote />
     </span>

     {/* button Mostrar e Recolher  */}
     <button
      onClick={() => setShowDetails((prev) => !prev)}
      style={buttonStyle}
      aria-label="Toggle Details"
     >
      {showDetails ? <FaChevronDown /> : <FaChevronRight />}
     </button>

     {/* buttons Deletar Task*/}
     <button
      onClick={() => deleteTask(taskIndex)}
      style={buttonStyle}
      aria-label="Delete Task"
     >
      <FaTrash />
     </button>

    </div>
   </div>

   {showDetails && (
    <div style={{
     marginTop: "8px",
    }}>
     <div style={{
      display: "flex",
      marginBottom: "8px",

     }}>

      <input
       type="text"
       value={subtaskName}
       onChange={(e) => setSubtaskName(e.target.value)}
       onKeyDown={(e) => {
        if (e.key === "Enter") setSubtaskName(e.target.value);
       }}
       placeholder="Add a new subtask"
       style={{
        ...textInputStyle,
        marginLeft: "20px",
        borderRadius: "3px",
        color: "gray",
        border: "1px solid #15ec76d5"
       }


       }
      />
      <button
       onClick={addSubtask}
       style={{
        ...buttonStyle,
        border: "1px solid #15ec76d5"
       }}
       aria-label="Add Sub-task"
      >
       <VscAdd />
      </button>
     </div>

     {/* subtasks */}
     <ul style={{
      listStyle: "none", padding: "0px",
      marginLeft: "20px",

     }}>
      {task.subtasks.map((subtask, index) => (
       <li
        key={index}
        style={{
         marginBottom: "5px",
         backgroundColor: "rgba(0,0,0, 0.1)",
         borderRadius: "2px",

         border: "1px solid gray",
        }}
       >
        <div
         style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
         }}
        >
         <label
          style={{
           display: "flex",
           alignItems: "center",
           flex: 1,
           padding: 0
          }}
         >
          <input
           type="checkbox"
           checked={subtask.completed}
           onChange={() => toggleSubtaskCompletion(index)}
           style={{
            marginRight: "10px",
            marginLeft: "10px",
            marginBottom: "0",
            marginTop: "0",
           }}
          />
          <span
           style={{
            textDecoration: subtask.completed ? "line-through" : "none",
            color: "gray",
            fontSize: "12px"
           }}
          >
           {subtask.name}
          </span>
         </label>
         <div style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "5px"

         }}>
         
         {/* edita anotaçoes */}
          <button
           onClick={() => handleClipClick(index)}
           style={buttonStyle}
           aria-label="Edit Note"
          >
           <LuPencilLine />
          </button>
       
         {/*oculta  anotaçoes*/}
         <button
  onClick={() => hiddenNote(index)} // Passa o índice da subtarefa
  style={{
    ...buttonStyle,
    color: subtask.isNoteVisible ? "#fff" : "#f2ae1fd5", // Muda a cor do ícone
  }}
  aria-label="Oculta NOTE"
>
  {subtask.isNoteVisible ? <MdMoveDown /> : <MdMoveUp />}
</button>
          <button
           onClick={() => deleteSubtask(index)}
           style={buttonStyle}
           aria-label="Delete Subtask"
          >
           <FaTrash />
          </button>
         </div>
        </div>
        {subtask.isEditingNote && (
         <div style={{
          marginTop: "5px",
          fontSize: "10px"
         }}>

          {/* area para anotaçoes note */}
          <textarea
           rows="6"
           cols="40"
           value={subtask.note}
           onChange={(e) => {
            setTasks((prevTasks) => {
             const updatedTasks = [...prevTasks];
             updatedTasks[taskIndex].subtasks[index].note = e.target.value;
             return updatedTasks;
            });
            setText(e.target.value); // Atualiza o estado `text`
           }}
           placeholder="Add a note"
           style={{
            width: "calc(100% - 10%)",
            height: "100px",
            padding: "8px",
            marginLeft: "6px",
            marginBottom: "5px",
            backgroundColor: "#282c34",
            color: "#f8f8f2",
            border: "1px solid #61dafb",
            borderRadius: "2px",
            fontSize: "12px",
            fontFamily: "'Fira Code', monospace",
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            resize: "both",
            outline: "none",
            transition: "border-color 0.3s, box-shadow 0.3s",
           }}
           onFocus={(e) => {
            e.target.style.borderColor = "#21a1f1";
            e.target.style.boxShadow = "0 0 6px rgba(33, 161, 241, 0.5)";
           }}
           onBlur={(e) => {
            e.target.style.borderColor = "#61dafb";
            e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
           }}
          />
          <button
           onClick={() => saveNote(index, subtask.note)}
           style={{
            ...buttonStyle,
            marginLeft: "250px",

           }}
           aria-label="Save Note"
          >
           <FaSave />
          </button>


          <button
           onClick={() => generateCheckboxes(index)}
           style={{
            ...buttonStyle

           }}
          >
          <VscCombine />
          </button>
         </div>
        )}
     {subtask.note && !subtask.isEditingNote && (
     <div
       style={{
         margin: "5px",
         textOverflow: "ellipsis",
         fontSize: "12px",
         color: "#f2ae1fd5",
         border: "1px solid gray",
         padding: "5px",
         overflow: 'hidden',
         
         whiteSpace: "pre-wrap",
         height: subtask.isNoteVisible ? "100%" : "10px", 
         transition: "height 0.3s", // Adiciona uma transição suave
       }}
     >
       <strong
         style={{
           fontSize: "12px",
           color: "#989898d5",
           fontWeight: "bold",
           fontStyle: "italic",
           marginLeft: "5px",
           textDecoration: "underline",
         }}
       >
         Note:
       </strong> {subtask.note}

       {/* Renderização dos Checkboxes */}
       {subtask.checkboxes && subtask.checkboxes.map((checkbox, idx) => (
         <div key={idx}
           style={{
             marginLeft: "10px",
             marginTop: "1px",
             display: "flex",
             alignItems: "center",
           }}>
           <input
             type="checkbox"
             id={`checkbox-${idx}`}
             style={{ marginRight: "3px", borderBottom: '1px solid gray', }}
           />
           <label htmlFor={`checkbox-${idx}`} style={{ color: "#fff", }}>
             {checkbox}
           </label>
         </div>
       ))}
     </div>
   )}
       </li>
      ))}
     </ul>

     {/* Barra de Progresso */}
     <div>
      <span
       style={{
        marginLeft: "125px",
        fontSize: "10px",
       }}
      >
       {completedSubtasks}/{totalSubtasks} completed
      </span>
      <div style={progressBarStyle}>
       <div style={progressStyle(progressPercentage)}></div>
      </div>
     </div>
    </div>
   )}
  </li>


 );

};

export default TaskItem;