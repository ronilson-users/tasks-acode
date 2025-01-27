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
    z-index: 9999;
    visibility: hidden; 
    background-color: rgba(255, 255, 255, 0.1); /* Fundo semi-transparente */
            
   
  `,
 container: `
    display: flex;
    flex-direction: column; 
    
    
    border-radius: 4px;
   
    width: calc(100% - 15%);;
    height: calc(100% - 10%);
    font-family: Arial, sans-serif; 
  `,
};