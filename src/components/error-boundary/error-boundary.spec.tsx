import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { ErrorBoundary } from '@/components/error-boundary/error-boundary';

vi.spyOn(console, 'error').mockImplementation(() => {})

describe('ErrorBoundary', () => {
  it('should render children correctly when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Some content</div>
      </ErrorBoundary>
    )

    expect(screen.getByText('Some content')).toBeInTheDocument()
  })

  it('should render fallback UI when there is an error', () => {
    const ErrorProneComponent = () => {
      throw new Error('Test error')
    }

    render(
      <ErrorBoundary>
        <ErrorProneComponent />
      </ErrorBoundary>
    )

    expect(
      screen.getByText('We are unavailable at the moment. Please try again later')
    ).toBeInTheDocument()
  })
})
