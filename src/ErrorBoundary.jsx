import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", { error, errorInfo });

    this.setState({
      error: error?.message || "Erro desconhecido",
      errorInfo: errorInfo?.componentStack || "Sem detalhes",
    });
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "20px",
            border: "2px solid red",
            borderRadius: "5px",
            backgroundColor: "#ffebee",
          }}
        >
          <h1>Oops! Algo deu errado.</h1>
          <p>
            <strong>Erro:</strong> {this.state.error}
          </p>
          <pre
            style={{
              backgroundColor: "#f5f5f5",
              padding: "10px",
              borderRadius: "5px",
              whiteSpace: "pre-wrap",
            }}
          >
            {this.state.errorInfo}
          </pre>
          <button
            style={{
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

    return this.props.children;
  }
}

export default ErrorBoundary;