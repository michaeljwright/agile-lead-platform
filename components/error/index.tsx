import React, { Component, ErrorInfo } from 'react'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch (error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error: ', error, errorInfo)
    this.setState({ hasError: true })
  }

  render () {
    if (this.state.hasError) {
      return (
        <>
          <h1>Oops, something went wrong</h1>
          <p>We have reported this issue automatically and will work on fixing it ASAP! Sorry for any inconvenience caused.</p>
        </>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
