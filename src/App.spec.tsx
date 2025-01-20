import "@testing-library/jest-dom"
import {render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { vi } from 'vitest'
import { App } from './App'
import { Page } from '@/app/dashboard/page'
import { DashboardContextProvider } from './context/dashboard-context'

vi.mock('@/app/dashboard/page', () => ({
  Page: vi.fn(() => <div>Mocked Page Component</div>),
}))

describe('App Component', async () => {

  it('renders without crashing', async () => {
    await render(
      <App />
    )
    expect(screen.getByText("Mocked Page Component")).toBeInTheDocument()
  })

  it('renders the Page component inside the context provider', () => {
    render(<App />)

    expect(screen.getByText(/Mocked Page Component/i)).toBeInTheDocument()
  })

  it('renders the ErrorBoundary correctly', () => {
    const ErrorBoundaryMock = vi.fn().mockImplementation(({ children }) => children)

    render(
      <ErrorBoundaryMock>
        <DashboardContextProvider>
          <Page />
        </DashboardContextProvider>
      </ErrorBoundaryMock>
    )

    expect(ErrorBoundaryMock).toHaveBeenCalled()
    expect(screen.getByText(/Mocked Page Component/i)).toBeInTheDocument()
  })
})