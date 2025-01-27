import React from "react";

class ErrorBoundary extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   hasError: false,
   error: null,
   errorInfo: null
  };
 }

 static getDerivedStateFromError(error) {
  // Atualiza o estado para que a próxima renderização mostre a UI de fallback
  return {
   hasError: true,
   error
  };
 }

 componentDidCatch(error, errorInfo) {
  // Registra o erro nos logs
  console.error("Error caught by ErrorBoundary:", error, errorInfo);
  this.setState({
   error, errorInfo
  });

  // Aqui você pode integrar com sistemas como Sentry ou LogRocket
  // logErrorToMonitoringService(error, errorInfo);
 }

 resetError = () => {
  // Reseta o estado para tentar novamente
  this.setState({
   hasError: false, error: null, errorInfo: null
  });
 };

 render() {
  if (this.state.hasError) {
   return (
    <div style={ { padding: "20px", border: "2px solid red", borderRadius: "5px" }}>
     <h1>Oops! Algo deu errado.</h1>
     <p>
      Detalhes do erro: <strong>{this.state.error?.toString()}</strong>
     </p>
     <button
      style={ {
       marginTop: "10px",
       padding: "10px",
       background: "#f44336",
       color: "white",
       border: "none",
       borderRadius: "5px",
       cursor: "pointer",
      }}
      onClick={this.resetError}
      >
      Tentar novamente
     </button>
    </div>
   );
  }

  // Renderiza os componentes filhos se nenhum erro ocorreu
  return this.props.children;
 }
}

export default ErrorBoundary;