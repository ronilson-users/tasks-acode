import plugin from "../plugin.json";
import React from "react";
import ReactDOM from "react-dom/client"; // import createRoot from ReactDOM
import ErrorBoundary from "./ErrorBoundary"; // Import the error boundary

import App from "./App";

import { taskStyles } from "./style.js";  // Importando os estilos


class AcodePlugin {
 async init(baseUrl, cacheFile, cacheFileUrl) {

  // Crie um container para o Container
  const taskOverlay = document.createElement("div");
  taskOverlay.id = "task-overlay";
  taskOverlay.style.cssText = taskStyles.overlay; // Aplicando estilo


  const taskContainer = document.createElement("div");
  taskContainer.id = "task-container";
  taskContainer.style.cssText = taskStyles.container; // Aplicando estilo

  // Adicione os elementos ao Container

  taskOverlay.append(taskContainer);
  document.body.append(taskOverlay);

  // Crie um React root e renderize o app no Container
  const root = ReactDOM.createRoot(taskContainer);

  root.render(
   <ErrorBoundary>
    <App baseUrl={this.baseUrl} cacheFile={cacheFile} cacheFileUrl={cacheFileUrl} />
   </ErrorBoundary>
  );

  this.taskOverlay = taskOverlay;

  // Adiciona o comando para abrir o Container
  editorManager.editor.commands.addCommand({
   name: "react-acode",
   description: "Task Manager",
   bindKey: {
    win: "Ctrl-Shift-R",
   },
   exec: () => this.showContainer(),
  });

  taskOverlay.addEventListener("click", (e) => {
   if (e.target === taskOverlay) {
    this.hideContainer();
   }
  });
 }

 // Função para mostrar o Container
 showContainer() {
  if (this.taskOverlay) {
   this.taskOverlay.style.visibility = "visible";
   this.taskOverlay.style.opacity = "1";
   const taskContainer = document.getElementById("task-container");
   taskContainer.style.transform = "translateY(0)";
  }
 }

 // Função para esconder o Container
 hideContainer() {
  if (this.taskOverlay) {
   const taskContainer = document.getElementById("task-container");
   taskContainer.style.transform = "translateY(-100%)";
   setTimeout(() => {
    this.taskOverlay.style.visibility = "hidden";
    this.taskOverlay.style.opacity = "0";
   }, 300); // Atraso para permitir a animação
  }
 }

 async destroy() {
  // Desmonte o React app e remova o Container
  if (this.taskOverlay) {
   const taskContainer = document.getElementById("task-container");
   if (taskContainer) {
    ReactDOM.createRoot(taskContainer).unmount();
   }
   this.taskOverlay.remove();
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