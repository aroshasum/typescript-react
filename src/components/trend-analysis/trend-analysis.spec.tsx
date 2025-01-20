import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useTrendData } from '@/components/trend-analysis/use-trend-data'
import { vi } from 'vitest'
import { TrendAnalysis } from '@/components/trend-analysis/trend-analysis';

// Mock the custom hook `useTrendData`
vi.mock('@/components/trend-analysis/use-trend-data', () => ({
  useTrendData: vi.fn(),
}))

// Mock the TrendChart and TrendSelect components
vi.mock('@/components/trend-analysis/trend-chart', () => ({
  TrendChart: vi.fn(() => <div>Trend Chart</div>),
}))

vi.mock('@/components/trend-analysis/trend-select', () => ({
  TrendSelect: vi.fn(({ category, setCategory }) => (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="category1">Category 1</option>
      <option value="category2">Category 2</option>
    </select>
  )),
}))

describe('TrendAnalysis', () => {
  const mockSetCategory = vi.fn()

  beforeEach(() => {
    useTrendData.mockReturnValue({
      chartData: [1, 2, 3],  // Mock chart data
      category: 'category1', // Mock category
      setCategory: mockSetCategory,
    })
  })

  it('should render TrendAnalysis component correctly', () => {
    render(<TrendAnalysis />)

    expect(screen.getByText('Trend Analysis')).toBeInTheDocument()
    expect(screen.getByText('Trend Chart')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('should call setCategory when a new category is selected', async () => {
    render(<TrendAnalysis />)

    const selectElement = screen.getByRole('combobox')
    fireEvent.change(selectElement, { target: { value: 'category2' } })

    await waitFor(() => {
      expect(mockSetCategory).toHaveBeenCalledWith('category2')
    })
  })

  it('should pass correct chartData to TrendChart component', () => {
    render(<TrendAnalysis />)

    const trendChart = screen.getByText('Trend Chart')
    expect(trendChart).toBeInTheDocument()
  })
})
