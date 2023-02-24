import { Component, ErrorInfo, ReactNode } from "react";

/**
 * Source: https://reactjs.org/docs/error-boundaries.html
 */
export class ErrorBoundary extends Component<
  { children: ReactNode },
  {
    errorInfo: ErrorInfo | null;
    error: unknown | null;
  }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            <>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
