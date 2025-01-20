import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { DashboardContextProvider, useDashboardContext, initialDashboardContext } from './dashboard-context'

describe('DashboardContext', () => {
  it('should provide initial state to components using the context', () => {
    const TestComponent = () => {
      const { state } = useDashboardContext()
      return <div data-testid="visitors">{state.visitors}</div>
    }

    render(
      <DashboardContextProvider>
        <TestComponent />
      </DashboardContextProvider>
    )

    expect(screen.getByTestId('visitors').textContent).toBe('0')
  })

  it('should update the context state when updateState is called', () => {
    const TestComponent = () => {
      const { state, updateState } = useDashboardContext()
      return (
        <div>
          <div data-testid="visitors">{state.visitors}</div>
          <button
            onClick={() => updateState({ ...state, visitors: state.visitors + 1 })}
            data-testid="updateButton"
          >
            Increment Visitors
          </button>
        </div>
      )
    }

    render(
      <DashboardContextProvider>
        <TestComponent />
      </DashboardContextProvider>
    )

    expect(screen.getByTestId('visitors').textContent).toBe('0')
    fireEvent.click(screen.getByTestId('updateButton'))

    expect(screen.getByTestId('visitors').textContent).toBe('1')
  })
})
