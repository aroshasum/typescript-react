import '@testing-library/jest-dom'
import { render, act } from '@testing-library/react'
import { vi } from 'vitest'
import { useDashboardContext } from '@/context/dashboard-context'
import { useTrendData } from '@/components/trend-analysis/use-trend-data';

vi.mock('@/context/dashboard-context', () => ({
  useDashboardContext: vi.fn(),
  initialDashboardContext: {
    visitors: 0,
    changeVisitors: 0,
    sales: 0,
    changeSales: 0,
    conversionRate: 0,
    changeConversionRate: 0,
    timestamp: 0,
  },
}))

const mockState = {
  visitors: 5,
  timestamp: 123456789,
}

const mockInitialContext = {
  visitors: 0,
  timestamp: 0,
}

describe('useTrendData', () => {
  it('should initialize with correct chart data and category', () => {
    useDashboardContext.mockReturnValue({ state: mockInitialContext })

    const TestComponent = () => {
      const { category, chartData } = useTrendData()
      return (
        <>
          <div data-testid="category">{category}</div>
          <div data-testid="chartData">{JSON.stringify(chartData)}</div>
        </>
      )
    }

    const { getByTestId } = render(<TestComponent />)

    expect(getByTestId('category').textContent).toBe('visitors')
    expect(getByTestId('chartData').textContent).toBe(
      JSON.stringify([{ desktop: 0, time: 0 }, {"desktop":0,"time":0}])
    )
  })

  it('should update chartData and count when state changes', () => {
    useDashboardContext.mockReturnValue({ state: mockState })

    const TestComponent = () => {
      const { category, chartData } = useTrendData()
      return (
        <>
          <div data-testid="category">{category}</div>
          <div data-testid="chartData">{JSON.stringify(chartData)}</div>
        </>
      )
    }

    const { getByTestId, rerender } = render(<TestComponent />)

    expect(getByTestId('chartData').textContent).toBe(
      JSON.stringify([{ desktop: 0, time: 0 }, {"desktop":5,"time":123456789}])
    )

    useDashboardContext.mockReturnValue({ state: mockState })
    rerender(<TestComponent />)

    expect(getByTestId('chartData').textContent).toBe(
      JSON.stringify([
        { desktop: 0, time: 0 },
        { desktop: 5, time: 123456789 },
      ])
    )
  })

  it('should reset chartData and count when the MAX_DATA_POINTS limit is reached', () => {
    useDashboardContext.mockReturnValue({ state: mockState })

    const TestComponent = () => {
      const { chartData } = useTrendData()
      return <div data-testid="chartData">{JSON.stringify(chartData)}</div>
    }

    const { getByTestId, rerender } = render(<TestComponent />)

    for (let i = 0; i < 8; i++) {
      act(() => {
        rerender(<TestComponent />)
      })
    }

    expect(getByTestId('chartData').textContent).toBe(
      JSON.stringify([{ desktop: 0, time: 0 }, {"desktop":5,"time":123456789}])
    )
  })
})
