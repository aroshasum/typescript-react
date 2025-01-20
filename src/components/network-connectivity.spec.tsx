import '@testing-library/jest-dom'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { vi } from 'vitest'
import { NetworkStatus } from '@/components/network-connectivity';

vi.mock('lucide-react', () => ({
  ChartLineIcon: vi.fn(() => <svg data-testid="icon" />),
}))

describe('NetworkStatus', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'onLine', {
      value: true,
      configurable: true,
    })
  })

  afterEach(() => {
    cleanup()
  })

  it('should render correctly when online', () => {
    render(<NetworkStatus />)

    expect(screen.getByText('Connected')).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('should render correctly when offline', () => {
    Object.defineProperty(navigator, 'onLine', {
      value: false,
      configurable: true,
    })

    render(<NetworkStatus />)
    expect(screen.getByText('Not Connected')).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('should update the status when going offline', () => {
    render(<NetworkStatus />)

    expect(screen.getByText('Connected')).toBeInTheDocument()
    fireEvent(window, new Event('offline'))

    expect(screen.getByText('Not Connected')).toBeInTheDocument()
  })

  it('should update the status when going online', () => {
    Object.defineProperty(navigator, 'onLine', {
      value: false,
      configurable: true,
    })
    render(<NetworkStatus />)

    expect(screen.getByText('Not Connected')).toBeInTheDocument()

    fireEvent(window, new Event('online'))

    expect(screen.getByText('Connected')).toBeInTheDocument()
  })
})
