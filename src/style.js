export const modalStyles = {
  overlay: `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    visibility: hidden;
    background-color: rgba(0, 0, 0, 0.1); 
  `,
  container: `
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    width: calc(100% - 15%);
    height: calc(80% - 10%);
    font-family: Arial, sans-serif;
    background: var(--primary-color); 
    border: none; 
    padding: 20px; /* Adicionado padding para dar espaço interno */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    position: relative; 
    overflow: hidden;
  `,
  closeButton: `
    position: absolute; 
    top: 300px; 
    right: 10px; 
    background: red;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px; /* Alterado para suavizar bordas */
    cursor: pointer;
    z-index: 1000; 
  `,
};