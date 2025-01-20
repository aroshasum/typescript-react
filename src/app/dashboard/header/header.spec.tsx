import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import {Header} from '@/app/dashboard/header/header';

vi.mock('@/components/ui/sidebar', () => ({
  SidebarTrigger: vi.fn(() => <div>Sidebar Trigger</div>),
}))

vi.mock('@/components/network-connectivity', () => ({
  NetworkStatus: vi.fn(() => <div>Network Status</div>),
}))

describe('Header', () => {
  it('should render the Header component with all its elements', () => {
    render(<Header />)

    expect(screen.getByText('Sidebar Trigger')).toBeInTheDocument()
    expect(screen.getByText('Real-time Analytics Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Network Status')).toBeInTheDocument()
  })
})