import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { useDashboardContext } from '@/context/dashboard-context'
import { vi } from "vitest";
import { DataItemContainer } from '@/app/dashboard/data-items/data-item-container';

vi.mock('@/context/dashboard-context', () => ({
  useDashboardContext: vi.fn(),
}))

describe('DataItemContainer', () => {
  it('should render the DataItem components with correct values from context', () => {
    const mockState = {
      visitors: 1000,
      sales: 2500,
      conversionRate: 5,
      changeVisitors: 100,
      changeSales: 200,
      changeConversionRate: 1,
    }

    useDashboardContext.mockReturnValue({
      state: mockState,
    })

    render(<DataItemContainer />)

    expect(screen.getByText('Visitors')).toBeInTheDocument()
    expect(screen.getByText('1000')).toBeInTheDocument()

    expect(screen.getByText('Sales')).toBeInTheDocument()
    expect(screen.getByText('$2500')).toBeInTheDocument()

    expect(screen.getByText('Conversion Rate')).toBeInTheDocument()
    expect(screen.getByText('5%')).toBeInTheDocument()
  })
})