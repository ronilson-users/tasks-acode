import plugin from "../plugin.json";
import React from "react";
import ReactDOM from "react-dom/client"; // import createRoot from ReactDOM
import ErrorBoundary from "./ErrorBoundary"; // Import the error boundary
 
import App from "./App";

import { modalStyles } from "./style.js";  // Importando os estilos

class AcodePlugin {

 async init(
  baseUrl,
  cacheFile,
  cacheFileUrl) {

  // Crie um container para o modal
  let modalOverlay = document.createElement("div");
  
  modalOverlay.id = "modal-overlay";
  modalOverlay.style.cssText = modalStyles.overlay;  // Aplicando estilo

  let modalContainer = document.createElement("div");
  
  modalContainer.id = "modal-container";
  modalContainer.style.cssText = modalStyles.container;  // Aplicando estilo

  modalOverlay.appendChild(modalContainer);


  document.body.appendChild(modalOverlay);


  // Crie um React root e renderize o app no modal
  const root = ReactDOM.createRoot(modalContainer);

  root.render(
   <ErrorBoundary>
 <App
 
     baseUrl={this.baseUrl}
     cacheFile={cacheFile}
     cacheFileUrl={cacheFileUrl} />
      
   </ErrorBoundary>
  );

  this.modalOverlay = modalOverlay;

  // Adiciona o comando para abrir o modal
  editorManager.editor.commands.addCommand({
   name: "react-acode",
   description: "react acode interface",
   bindKey: {
    win: "Ctrl-Shift-r",
   },
   exec: () => this.showModal(),
  });


  modalOverlay.addEventListener("click", (e) => {
   if (e.target === modalOverlay) {
    this.hideModal();
   }
  });
 }

 // Função para mostrar o modal
 showModal() {
  if (this.modalOverlay) {
   this.modalOverlay.style.visibility = "visible";
  }
 }

 // Função para esconder o modal
 hideModal() {
  if (this.modalOverlay) {
   this.modalOverlay.style.visibility = "hidden";
  }
 }

 async destroy() {
  // Desmonte o React app e remova o modal
  if (this.modalOverlay) {
   const modalContainer = document.getElementById("modal-container");
   if (modalContainer) {
    ReactDOM.createRoot(modalContainer).unmount();
   }
   this.modalOverlay.remove();
  }
 }
}

if (window.acode) {
 const acodePlugin = new AcodePlugin();

 acode.setPluginInit(
  plugin.id,
  async (baseUrl, $page, {
   cacheFileUrl, cacheFile
  }) => {
   if (!baseUrl.endsWith("/")) {
    baseUrl += "/";
   }
   acodePlugin.baseUrl = baseUrl;
   await acodePlugin.init($page, cacheFile, cacheFileUrl);
  }
 );

 acode.setPluginUnmount(plugin.id,
  () => {
   acodePlugin.destroy();
  });
}