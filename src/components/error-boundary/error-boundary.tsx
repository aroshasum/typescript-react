import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    // Replace this with proper error logger
    console.error('Generic warning', { error })
  }

  onRecoverFromError = () => {
    this.setState({ hasError: false })
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props

    if (hasError) {
      return <div>We are unavailable at the moment. Please try again later</div>
    }

    return children
  }
}
