import '@testing-library/jest-dom'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { vi } from 'vitest'
import { ThemeSwitcher as Theme } from '@/components/theme-switcher';
import {SidebarProvider} from '@/components/ui/sidebar';

vi.mock('lucide-react', () => ({
  GalleryVerticalEnd: vi.fn(() => <svg data-testid="gallery-icon" />),
  Settings2: vi.fn(() => <svg data-testid="settings-icon" />),
}))

global.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: query.includes('dark'), // Simulating that the 'dark' query matches
  addListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  removeListener: vi.fn(),
}))

const ThemeSwitcher = () => {
  return (
    <SidebarProvider>
      <Theme />
    </SidebarProvider>
  )
}

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      },
      writable: true,
    })

    vi.spyOn(document.documentElement.classList, 'toggle')
  })

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should render correctly with light mode initially', () => {
    render(<ThemeSwitcher />)

    expect(screen.getByText('Switch to Dark Mode')).toBeInTheDocument()

    expect(screen.getByTestId('gallery-icon')).toBeInTheDocument()
    expect(screen.getByTestId('settings-icon')).toBeInTheDocument()
  })

  it('should toggle between dark mode and light mode and update text and localStorage', () => {
    render(<ThemeSwitcher />)

    expect(screen.getByText('Switch to Dark Mode')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Switch to Dark Mode'))

    expect(screen.getByText('Switch to Light Mode')).toBeInTheDocument()
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark')
    expect(document.documentElement.classList.toggle).toHaveBeenCalledWith('dark', true)


    fireEvent.click(screen.getByText('Switch to Light Mode'))

    expect(screen.getByText('Switch to Dark Mode')).toBeInTheDocument()
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light')

    expect(document.documentElement.classList.toggle).toHaveBeenCalledWith('dark', false)
  })
})
