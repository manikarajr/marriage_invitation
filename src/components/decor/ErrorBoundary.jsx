import { Component } from 'react'

/** Silently hides an optional enhancement (e.g. WebGL) if it fails. */
export default class ErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children
  }
}
