export const taskStyles = {
  overlay: `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: flex-start; /* Alinha o conteúdo no topo */
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    z-index: 100; 
  `,
  container: `
    background-color: var(--primary-color);
    padding: 2px;
    border-radius: 0 0 16px 16px; 
    top: 45px;
    width: 100% ;
    max-width: 600px;
    position: relative;
    transition: transform 0.5s ease-in-out;
     transition-delay: 0.2s;
    transform: translateY(-10%, 0px); 
    transition: transform 0.3s ease;
    box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.1); 
  `,
  
};

